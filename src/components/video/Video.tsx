import styles from "./video.module.css";
interface VideoProps {
  src: string;
}

const Video: React.FC<VideoProps> = ({ src }) => (
  <div className={styles.videoWrapper}>
    <iframe
      className={styles.video}
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default Video;
