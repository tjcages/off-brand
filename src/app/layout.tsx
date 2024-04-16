import Sohne from "@/assets/fonts/sohne";
import { seo } from "@/seo";
import { cn } from "@/utils";
import { Analytics } from "@vercel/analytics/react";
import { Metadata, Viewport } from "next";

import "@/styles/global.scss";

export const metadata: Metadata = seo;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          Sohne.className,
          Sohne.variable,
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
