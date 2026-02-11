import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session.user.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function TransferPage() {
  const balance = await getBalance();

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">
            Transfers
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add money to your wallet and track transactions
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column – Add Money */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
              <AddMoney />
            </div>
          </div>

          {/* Right Column – Balance */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-6">
              <BalanceCard
                amount={balance.amount}
                locked={balance.locked}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
