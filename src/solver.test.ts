import Board from "./board";
import Solver from "./solver";
import * as tc from './test_constants'

test("neighbors TC2", () => {
  let solver = new Solver(new Board(3, tc.TC2_tiles));
  expect(solver.moves()).toEqual(2);  
  expect(solver.solution().map<number[][]>(
    (value)=> {return value.tiles})).toStrictEqual(tc.TC2_path);
});

test("solvable board", () => {
  let board1 = new Solver(new Board(3, tc.TC1_tiles))
  let board2 = new Solver(new Board(3, tc.TC2_tiles))
  let board3 = new Solver(new Board(4, tc.TC3_tiles))
  let board4 = new Solver(new Board(4, tc.TC3_neibourghs[0]))
  let board5 = new Solver(new Board(3, tc.TC1_twin1))
  let board6 = new Solver(new Board(3, tc.TC1_twin2))
  let board7 = new Solver(new Board(4, tc.TC3_twin))

  expect(board1.isSolvable()).toEqual(true);
  expect(board2.isSolvable()).toEqual(true);
  expect(board3.isSolvable()).toEqual(true);
  expect(board4.isSolvable()).toEqual(true);
  expect(board5.isSolvable()).toEqual(false);
  expect(board6.isSolvable()).toEqual(false);
  expect(board7.isSolvable()).toEqual(false);
});