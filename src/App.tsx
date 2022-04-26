import React from "react";
import "./App.css";
import { FloatBoard, RunStep } from "./games/float";

function App() {
  const [grid, setGrid] = React.useState<FloatBoard>([
    [0, 1, 0],
    [0, 0.3, 1],
    [1, 1, 1],
  ]);

  const size = 20;

  return (
    <div className='App'>
      <button
        onClick={() => {
          const newgrid = RunStep(grid);
          console.log(newgrid);
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
              onClick={() => {}}
              key={j}
              style={{
                position: "absolute",
                top: Number(i) * size,
                left: Number(j) * size,
                height: size,
                width: size,
                backgroundColor: b ? `rgba(255,0,0,${b})` : "black",
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
