import "@/styles/__globals.css";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Super from "@/public/fonts/Super"
import styles from "@/styles/_site.module.scss";

console.log("Made with ❤️ by @tjcages");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${Super.className} ${styles.site}`}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
