import Sohne from "@/assets/fonts/sohne";
import { seo } from "@/seo";
import { cn } from "@/utils";
import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";
import PlausibleProvider from "next-plausible";

import "@/styles/global.scss";

export const metadata: Metadata = seo;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
};

console.log("Made with ❤️ by @tjcages");

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(Sohne.className, Sohne.variable)}>
        <PlausibleProvider domain="beta.stripe.dev">{children}</PlausibleProvider>
        <Analytics />
      </body>
    </html>
  );
}
