import { Inter } from "next/font/google";
import "./globals.css";  

const roboto = Inter({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const ibmPlexMono = Inter({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}