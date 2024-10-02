import React from "react";
import styles from "./page.module.css";
import Header from "./header/header";
import Ball from "@/components/Ball";

const IndexPage: React.FC = () => (
  <div className={styles.fullscreen}>
    <Ball initialX={-200} initialY={100} />
    <div className={styles.page}>
      <Header />
      <main className={styles.bodyText}>
        <p className={styles.bodyParagraph}>
          Tim is an experienced software engineer in New&nbsp;York City who
          builds for the web.
        </p>
        <p className={styles.bodyParagraph}>
          He is a Software Engineer at{" "}
          <a
            href="https://www.datadoghq.com/"
            target="_"
            className={styles.homepageLink}
          >
            Datadog
          </a>
          .
        </p>
      </main>
      <footer className={styles.footer}>
        <a href="mailto:brown.tim.lee@gmail.com" className={styles.emailText}>
          brown.tim.lee@gmail.com
        </a>
      </footer>
    </div>
  </div>
);

export default IndexPage;
