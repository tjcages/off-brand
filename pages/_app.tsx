import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";

import "@/styles/__globals.css";
import styles from "@/styles/_site.module.scss";
import Super from "@/public/fonts/Super";
import Moderat from "@/public/fonts/Moderat";

console.log("Made with ❤️  by @tjcages");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main
        className={clsx(
          Moderat.className,
          Super.variable,
          Moderat.variable,
          styles.site
        )}
      >
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
