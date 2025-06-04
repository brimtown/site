import React from "react";
import styles from "./page.module.css";
import layoutStyles from "./layout.module.css";
import Header from "@/components/header/Header";
import Ball from "@/components/ball/Ball";

const IndexPage: React.FC = () => (
  <div className={layoutStyles.fullscreen}>
    <Ball initialX={-200} initialY={100} />
    <div className={`${layoutStyles.page} ${layoutStyles.padding}`}>
      <Header />
      <main className={styles.bodyText}>
        <p className={styles.bodyParagraph}>
          Tim is an experienced software engineer in New&nbsp;York who builds
          for the web.
        </p>
        <p className={styles.bodyParagraph}>
          He is a Staff Engineer at{" "}
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
