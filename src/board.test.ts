import Board from "./board";
import * as tc from "./test_constants"

test("goal 3x3 board", () => {
  let board = new Board(3, tc.TC1_tiles);
  expect(board.isGoal()).toEqual(true);
});

test("non-goal 3x3 board", () => {
  let board = new Board(3, tc.TC2_tiles);
  expect(board.isGoal()).toEqual(false);
});

test("from other constructor", () => {
  let board = Board.fromOther(new Board(3, tc.TC1_tiles));
  expect(board.isGoal()).toEqual(true);
});

test("to string method", () => {
  let board = new Board(3, tc.TC1_tiles);
  expect(board.toString()).toStrictEqual(tc.TC1_string);
});

test("hamming distance", () => {
  expect(new Board(3, tc.TC1_tiles).manhattan()).toEqual(0);
  expect(new Board(3, tc.TC2_tiles).hamming()).toEqual(2);
  expect(new Board(3, tc.TC5_tiles).hamming()).toEqual(7);
});

test("manhattan tc.TC1", () => {
  let board = new Board(3, tc.TC1_tiles);
  expect(board.manhattan()).toEqual(0);
});

test("manhattan tc.TC2", () => {
  let board = new Board(3, tc.TC2_tiles);
  expect(board.manhattan()).toEqual(2);
});

test("equals tc.TC2", () => {
  let board1 = new Board(3, tc.TC2_tiles);
  let board2 = new Board(3, tc.TC2_tiles);
  expect(board1.equals(board2)).toEqual(true);
});

test("not-equals tc.TC1-tc.TC2", () => {
  let board1 = new Board(3, tc.TC1_tiles);
  let board2 = new Board(3, tc.TC2_tiles);
  expect(board1.equals(board2)).toEqual(false);
});

test("not-equals tc.TC1-tc.TC3", () => {
  let board1 = new Board(3, tc.TC1_tiles);
  let board2 = new Board(3, tc.TC3_tiles);
  expect(board1.equals(board2)).toEqual(false);
});

test("neighbors tc.TC1", () => {
  let board = new Board(3, tc.TC1_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(3, tc.TC1_neibourghs[0]);
  let expected_n1 = new Board(3, tc.TC1_neibourghs[1]);
  expect(
    neighbors[0].equals(expected_n0) && neighbors[1].equals(expected_n1)
  ).toEqual(true);
});

test("neighbors T2", () => {
  let board = new Board(3, tc.TC2_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(3, tc.TC2_neibourghs[0]);
  let expected_n1 = new Board(3, tc.TC2_neibourghs[1]);
  let expected_n2 = new Board(3, tc.TC2_neibourghs[2]);
  let expected_n3 = new Board(3, tc.TC2_neibourghs[3]);
  expect(
    neighbors[0].equals(expected_n0) &&
      neighbors[1].equals(expected_n1) &&
      neighbors[2].equals(expected_n2) &&
      neighbors[3].equals(expected_n3)
  ).toEqual(true);
});

test("neighbors T3", () => {
  let board = new Board(4, tc.TC3_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(4, tc.TC3_neibourghs[0]);
  let expected_n1 = new Board(4, tc.TC3_neibourghs[1]);
  let expected_n2 = new Board(4, tc.TC3_neibourghs[2]);
  expect(
    neighbors[0].equals(expected_n0) &&
      neighbors[1].equals(expected_n1) &&
      neighbors[2].equals(expected_n2)
  ).toEqual(true);
});

test("neighbors T4", () => {
  let board = new Board(4, tc.TC4_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(4, tc.TC4_neibourghs[0]);
  let expected_n1 = new Board(4, tc.TC4_neibourghs[1]);
  expect(
    neighbors[0].equals(expected_n0) &&
      neighbors[1].equals(expected_n1)
  ).toEqual(true);
});