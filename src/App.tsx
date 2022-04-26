import React from "react";
import logo from "./logo.svg";
import "./App.css";

export type Board = boolean[][];

// Per tile count of the neighbors
export type Neighbors = number[][];

function AddTileToNeighbors(
  b: number,
  io: number,
  jo: number,
  neighbors: Neighbors
) {
  // This will grow the board forever essentially.
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      neighbors[io + i] = neighbors[io + i] || [];
      neighbors[io + i][jo + j] = (neighbors[io + i][jo + j] || 0) + b;
    }
  }
}

function CreateNeighbors(board: Board): Neighbors {
  const neighbors: Neighbors = [];
  for (let i in board) {
    const row = board[i];
    for (let j in row) {
      const b = row[j];
      if (b) {
        // this is probably really slow. we should really find the lowest one and go from there...
        AddTileToNeighbors(1, Number(i), Number(j), neighbors);
      }
    }
  }

  return neighbors;
}

function RunStep(board: Board): Board {
  const newBoard: Board = [];
  const neighbors = CreateNeighbors(board);
  console.log("neighbors", neighbors);

  // iterating board will keep a fixed size
  // iterating neighbors will grow
  for (let i in neighbors) {
    // hmm this is a string index now...
    const row = neighbors[i];
    for (let j in row) {
      board[i] = board[i] || [];
      const b = board[i][j];
      const n = neighbors[i]?.[j] || 0;
      // Live cell survives on 2 or 3, empty cell born on 3.
      newBoard[i] = newBoard[i] || [];
      newBoard[i][j] = b ? n === 2 || n === 3 : n === 3;
    }
  }

  return newBoard;
}

function App() {
  const [grid, setGrid] = React.useState<Board>([
    [false, true, false],
    [false, false, true],
    [true, true, true],
  ]);

  const size = 20;

  React.useEffect(() => {
    // setTimeout(() => {
    //   console.log("running grid");
    //   setGrid(RunStep(grid));
    // }, 1000);
  }, [grid, setGrid]);

  return (
    <div className='App'>
      <button
        onClick={() => {
          const newgrid = RunStep(grid);
          console.log("NEW GRID", newgrid);
          setGrid(newgrid);
        }}>
        Step
      </button>
      <button
        onClick={() => {
          let g = grid;
          setInterval(() => {
            g = RunStep(g);
            setGrid(g);
          }, 100);
        }}>
        Run
      </button>
      {/* There is no FIXED number per row, and no guaranteed positions. */}
      {grid.map((row, i) => (
        <div key={i}>
          {row.map((b, j) => (
            <div
              key={j}
              style={{
                position: "absolute",
                top: Number(i) * size,
                left: Number(j) * size,
                height: size,
                width: size,
                backgroundColor: b ? "green" : "black",
                border: "1px solid black",
              }}></div>
          ))}
        </div>
      ))}
      <div></div>
    </div>
  );
}

export default App;
