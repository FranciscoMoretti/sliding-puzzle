import Board from "./board";
import Solver from "./solver";

const TC2_tiles = [
  [3, 1, 2],
  [4, 0, 5],
  [6, 7, 8]
];

const TC2_path = [
  [
    [3, 1, 2],
    [0, 4, 5],
    [6, 7, 8]
  ],
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]
];

test("neighbors TC2", () => {
  let solver = new Solver(new Board(3, TC2_tiles));
  expect(solver.moves()).toEqual(2);  
  expect(solver.solution().map<number[][]>((value)=> {return value.tiles})).toStrictEqual(TC2_path);


});
