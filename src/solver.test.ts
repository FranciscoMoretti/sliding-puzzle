import Board from "./board";
import Solver from "./solver";
import * as tc from './test_constants'

test("solve TC2", () => {
  let solver = new Solver(new Board(3, tc.TC2_tiles));
  expect(solver.moves()).toEqual(2);  
  expect(solver.solution().map<number[][]>(
    (value)=> {return value.tiles})).toStrictEqual(tc.TC2_path);
});

test("solvable board", () => {
  expect(Board.isSolvable(new Board(3, tc.TC1_tiles))).toEqual(true);
  expect(Board.isSolvable(new Board(3, tc.TC2_tiles))).toEqual(true);
  expect(Board.isSolvable(new Board(4, tc.TC3_tiles))).toEqual(true);
  expect(Board.isSolvable(new Board(4, tc.TC3_neibourghs[0]))).toEqual(true);
  expect(Board.isSolvable(new Board(3, tc.TC1_twin1))).toEqual(false);
  expect(Board.isSolvable(new Board(3, tc.TC1_twin2))).toEqual(false);
  expect(Board.isSolvable(new Board(4, tc.TC3_twin))).toEqual(false);
});

fit("solve TC4", () => {
  let board1 = new Board(4, tc.TC3_tiles)
  expect(Board.isSolvable(board1)).toEqual(true);
  // let solver1 = new Solver();

  let board2 = new Board(3, tc.TC5_tiles)
  expect(Board.isSolvable(board2)).toEqual(true);  
  let solver2 = new Solver(board2);
  expect(solver2.moves()).toEqual(24);

  let board3 = new Board(4, tc.TC4_tiles)
  expect(Board.isSolvable(board3)).toEqual(true);  
  // let solver3 = new Solver(new Board(4, tc.TC4_tiles));
  // expect(solver3.moves()).toEqual(24);
});