import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMedia, mobileBreakpoint } from "@/modules/useMedia";
import styles from "@/styles/intro.module.scss";

const _ = () => {
  const mobile = useMedia(mobileBreakpoint);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <motion.h2
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
          }}
        >
          Try a buy button
        </motion.h2>
      </div>
      <div className={styles.container}>
        <motion.h4
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
            delay: 0.2,
          }}
        >
          The fastest way to add Stripe to your site. {mobile && <br />}Turn a
          payment link into a{" "}
          <Link
            href="https://stripe.com/docs/payment-links/buy-button"
            target="_blank"
          >
            buy button
            <Image src="/icons/arrow.svg" alt="arrow" width={12} height={12} />
          </Link>
          , customize it to match your brand, and accept payments in seconds.
          {mobile && (
            <>
              <br />
              <br />
            </>
          )}{" "}
          Here are a few ideas to get you started—try using a{" "}
          <Link href="https://stripe.com/docs/testing#cards" target="_blank">
            test card
            <Image src="/icons/arrow.svg" alt="arrow" width={12} height={12} />
          </Link>{" "}
          like <span className={styles.shimmer}>4242 4242 4242 4242</span>.
        </motion.h4>
      </div>
    </div>
  );
};

export default _;
