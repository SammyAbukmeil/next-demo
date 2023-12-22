import Sidebar from "@/app/ui/Dashboard/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-5/6">{children}</div>
    </div>
  );
}
