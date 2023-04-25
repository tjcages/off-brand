import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/cta.module.scss";

import Vectors from "./_Vectors";

const _ = () => {
  const [ready, set] = useState(false);

  useEffect(() => {
    set(true);
  }, []);

  return (
    <Link
      className={styles.main}
      href="https://stripe.com/docs/payment-links/buy-button"
      target="_blank"
    >
      {ready && <Vectors />}
      <div className={styles.container}>
        <h3>Feeling creative?</h3>

        {/* Docs link */}
        <div className={styles.action}>
          <h5>Read the docs</h5>
          <Image
            src="/icons/arrow.svg"
            alt="arrow icon"
            width={10}
            height={10}
          />
        </div>
      </div>
    </Link>
  );
};

export default _;
