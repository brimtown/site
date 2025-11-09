import styles from './ChatExample.module.css';

export const ChatExample = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.chatExample}>{children}</div>
);

export const Speaker = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <>
    <span className={`${styles.speaker} ${styles[`speaker${name}`]}`}>{name}:</span> {children}
  </>
);
