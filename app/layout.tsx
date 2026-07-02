import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYOD — Declaring the Outcome",
  description:
    "How analytics work changed: imperative to declarative to English.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
