import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/footer.module.scss";

const _ = () => {
  return (
    <div className={styles.main}>
      <strong>Live Now</strong>
      <Link className={styles.cta} href={"https://stripe.com"}>
        <h3>Try a Stripe Buy Button</h3>
        <Image
          src={"/icons/arrow.svg"}
          alt="arrow icon"
          width={14}
          height={14}
        />
      </Link>
      <h4>Add a buy button to your site with two lines of code.</h4>
    </div>
  );
};

export default _;
