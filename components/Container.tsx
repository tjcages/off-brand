import styles from "@/styles/container.module.scss";

interface Props {
  children: React.ReactNode;
}

const _ = ({children} : Props) => {
  return (
    <div className={styles.main}>
     {children}
    </div>
  );
};

export default _;
