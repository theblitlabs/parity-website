import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parity Protocol - Decentralized Compute Protocol",
  description:
    "Parity Protocol is a decentralized compute protocol that enables secure, efficient, and scalable distributed computing across the network.",
  generator: "Next.js",
  applicationName: "Parity Protocol",
  keywords: [
    "blockchain",
    "decentralized computing",
    "distributed systems",
    "compute protocol",
    "parity protocol",
    "web3",
    "cryptocurrency",
    "distributed computing",
    "blockchain protocol",
    "decentralized infrastructure",
  ],
  authors: [{ name: "Blit Labs" }],
  colorScheme: "dark",
  creator: "Blit Labs",
  publisher: "Blit Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },
  openGraph: {
    title: "Parity Protocol - Decentralized Compute Protocol",
    description:
      "Parity Protocol is a decentralized compute protocol that enables secure, efficient, and scalable distributed computing across the network.",
    url: "https://parity.protocol",
    siteName: "Parity Protocol",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Parity Protocol Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parity Protocol - Decentralized Compute Protocol",
    description:
      "Parity Protocol is a decentralized compute protocol that enables secure, efficient, and scalable distributed computing across the network.",
    images: ["/logo.png"],
    creator: "@parityprotocol",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import "./globals.css";
