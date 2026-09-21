import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthPromptModal from "@/components/account/AuthPromptModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raphelo.com"),
  title: {
    default: "RAPHÈLO — Fragrance for the spaces between moments",
    template: "%s | RAPHÈLO",
  },
  description:
    "RAPHÈLO creates contemporary scents shaped by memory, atmosphere, and the quiet details of everyday life. A luxury fragrance house defined by quiet confidence over loud luxury.",
  keywords: [
    "RAPHÈLO",
    "luxury fragrance",
    "contemporary perfume",
    "niche perfume",
    "Eau de Parfum",
    "fragrance house",
    "halo",
    "ember veil",
    "still room",
    "late light",
    "sable",
    "after rain",
  ],
  authors: [{ name: "RAPHÈLO" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "RAPHÈLO — Fragrance for the spaces between moments",
    description:
      "A contemporary fragrance house shaped by memory, atmosphere, and the quiet details of everyday life.",
    url: "https://raphelo.com",
    siteName: "RAPHÈLO",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F0E8] text-[#1D1C1A] selection:bg-[#A8735B]/20 selection:text-[#1D1C1A]">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="grow flex flex-col">{children}</main>
              <Footer />
              <CartDrawer />
              <AuthPromptModal />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
