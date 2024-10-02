import React from "react";
import styles from "./page.module.css";
import Header from "./header/header";
import Ball from "@/components/Ball";

const NotFound: React.FC = () => (
  <div className={styles.fullscreen}>
    <Ball initialX={-20} initialY={150} delay={250} />
    <Ball initialX={-20} initialY={150} delay={500} />
    <Ball initialX={-20} initialY={150} delay={750} />
    <Ball initialX={-20} initialY={150} delay={1000} />

    <div className={styles.page}>
      <Header />
      <main className={styles.bodyText}>
        <p className={styles.bodyParagraph}>
          The page you requested could not be found
        </p>
      </main>
    </div>
  </div>
);

export default NotFound;
