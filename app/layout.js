import { roboto } from "./ui/fonts";
import "@/app/ui/global.scss";
import Header from "./ui/Header/Header";

export const metadata = {
  title: "Acme Media",
  description: "A social media platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
