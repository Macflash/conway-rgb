/**
 * This file is for generating starting areas of certain sizes.
 *
 */

export type Board<T> = T[][];

export function CreateExhaustive<T>(
  height: number,
  width: number,
  values: T[]
): Board<T>[] {
  let boards: Board<T>[] = [[]];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const oldBoards = boards;
      boards = [];
      // multiply each existing board by also adding the new values
      for (let value of values) {
        for (let board of oldBoards) {
          const newBoard = board_copy(board);
          board_set(newBoard, value, i, j);
          boards.push(newBoard);
        }
      }
    }
  }

  return boards;
}

export function board_copy<T>(board: Board<T>): Board<T> {
  return board.map((row) => [...row]);
}

/** Sets a value in a board while ensuring all sub arrays are initialized. */
export function board_set<T>(board: Board<T>, value: T, i: number, j: number) {
  board[i] = board[i] || [];
  board[i][j] = value;
}
