import Link from "next/link";
import Image from "next/image";
import { useMedia, mobileBreakpoint } from "@/modules/useMedia";
import styles from "@/styles/intro.module.scss";

const _ = () => {
  const mobile = useMedia(mobileBreakpoint);
  return (
    <div className={styles.main}>
      {/* <strong>Live Now</strong> */}
      <h2>Try a buy button</h2>
      <h4>
        The fastest way to add Stripe to your site. Easily turn any payment link
        into an embeddable{" "}
        <Link
          href="https://stripe.com/docs/payment-links/share#embed-button"
          target="_blank"
        >
          buy button{" "}
          <Image src="/icons/arrow.svg" alt="arrow" width={12} height={12} />
        </Link>
        .{mobile && <br />} Try one today and we’ll send you a surprise!
      </h4>
    </div>
  );
};

export default _;
