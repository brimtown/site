import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

interface Props {
  color?: string;
}

const Header: React.FC<Props> = ({ color }) => {
  return (
    <nav className={styles.headerWrapper} style={{ color: color }}>
      <Link href="/" className={styles.nameLink}>
        Tim Brown
      </Link>
      <div className={styles.links}>
        <Link href="/blog" className={styles.link}>
          Blog
        </Link>
        <Link href="/links" className={styles.link}>
          Links
        </Link>
      </div>
    </nav>
  );
};

export default Header;
