import Sidebar from "@/app/ui/dashboard/sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-5/6">{children}</div>
    </div>
  );
}
