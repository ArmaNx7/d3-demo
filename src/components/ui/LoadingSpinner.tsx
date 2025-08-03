import React from "react";
import styles from "./loading.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading charts...</p>
    </div>
  );
};

export default LoadingSpinner;
