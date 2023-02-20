import type { AppProps } from "next/app";
import "@/styles/globals.css";
import styles from "@/styles/_main.module.scss";

import playfair from "@/public/fonts/playfair";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${playfair.className} ${styles.main}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
