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
        <h4>
          Feeling inspired?
          <br /> Read the{" "}
          <div className={styles.docs}>
            docs
            <Image src="/icons/arrow.svg" alt="arrow" width={12} height={12} />
          </div>{" "}
          to get started.
        </h4>
      </div>
    </Link>
  );
};

export default _;
