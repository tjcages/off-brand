import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/__globals.css";
import styles from "@/styles/_site.module.scss";
import Super from "@/public/fonts/Super";

console.log("Made with ❤️  by @tjcages");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${Super.className} ${Super.variable} ${styles.site}`}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
