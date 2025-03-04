import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar component

const roboto = Inter({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const ibmPlexMono = Inter({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata = {
  title: "Code101",
  description: "Code101 - Learning Platform",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ibmPlexMono.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}