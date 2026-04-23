import AdminLayout from "@/components/AdminLayout";

export const metadata = {
  title: 'ASTU Staff Performance Evaluator - Admin',
  description: "Admin panel for ASTU Staff Performance",
};

export default function GlobalAdminLayout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}
