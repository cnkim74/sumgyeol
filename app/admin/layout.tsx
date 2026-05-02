import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session.role !== "admin") notFound();

  return (
    <div className="notion-layout">
      <AdminSidebar />
      <main className="notion-main">{children}</main>
    </div>
  );
}
