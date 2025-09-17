import AdminNavbar from "@/components/AdminNavbar"

export default function AdminLayout({ children }) {
  return (
      <>
        <AdminNavbar/>
        {children}
      </>
  );
}