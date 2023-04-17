import styles from "./player.module.scss";

const MusicPlayer: React.FC = () => {
  return (
    <section className={styles.window}>
      <div className={styles.titleBar}>
        <div>
          <span className={styles.title}>Music player</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.btn}>
            <svg width="19" height="3" viewBox="0 0 19 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="19" height="3" fill="#353535" />
            </svg>
          </button>
          <button className={styles.btn}>
            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="16" height="13" stroke="#353535" strokeWidth="3" />
            </svg>
          </button>
          <button className={styles.btn}>x</button>
        </div>
      </div>
      <div className={styles.menu}>
        <span className={styles.item}>File</span>
        <span className={styles.item}>View</span>
        <span className={styles.item}>Playback</span>
        <span className={styles.item}>Help</span>
      </div>
      <div className={styles.container}>
        <div className={styles.display}>
          <span data-track="Rick Astley - Never Gonna Give You Up">
            Rick Astley - Never Gonna Give You Up
          </span>
        </div>
        <div className={styles.controls}>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
