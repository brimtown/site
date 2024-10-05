import type { MDXComponents } from "mdx/types";
import styles from "./src/components/mdx.module.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
    p: ({ children }) => <p className={styles.p}>{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className={styles.a}>
        {children}
      </a>
    ),
    ...components,
  };
}
