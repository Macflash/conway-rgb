/**
 * Basic Conway's Game of Life implementation.
 *
 * Board scales forever in all directions.
 * Number() casts are not super efficient.
 * Uses boolean values to create neighbor counts.
 */
export type FloatBoard = number[][];
export type Neighbors = number[][];

export function AddToNeighbors(
  value: number,
  io: number,
  jo: number,
  neighbors: Neighbors
) {
  // This will grow the board forever essentially.
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      neighbors[io + i] = neighbors[io + i] || [];
      neighbors[io + i][jo + j] = (neighbors[io + i][jo + j] || 0) + value;
    }
  }
}

export function CreatNeighbors(board: FloatBoard): Neighbors {
  const neighbors: Neighbors = [];
  for (let i in board) {
    const row = board[i];
    for (let j in row) {
      const b = row[j];
      if (b) {
        // this is probably really slow. we should really find the lowest one and go from there...
        AddToNeighbors(b, Number(i), Number(j), neighbors);
      }
    }
  }

  return neighbors;
}

export function RunStep(
  board: FloatBoard,
  traditional = true,
  scale = 3
): FloatBoard {
  const newBoard: FloatBoard = [];
  const neighbors = CreatNeighbors(board);

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
      if (b) {
        if (n >= 2 && n < 4) {
          // survives
          // newBoard[i][j] = 1; // Behaves like normal conway!
          newBoard[i][j] = traditional ? 1 : n / scale; // this changes things a lot! but without it.. it's essentially the same. All float values go away.
        }
      } else {
        if (n >= 3 && n < 4) {
          // born!
          newBoard[i][j] = 1;
        }
      }
    }
  }

  return newBoard;
}
