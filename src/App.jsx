import { useState } from "react";
import styles from "./App.module.css";

// todo: add randomizer for array values
function generateBlocks(number) {
  let halfMark = number / 2;

  if (halfMark % 2 !== 0)
    throw new Error("generateBlocks must receive an even number");

  let blocks = [];
  for (let i = 0; i < number; i++) {
    let block = { id: i, value: i + 1, isBlurred: true, isFound: false };

    if (i >= halfMark) {
      block.value -= halfMark;
    }

    blocks.push(block);
  }
  return blocks;
}

function Block({ block, onClick }) {
  return (
    <div className={styles.block} onClick={() => onClick(block)}>
      <p style={{ filter: block.isBlurred ? "blur(10px)" : "blur(0px)" }}>
        {block.value}
      </p>
    </div>
  );
}

function Board() {
  let [blocks, setBlocks] = useState(generateBlocks(16));
  let [prevClick, setPrevClick] = useState(null);

  function handleClick(block) {
    if (prevClick == null) setPrevClick(block);

    let clicked;
  }

  return (
    <div className={styles.blockContainer}>
      {blocks.map((block) => (
        <Block key={block.id} block={block} onClick={handleClick} />
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
