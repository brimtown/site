import Header from "@/components/header/Header";
import styles from "../layout.module.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.padding}>
      <Header />
      <div className={styles.flexColumn}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

