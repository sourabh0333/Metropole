import { Instrument_Serif, DM_Sans, Jost } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const text = DM_Sans({
  variable: "--font-text",
  subsets: ["latin"],
});

// The wordmark only: close to the lettering on the hotel's own sign.
const mark = Jost({
  variable: "--font-mark",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata = {
  title: "Metropole · Boutique hotel on Sarat Bose Road, Kolkata",
  description:
    "Metropole is a boutique hotel at 174, Sarat Bose Road in South Kolkata, with a restaurant and bar, a banquet hall and meeting rooms.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mark.variable}`}>
      <body>{children}</body>
    </html>
  );
}
