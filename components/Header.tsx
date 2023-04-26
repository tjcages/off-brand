import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useMedia, mobileBreakpoint } from "@/modules/useMedia";
import styles from "@/styles/header.module.scss";

const arrowVariants: Variants = {
  offscreen: {
    x: "-50%",
    y: "200%",
  },
  onscreen: {
    x: "-50%",
    y: "0%",
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const _ = () => {
  const mobile = useMedia(mobileBreakpoint);
  return (
    <>
      {/* Nav */}
      <motion.div
        className={styles.main}
        initial="offscreen"
        whileInView="onscreen"
      >
        {/* Stripe logo */}
        <Link className={styles.logo} href="https://stripe.com" target="_blank">
          <Image
            src="/icons/stripe.svg"
            alt="stripe logo"
            width={60}
            height={25}
          />
        </Link>

        {/* Docs link */}
        <Link
          className={styles.action}
          href="https://stripe.com/docs/payment-links/buy-button"
          target="_blank"
        >
          <h5>Read the docs</h5>
          <Image
            src="/icons/arrow.svg"
            alt="arrow icon"
            width={10}
            height={10}
          />
        </Link>

        {/* Arrow */}
        {mobile && (
          <motion.div className={styles.arrow} variants={arrowVariants}>
            <Image
              src="/icons/arrow.svg"
              alt="arrow icon"
              width={100}
              height={100}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default _;
