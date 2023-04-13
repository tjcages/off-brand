import "@/styles/_globals.css";
import "@/styles/__tooltip.css";

import type { AppProps } from "next/app";
import Script from "next/script";
import { Inter } from "next/font/google";
import styles from "@/styles/_main.module.scss";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://js.stripe.com/v3/buy-button.js" />
      <main className={`${inter.className} ${styles.main}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
