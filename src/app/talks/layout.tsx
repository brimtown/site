import Header from "@/components/header/Header";
import styles from "../layout.module.css";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className={styles.padding}>
      <Header />
      <div className={styles.flexColumn}>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
