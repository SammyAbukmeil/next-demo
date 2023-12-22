import { playfairDisplay } from "@/app/ui/fonts";
import "@/app/ui/Header/Header.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1 className={playfairDisplay.className}>Acme Dashboard</h1>
      </Link>
    </header>
  );
}
