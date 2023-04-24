import "@/styles/__globals.css";
import "@/styles/__tooltip.css";
import "@/styles/__highlight.css";

import type { AppProps } from "next/app";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Sohne from "@/public/fonts/Sohne";
import styles from "@/styles/_main.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://js.stripe.com/v3/buy-button.js" />
      <main className={`${Sohne.className} ${styles.main}`}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
