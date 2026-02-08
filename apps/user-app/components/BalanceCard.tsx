import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Wallet Balance</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="text-gray-600">Unlocked Balance</div>
                    <div className="font-semibold text-gray-900 text-lg">
                        Rs {amount / 100}
                    </div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="text-gray-600">Total Locked Balance</div>
                    <div className="font-semibold text-gray-900 text-lg">
                        Rs {locked / 100}
                    </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="text-gray-900 font-bold">Total Balance</div>
                    <div className="font-bold text-gray-900 text-xl">
                        Rs {(locked + amount) / 100}
                    </div>
                </div>
            </div>
        </div>
    );
}