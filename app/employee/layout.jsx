export default function EmployeeLayout({ children }) {
  // Since we don't have the DashboardLayout imported in the root, 
  // we can import it here and wrap all employee routes.
  // Note: Since DashboardLayout is a client component, it might be better
  // to import it directly into a client component wrapper, but doing it here 
  // in a server layout is also fine as long as DashboardLayout has "use client".
  
  const DashboardLayout = require("@/components/DashboardLayout").default;

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
