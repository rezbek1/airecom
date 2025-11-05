import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Mention - Be visible in AI recommendations",
  description: "Help your business appear in ChatGPT, Perplexity, Google AI, and Claude recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
