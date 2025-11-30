import { Bell, HelpCircle, QrCode, Phone, Zap, CreditCard, Train, Gift, Percent, MoreHorizontal, TrendingUp, User } from "lucide-react";
import { userInfo } from "os";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Blue Header */}
      <header className="bg-blue-700 px-6 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Hi, {userInfo().username}</h1>
            <p className="text-blue-100 text-sm">Welcome back!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition">
              <Bell className="w-6 h-6 text-white" />
            </button>
            <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition">
              <HelpCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Services (2/3 on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Grid */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                Quick Actions
              </h2>

              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {[
                  { icon: QrCode, label: "Scan Any QR", color: "blue" },
                  { icon: Phone, label: "Mobile Recharge", color: "orange" },
                  { icon: Zap, label: "Electricity", color: "purple" },
                  { icon: CreditCard, label: "Credit Card Bill", color: "green" },
                  { icon: Train, label: "Book Tickets", color: "pink" },
                  { icon: Gift, label: "Gift Cards", color: "teal" },
                  { icon: Percent, label: "Offers", color: "yellow" },
                  { icon: MoreHorizontal, label: "More Services", color: "indigo" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex flex-col items-center group hover:scale-105 transition-transform"
                  >
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-3 bg-${item.color}-100 group-hover:bg-${item.color}-200 transition`}>
                      <item.icon className={`w-9 h-9 lg:w-10 lg:h-10 text-${item.color}-600`} />
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-gray-700 text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Exclusive Offers */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Percent className="w-6 h-6 text-orange-600" />
                  Exclusive Offers
                </h2>
                <span className="text-blue-600 font-medium">View all →</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                  <p className="text-2xl font-bold">Flat ₹100 Cashback</p>
                  <p className="mt-2 opacity-90">On your first electricity bill payment this month</p>
                  <button className="mt-5 bg-white text-orange-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition">
                    Pay Bill Now
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                  <p className="text-2xl font-bold">10% Instant Discount</p>
                  <p className="mt-2 opacity-90">On movie tickets booked via PayTM</p>
                  <button className="mt-white text-purple-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition">
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - News & Updates (1/3 on large screens) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm p-8 h-full">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                PayTM News & Updates
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">UPI Lite Limit Increased</p>
                    <p className="text-sm text-gray-600 mt-1">Now make payments up to ₹1,000 without PIN</p>
                    <a href="#" className="text-blue-600 text-sm font-medium mt-2 inline-block">Learn more →</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">PayTM Postpaid Mini Launched</p>
                    <p className="text-sm text-gray-600 mt-1">Get instant ₹300 credit. Zero documentation!</p>
                    <a href="#" className="text-blue-600 text-sm font-medium mt-2 inline-block">Activate now →</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-xl flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Zero Charges on Wallet Loading</p>
                    <p className="text-sm text-gray-600 mt-1">Add money via UPI at 0% fee forever</p>
                    <a href="#" className="text-blue-600 text-sm font-medium mt-2 inline-block">Add money →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-12 lg:h-20"></div>
      </main>
    </div>
  );
}