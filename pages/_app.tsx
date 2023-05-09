import "@/styles/__globals.css";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Sohne from "@/public/fonts/Sohne";
import styles from "@/styles/_site.module.scss";

console.log("Made with ❤️ by @tjcages");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${Sohne.className} ${styles.site}`}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
