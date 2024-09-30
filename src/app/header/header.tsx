import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

interface Props {
  color?: string;
}

const Header: React.FC<Props> = ({ color }) => (
  <nav className={styles.headerWrapper} style={{ color: color }}>
    <Link href="/" className={styles.nameLink}>
      Tim Brown
    </Link>
    <Link href="/links" className={styles.additionalLink} aria-label="Links">
      ＋
    </Link>
  </nav>
);

export default Header;
