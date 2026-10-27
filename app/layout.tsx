
import type { Metadata } from "next";
import "./globals.css";
import ZavaroLoader from "@/components/ZavaroLoader";

export const metadata: Metadata = {
  title: {
    default: "ZAVARO — Contemporary Fashion",
    template: "%s | ZAVARO",
  },
  description:
    "Discover ZAVARO: a considered approach to contemporary fashion and everyday essentials.",
  applicationName: "ZAVARO",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      
      <body>
         <ZavaroLoader />
        {children}</body>
    </html>
  );
}
