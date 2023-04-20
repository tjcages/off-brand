import styles from "@/styles/nav.module.scss";

const _ = () => {
  return (
    <div className={styles.action}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>Try it</strong>
      </a>
    </div>
  );
};

export default _;
