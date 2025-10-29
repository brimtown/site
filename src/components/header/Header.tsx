"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";

interface Props {
  color?: string;
}

const Header: React.FC<Props> = ({ color }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.headerWrapper} style={{ color: color }}>
      <Link href="/" className={styles.nameLink}>
        Tim Brown
      </Link>
      <div className={styles.menuContainer}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Menu"
        >
          <span className={styles.menuIcon}>⋮</span>
        </button>

        <div
          className={`${styles.menuDropdown} ${menuOpen ? styles.menuOpen : ""}`}
        >
          <Link href="/blog" className={styles.menuItem}>
            Blog
          </Link>
          <Link href="/links" className={styles.menuItem}>
            Links
          </Link>
        </div>

        <div className={styles.desktopLinks}>
          <Link href="/blog" className={styles.desktopLink}>
            Blog
          </Link>
          <Link href="/links" className={styles.desktopLink}>
            Links
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
