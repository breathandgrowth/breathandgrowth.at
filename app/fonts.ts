import { Raleway as Sans } from "next/font/google";
import localFont from "next/font/local";

// export const serif = Sans({
//   weight: "400",
//   style: ["normal"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-serif",
// });

export const serif = localFont({
  src: "./Safira.ttf",
  variable: "--font-serif",
});

export const sans = Sans({
  weight: "variable",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
