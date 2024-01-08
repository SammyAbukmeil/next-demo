import { roboto } from "@/app/ui/fonts";
import "@/app/ui/global.scss";
import Header from "@/app/ui/Header/Header";

export const metadata = {
  title: "Acme",
  description: "An admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} m-6`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
