import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/intro.module.scss";

const _ = () => {
  return (
    <div className={styles.main}>
      <strong>Live Now</strong>
      <h2>Try A Buy Button</h2>
      <h4>
        You can now turn any{" "}
        <Link href="https://stripe.com/payments/payment-links" target="_blank">
          payment link
          <Image
            src="/icons/arrow-blurple.svg"
            alt="arrow"
            width={12}
            height={12}
          />
        </Link>{" "}
        into an embeddable{" "}
        <Link
          href="https://stripe.com/docs/payment-links/share#embed-button"
          target="_blank"
        >
          buy button{" "}
          <Image
            src="/icons/arrow-blurple.svg"
            alt="arrow"
            width={12}
            height={12}
          />
        </Link>
        . Easily sell a product or subscription—right from your website.
      </h4>
    </div>
  );
};

export default _;
