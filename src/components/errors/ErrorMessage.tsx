import React from "react";
import styles from "./error.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Error</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
