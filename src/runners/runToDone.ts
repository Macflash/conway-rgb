/**
 * File to try running a starting pattern to determine if it is viable and interesting.
 * (E.G. How long until it is empty? Or does it never change?)
 *
 */

import { BooleanBoard } from "../games/boolean";
import { FloatBoard, RunStep } from "../games/float";

export function RunPattern(board: FloatBoard, maxSteps = 10) {
  let currentBoard = board;
  for (let i = 0; i < maxSteps; i++) {
    currentBoard = RunStep(currentBoard);
  }

  return IsEmptyBoard(currentBoard);
}

function IsEmptyBoard(board: FloatBoard | BooleanBoard): boolean {
  for (let i in board) {
    for (let j in board[i]) {
      if (board[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function SumBoard(board: FloatBoard): number {
  let sum = 0;
  for (let i in board) {
    for (let j in board[i]) {
      if (board[i][j]) {
        sum += board[i][j];
      }
    }
  }

  return sum;
}
