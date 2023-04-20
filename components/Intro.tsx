import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/intro.module.scss";

const _ = () => {
  return (
    <div className={styles.main}>
      {/* <strong>Live Now</strong> */}
      <h2>Try a buy button</h2>
      <h4>
        The fastest way to add Stripe to your site. Easily turn any payment link
        into an embeddable {" "}
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
        . Try one today and we’ll send you a surprise!
      </h4>
    </div>
  );
};

export default _;
