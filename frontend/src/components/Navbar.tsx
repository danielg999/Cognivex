import styles from "./Navbar.module.css";

const Navbar = ({ onSelectGame }: { onSelectGame: (game: string) => void }) => {
  return (
    <nav className={styles.navbar}>
      <button
        onClick={() => onSelectGame("chunking")}
        className={styles.button}
      >
        Chunking
      </button>
      <button onClick={() => onSelectGame("another")} className={styles.button}>
        Another game
      </button>
    </nav>
  );
};

export default Navbar;
