
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { ArrowUpRight, ArrowDownLeft, Wallet, Clock } from "lucide-react";

async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    // Fetch OnRamp (Deposits)
    const onRampTxns = await prisma.onRampTransaction.findMany({
        where: { userId: userId },
        orderBy: { startTime: 'desc' }
    });

    // Fetch P2P (Transfers)
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        },
        include: {
            fromUser: true,
            toUser: true,
        },
        orderBy: { timestamp: 'desc' }
    });

    // Normalize and Merge
    const normalizedOnRamp = onRampTxns.map(t => ({
        id: `onramp-${t.id}`,
        type: 'DEPOSIT',
        amount: t.amount,
        timestamp: t.startTime,
        status: t.status,
        title: "Added to Wallet",
        description: t.provider,
        counterparty: t.provider
    }));

    const normalizedP2P = p2pTxns.map(t => {
        const isSender = t.fromUserId === userId;
        return {
            id: `p2p-${t.id}`,
            type: isSender ? 'SENT' : 'RECEIVED',
            amount: t.amount,
            timestamp: t.timestamp,
            status: 'Success',
            title: isSender ? "Sent Money" : "Received Money",
            description: isSender
                ? `To ${t.toUser.name || t.toUser.number}`
                : `From ${t.fromUser.name || t.fromUser.number}`,
            counterparty: isSender ? (t.toUser.name || t.toUser.number) : (t.fromUser.name || t.fromUser.number)
        };
    });

    const allTxns = [...normalizedOnRamp, ...normalizedP2P].sort((a, b) =>
        b.timestamp.getTime() - a.timestamp.getTime()
    );

    return allTxns;
}

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        Success: "bg-green-100 text-green-700",
        Failure: "bg-red-100 text-red-700",
        Processing: "bg-yellow-100 text-yellow-700"
    };
    const className = styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700";

    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${className}`}>
            {status}
        </span>
    );
};

const TransactionIcon = ({ type, status }: { type: string, status: string }) => {
    if (status === 'Failure') return <div className="p-2 rounded-full bg-red-100"><Clock className="w-5 h-5 text-red-600" /></div>;
    if (status === 'Processing') return <div className="p-2 rounded-full bg-yellow-100"><Clock className="w-5 h-5 text-yellow-600" /></div>;

    switch (type) {
        case 'DEPOSIT':
            return <div className="p-2 rounded-full bg-green-100"><Wallet className="w-5 h-5 text-green-600" /></div>;
        case 'SENT':
            return <div className="p-2 rounded-full bg-red-100"><ArrowUpRight className="w-5 h-5 text-red-600" /></div>;
        case 'RECEIVED':
            return <div className="p-2 rounded-full bg-blue-100"><ArrowDownLeft className="w-5 h-5 text-blue-600" /></div>;
        default:
            return <div className="p-2 rounded-full bg-gray-100"><Clock className="w-5 h-5 text-gray-600" /></div>;
    }
};

export default async function TransactionsPage() {
    const transactions = await getTransactions();

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-500 mt-2">view your recent financial activity.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {transactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gray-50 rounded-full">
                                <Clock className="w-8 h-8 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No transactions yet</h3>
                        <p className="text-gray-500 mt-1">Your transaction history will appear here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {transactions.map((t) => (
                            <div key={t.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <TransactionIcon type={t.type} status={t.status} />
                                        <div>
                                            <div className="font-semibold text-gray-900">{t.title}</div>
                                            <div className="text-sm text-gray-500">{t.description}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {t.timestamp.toLocaleDateString()} • {t.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold text-lg ${(t.type === 'DEPOSIT' || t.type === 'RECEIVED')
                                                ? 'text-green-600'
                                                : 'text-gray-900'
                                            }`}>
                                            {(t.type === 'SENT') ? '-' : '+'}
                                            Rs {t.amount / 100}
                                        </div>
                                        <div className="mt-1">
                                            <StatusBadge status={t.status} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
