/**
 * Basic Conway's Game of Life implementation.
 *
 * Board scales forever in all directions.
 * Number() casts are not super efficient.
 * Uses boolean values to create neighbor counts.
 */
export type BooleanBoard = boolean[][];
export type Neighbors = number[][];

export function AddToNeighbors(io: number, jo: number, neighbors: Neighbors) {
  // This will grow the board forever essentially.
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      neighbors[io + i] = neighbors[io + i] || [];
      neighbors[io + i][jo + j] = (neighbors[io + i][jo + j] || 0) + 1;
    }
  }
}

export function CreatNeighbors(board: BooleanBoard): Neighbors {
  const neighbors: Neighbors = [];
  for (let i in board) {
    const row = board[i];
    for (let j in row) {
      const b = row[j];
      if (b) {
        // this is probably really slow. we should really find the lowest one and go from there...
        AddToNeighbors(Number(i), Number(j), neighbors);
      }
    }
  }

  return neighbors;
}

export function RunStep(board: BooleanBoard): BooleanBoard {
  const newBoard: BooleanBoard = [];
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
      newBoard[i][j] = b ? n === 2 || n === 3 : n === 3;
    }
  }

  return newBoard;
}
