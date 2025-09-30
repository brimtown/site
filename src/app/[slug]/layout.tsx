import Header from "@/components/header/Header";
import styles from "../layout.module.css";
import mdxStyles from "@/styles/mdx-layout.module.css";

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.padding}>
      <Header />
      <div className={styles.flexColumn}>
        <main className={`${styles.main} ${mdxStyles.mdxContent}`}>{children}</main>
      </div>
    </div>
  );
}