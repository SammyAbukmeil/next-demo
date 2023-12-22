"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Dashboard", href: "/dashboard" },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
  },
  { name: "Customers", href: "/dashboard/customers" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-1/6 flex flex-col bg-slate-50">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx("p-5", { "bg-sky-100": pathname === link.href })}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
}
