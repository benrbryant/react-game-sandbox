import { useState } from "react";
import styles from "./App.module.css";

const BLOCKS = new Array(16).fill(1);
BLOCKS.forEach((num, idx, arr) => {
  arr[idx] *= Math.round(Math.random() * (10 - 1) + 1);
});

function Block({ value }) {
  let [isBlurred, setIsBlurred] = useState(true);

  function flashBlock(e) {
    setIsBlurred(false);

    setTimeout(() => {
      setIsBlurred(true);
    }, 2000);
  }

  return (
    <div className={styles.block} onClick={flashBlock}>
      <p style={{ filter: isBlurred ? "blur(10px)" : "blur(0px)" }}>{value}</p>
    </div>
  );
}

function Board() {
  let [blocks, setBlocks] = useState(BLOCKS);

  return (
    <div className={styles.blockContainer}>
      {blocks.map((value, idx) => (
        <Block key={idx} value={value} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className={styles.container}>
      <Board />
    </div>
  );
}

export default App;
