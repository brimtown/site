import React from "react";
import styles from "./page.module.css";
import Header from "./header/header";

const NotFound: React.FC = () => (
  <div className={styles.page}>
    <Header />
    <main className={styles.bodyText}>
      <p className={styles.bodyParagraph}>
        The page you requested could not be found
      </p>
    </main>
  </div>
);

export default NotFound;
