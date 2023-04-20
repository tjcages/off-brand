import Link from "next/link";
import styles from "@/styles/nav.module.scss";

const _ = () => {
  return (
    <Link
      className={styles.action}
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
      target="_blank"
    >
      <strong>Try it</strong>
    </Link>
  );
};

export default _;
