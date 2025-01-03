import Sidebar from './sidebar/Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className=" flex flex-col">
      <Header
        user={userProfile}
        onLogout={handleLogout}
        sidebarWidth={256}
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
