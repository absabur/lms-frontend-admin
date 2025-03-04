import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { StoreProvider } from "@/store/StoreProvider.jsx";
import Authentication from "@/components/Authentication";
import Toast from "@/components/Toast";
import Navbar from "@/components/NavbarAuth";
import Loading from "@/store/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Libraty Management system",
  description:
    "This is a library management system that is used to manage the library.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toast />
          <Loading />
          <Authentication />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
