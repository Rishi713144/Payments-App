import Sidebar from "../../components/SidebarItem";
import SessionAuth from "../../components/SessionAuth";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionAuth>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar controls its own width */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SessionAuth>
  );
}
