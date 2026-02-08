import Sidebar from "../../components/SidebarItem";
import SessionAuth from "../../components/SessionAuth";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionAuth>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content wrapper with internal scrolling */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </SessionAuth>
  );
}
