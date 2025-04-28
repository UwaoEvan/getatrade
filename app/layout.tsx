import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavigationHeader from "./components/NavigationHeader";
import Footer from "./components/Footer";
import { cookies } from "next/headers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const montSerrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Getatradelinkltd",
  description: "One stop shop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-authjs.session-token") ||
    cookieStore.get("authjs.session-token");
  const isLoggedIn = !!token;
  return (
    <html lang="en">
      <body className={`${montSerrat.className} antialiased`}>
        <NavigationHeader isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
