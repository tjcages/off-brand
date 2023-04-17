import React from "react";
import styles from "./nyan.module.scss";

const _ = () => {
  return (
    <div className={styles.container}>
      <div className={styles.rainbow}>
        <span></span>
      </div>
      <div className={styles.nyanCat}>
        <div className={styles.feet}></div>
        <div className={styles.tail}>
          <span></span>
        </div>
        <div className={styles.body}></div>
        <div className={styles.head}></div>
      </div>
      <div className={styles.stars}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles.star}>
            <span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default _;
