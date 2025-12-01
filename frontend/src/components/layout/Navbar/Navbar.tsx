import styles from "./Navbar.module.css";
import { GameType } from "../../../types/Game.types";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onSelectGame = (game: GameType) => {
    navigate(`/${game}`);
  };
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
