import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estatein — Discover Your Dream Property",
  description:
    "Estatein helps you find the perfect property. Explore handpicked listings, expert guidance, and a seamless real-estate experience.",
  metadataBase: new URL("https://estatein.example.com"),
  openGraph: {
    title: "Estatein — Discover Your Dream Property",
    description:
      "Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full`}>
      <body className="min-h-full bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
