import Image from "next/image";
import Link from "next/link"
import styles from "@/styles/footer.module.scss";

const _ = () => {
  return (
    <div className={styles.main}>
      <strong>Live Now</strong>
      <Link className={styles.cta} href={"https://stripe.com"}>
        <h3 className="text-4xl font-bold">Stripe Buy Button</h3>
        <Image
          src={"/icons/arrow.svg"}
          alt="arrow icon"
          width={14}
          height={14}
        />
      </Link>
      <p className="mt-3 text-xl">
        Accept payment methods from around the globe with a single secure,
        embeddable UI component.
      </p>
    </div>
  );
};

export default _;
