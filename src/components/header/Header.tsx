"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

interface Props {
  color?: string;
}

const Header: React.FC<Props> = ({ color }) => {
  const pathname = usePathname();

  return (
    <nav className={styles.headerWrapper} style={{ color: color }}>
      <Link href="/" className={styles.nameLink}>
        Tim Brown
      </Link>
      <div className={styles.links}>
        <Link
          href="/blog"
          className={`${styles.link} ${pathname === "/blog" ? styles.linkActive : ""}`}
        >
          Blog
        </Link>
        <Link
          href="/links"
          className={`${styles.link} ${pathname === "/links" ? styles.linkActive : ""}`}
        >
          Links
        </Link>
      </div>
    </nav>
  );
};

export default Header;
