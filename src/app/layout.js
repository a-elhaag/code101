import { Roboto, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "700"],
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
      <body style={{ margin: 0 }}>
        <Navbar />

        {/* 
          Give the main content enough padding to not hide behind
          the fixed navbar (60px) and fixed footer (70px).
        */}
        <main
          style={{
            minHeight: "100vh",
            paddingTop: "60px",
            paddingBottom: "70px",
            backgroundColor: "var(--color-black)",
          }}
        >
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}