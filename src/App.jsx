import { useState, useReducer } from "react";
import styles from "./App.module.css";

// todo: add randomizer for array values
function generateBlocks(number) {
  let halfMark = number / 2;

  if (halfMark % 2 !== 0)
    throw new Error("generateBlocks must receive an even number");

  let blocks = [];
  for (let i = 0; i < number; i++) {
    let block = { id: i, value: i + 1, isBlurred: true, isMatched: false };

    if (i >= halfMark) {
      block.value -= halfMark;
    }

    blocks.push(block);
  }

  for (let i = blocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
  }

  return blocks;
}

function Block({ block, onClick }) {
  if (block.isMatched) {
    return (
      <div className={`${styles.block} ${styles.isMatched}`}>
        <p>{block.value}</p>
      </div>
    );
  } else {
    return (
      <div className={styles.block} onClick={() => onClick(block)}>
        <p style={{ filter: block.isBlurred ? "blur(20px)" : "blur(0px)" }}>
          {block.value}
        </p>
      </div>
    );
  }
}

function boardReducer(state, action) {
  switch (action.type) {
    case "blur_all":
      return state.map((block) => {
        block.isBlurred = true;
        return block;
      });
    case "show_one":
      return state.map((block) => {
        if (block.id == action.payload.blockId) {
          block.isBlurred = false;
        }

        return block;
      });
    case "match_two":
      return state.map((block) => {
        if (
          block.id == action.payload.blockIdOne ||
          block.id == action.payload.blockIdTwo
        ) {
          block.isMatched = true;
        }

        return block;
      });
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Board() {
  let [blocks, dispatch] = useReducer(boardReducer, 16, generateBlocks);
  let [selectedBlocks, setSelectedBlocks] = useState([]);
  let [isWaiting, setIsWaiting] = useState(false);

  function resetBlur(wait = 2000) {
    setIsWaiting(true);
    setTimeout(() => {
      dispatch({ type: "blur_all" });
      setIsWaiting(false);
    }, wait);
  }

  function handleClick(currBlock) {
    if (isWaiting) return;

    let temp_selectedBlocks = [...selectedBlocks];

    temp_selectedBlocks.push(currBlock);

    dispatch({ type: "show_one", payload: { blockId: currBlock.id } });

    if (temp_selectedBlocks.length == 2) {
      if (temp_selectedBlocks[0].value == temp_selectedBlocks[1].value) {
        dispatch({
          type: "match_two",
          payload: {
            blockIdOne: temp_selectedBlocks[0].id,
            blockIdTwo: temp_selectedBlocks[1].id,
          },
        });
      }

      resetBlur();
      temp_selectedBlocks = [];
    }

    setSelectedBlocks(temp_selectedBlocks);
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
