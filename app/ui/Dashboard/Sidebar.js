import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-1/6 flex flex-col bg-slate-50">
      <Link href="/dashboard" className="p-5">Dashboard</Link>
      <Link href="/dashboard/customers" className="p-5">Customers</Link>
      <Link href="/dashboard/invoices" className="p-5">Invoices</Link>
    </aside>
  );
}
