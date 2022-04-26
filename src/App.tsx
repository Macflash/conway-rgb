import React from "react";
import "./App.css";
import { CreatNeighbors, FloatBoard, RunStep } from "./games/float";
import { Board, CreateExhaustive } from "./runners/startingSquares";
import {
  board_dimensions_2d,
  board_isEmpty,
  dimension_size,
} from "./utils/boardUtils";

function App() {
  const [search_h, setSearch_h] = React.useState(3);
  const [search_w, setSearch_w] = React.useState(3);
  const [search_values, setSearch_values] = React.useState([0, 1]);

  const startingGrids = React.useMemo(
    () => CreateExhaustive(search_h, search_w, search_values),
    [search_h, search_w, search_values]
  );

  const [boards, setBoards] = React.useState(startingGrids);

  React.useEffect(() => {
    setBoards(startingGrids);
  }, [startingGrids, setBoards]);

  const size = 20;

  return (
    <div className='App'>
      <button
        onClick={() => {
          setBoards(boards.map((b) => RunStep(b)));
        }}>
        Step
      </button>
      <button
        onClick={() => {
          let bs = boards;
          setInterval(() => {
            bs = bs.map((b) => RunStep(b));
            setBoards(bs);
          }, 100);
        }}>
        Run
      </button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {boards.map((board, key) => (
          <div key={key}>
            <Grid
              board={board}
              size={size}
              onClick={() => {
                // update just this board a step
                const newBoards = [...boards];
                newBoards[key] = RunStep(board);
                setBoards(newBoards);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Grid<T extends number>({
  board,
  size,
  onClick,
}: {
  board: Board<T>;
  size: number;
  onClick: () => void;
}) {
  const [minSize, setMinSize] = React.useState(3);

  if (board_isEmpty(board)) return null;

  const dimensions = board_dimensions_2d(board);

  // whatever the largest size was... we should keep it..

  const i_size = Math.max(minSize, dimension_size(dimensions[0]));
  const j_size = Math.max(minSize, dimension_size(dimensions[1]));

  // better if memo-ized?
  const neighbors = CreatNeighbors(board);
  const border = 0;

  // map doesnt do negative numbers I think.
  const tiles = [];

  for (let i_str in board) {
    const row = board[i_str];
    const i = Number(i_str);
    for (let j_str in row) {
      const value = row[j_str];
      const j = Number(j_str);

      tiles.push(
        <div
          data-i={i}
          data-j={j}
          data-value={value}
          key={`${i},${j}`}
          style={{
            position: "absolute",
            top: (Number(i) - dimensions[0].min) * size,
            left: (Number(j) - dimensions[1].min) * size,
            height: size - border * 2,
            width: size - border * 2,
            backgroundColor: value
              ? live_or_die_color(neighbors[i]?.[j] || 0)
              : "black", // this could either use the float value or the neighbor values
            border: `${border}px solid ${value ? "green" : "black"}`,
          }}></div>
      );
    }
  }
  return (
    <div
      onClick={onClick}
      data-dimension-i={`i: ${dimensions[0].min} to ${dimensions[0].max}: ${i_size}`}
      data-dimension-j={`j: ${dimensions[1].min} to ${dimensions[1].max}: ${j_size}`}
      style={{
        position: "relative",
        height: i_size * size,
        width: j_size * size,
        border: "5px solid black",
        margin: 5,
        backgroundColor: "black",
      }}>
      {tiles}
    </div>
  );
}

function neighbor_color(n: number): string {
  // cool to hot
  if (n >= 8) return "red";
  if (n >= 7) return "orange";
  if (n >= 6) return "yellow";
  if (n >= 5) return "green";
  if (n >= 4) return "blue";
  if (n >= 3) return "purple";
  if (n >= 2) return "brown";
  if (n >= 1) return "grey";
  if (n > 0) return "darkgrey";

  return "darkgrey";
}

// assumes we are living now.
function live_or_die_color(neighbors: number) {
  if (neighbors >= 2 && neighbors < 4) {
    return "green";
  }
  return "red";
}

function grey_neighbor_color(n: number) {
  const value = scale_value(n, 8, 255);
  return `rgb(${value}, ${value}, ${value})`;
}

// e.g. 1 out of 8 scaled to 255
function scale_value(value: number, max: number, scale: number) {
  // gamma is essentially this 2.5 here.
  return ((value + 2.5) * scale) / (max + 1);
}

export default App;
