import { Card } from "@repo/ui/card"
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center py-8">
                    <div className="p-4 bg-gray-50 rounded-full inline-block mb-4">
                        <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Recent Transactions</h3>
                    <p className="text-gray-500 mt-1">Your recent transactions will show up here</p>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                                t.status === 'Success' ? 'bg-green-50' : 
                                t.status === 'Processing' ? 'bg-yellow-50' : 'bg-red-50'
                            }`}>
                                {t.status === 'Success' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                                {t.status === 'Processing' && <Clock className="w-4 h-4 text-yellow-600" />}
                                {t.status === 'Failure' && <XCircle className="w-4 h-4 text-red-600" />}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">Received INR</div>
                                <div className="text-xs text-slate-500">{t.time.toDateString()}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-semibold text-gray-900">
                                + Rs {t.amount / 100}
                            </div>
                            <div className={`text-xs ${
                                t.status === 'Success' ? 'text-green-600' : 
                                t.status === 'Processing' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                                {t.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}