import React from "react";
import styles from "./layout.module.css";
import Header from "@/components/header/Header";
import Ball from "@/components/ball/Ball";

const NotFound: React.FC = () => (
  <div className={styles.fullscreen}>
    <Ball initialX={-20} initialY={150} delay={250} />
    <Ball initialX={-20} initialY={150} delay={500} />
    <Ball initialX={-20} initialY={150} delay={750} />
    <Ball initialX={-20} initialY={150} delay={1000} />

    <div className={styles.padding}>
      <Header />
      <main>
        <p>The page you requested could not be found.</p>
      </main>
    </div>
  </div>
);

export default NotFound;
