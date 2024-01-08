import { Roboto } from "next/font/google";
import { Playfair_Display } from "next/font/google";

export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
