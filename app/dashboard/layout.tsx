export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        {/* Dashboard navigation */}
      </nav>
      <main>{children}</main>
    </div>
  );
}
