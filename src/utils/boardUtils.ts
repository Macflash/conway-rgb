/**
 * MISC utils
 */

import { Board } from "../runners/startingSquares";

export function board_isEmpty<T>(board: Board<T>): boolean {
  for (let i in board) {
    for (let j in board[i]) {
      if (board[i][j]) {
        return false;
      }
    }
  }

  return true;
}

// Should it be fixed or ... sparse?
export type Axis = { min: number; max: number };

export type Dimensions = Axis[];

// Can do extra dimensions separately and generically later...
export function board_dimensions_2d<T>(board: Board<T>): Dimensions {
  const i_axis: Axis = {
    min: 100000000,
    max: -100000000,
  };
  const j_axis: Axis = {
    min: 100000000,
    max: -100000000,
  };
  const d: Dimensions = [i_axis, j_axis];

  for (let i in board) {
    let hasValue = false;
    const row = board[i];
    for (let j in row) {
      if (j) {
        hasValue = true;
        const nj = Number(j);
        j_axis.min = Math.min(j_axis.min, nj);
        j_axis.max = Math.max(j_axis.max, nj);
      }
    }

    if (hasValue) {
      const ni = Number(i);
      i_axis.min = Math.min(i_axis.min, ni);
      i_axis.max = Math.max(i_axis.max, ni);
    }
  }

  return d;
}

// -2 -> 2 = 5, 0 to 0 = 1.
export function dimension_size(axis: Axis): number {
  return axis.max - axis.min + 1;
}
