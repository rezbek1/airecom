import type { Metadata, Viewport } from "next";
import { Inter, Orbitron, Heebo } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "AI Recomendation - Next-Gen AI Visibility Platform",
  description: "Advanced AI visibility optimization for ChatGPT, Perplexity, Google AI, and Claude. Transform your digital presence with corporate-grade AI technology.",
  keywords: ["AI visibility", "ChatGPT", "Perplexity", "Google AI", "Claude", "AI optimization", "Schema.org", "SEO", "AI recommendations"],
  authors: [{ name: "Limed Solution" }],
  creator: "Limed Solution",
  publisher: "Limed Solution",
  metadataBase: new URL('https://airecom.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://airecom.vercel.app',
    title: 'AI Recomendation - Next-Gen AI Visibility Platform',
    description: 'Advanced AI visibility optimization for ChatGPT, Perplexity, Google AI, and Claude',
    siteName: 'AI Recomendation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Recomendation - Next-Gen AI Visibility Platform',
    description: 'Advanced AI visibility optimization for ChatGPT, Perplexity, Google AI, and Claude',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${heebo.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
