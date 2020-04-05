import Board from "./board";

const TC1_tiles = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

const TC1_string = "3\n0 1 2\n3 4 5\n6 7 8\n";

const TC1_neibourghs = [
  [
    [3, 1, 2],
    [0, 4, 5],
    [6, 7, 8]
  ],
  [
    [1, 0, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]
];

const TC1_twin1 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 8, 7]
];

const TC1_twin2 = [
  [0, 1, 2],
  [3, 7, 5],
  [6, 4, 8]
];

const TC2_tiles = [
  [3, 1, 2],
  [4, 0, 5],
  [6, 7, 8]
];

const TC2_neibourghs = [
  [
    [3, 0, 2],
    [4, 1, 5],
    [6, 7, 8]
  ],
  [
    [3, 1, 2],
    [4, 7, 5],
    [6, 0, 8]
  ],
  [
    [3, 1, 2],
    [0, 4, 5],
    [6, 7, 8]
  ],
  [
    [3, 1, 2],
    [4, 5, 0],
    [6, 7, 8]
  ]
];

const TC3_tiles = [
  [4, 1, 2, 3],
  [8, 5, 6, 7],
  [9, 10, 11, 0],
  [12, 13, 14, 15]
];

const TC3_neibourghs = [
  [
    [4, 1, 2, 3],
    [8, 5, 6, 0],
    [9, 10, 11, 7],
    [12, 13, 14, 15]
  ],
  [
    [4, 1, 2, 3],
    [8, 5, 6, 7],
    [9, 10, 11, 15],
    [12, 13, 14, 0]
  ],
  [
    [4, 1, 2, 3],
    [8, 5, 6, 7],
    [9, 10, 0, 11],
    [12, 13, 14, 15]
  ]
];

const TC3_twin = [
  [4, 1, 2, 3],
  [8, 5, 6, 7],
  [9, 10, 14, 0],
  [11, 13, 14, 15]
];

test("goal 3x3 board", () => {
  let board = new Board(3, TC1_tiles);
  expect(board.isGoal()).toEqual(true);
});

test("non-goal 3x3 board", () => {
  let board = new Board(3, TC2_tiles);
  expect(board.isGoal()).toEqual(false);
});

test("solvable board", () => {
  let board1 = new Board(3, TC1_tiles);
  let board2 = new Board(3, TC2_tiles);
  let board3 = new Board(4, TC3_tiles);
  let board4 = new Board(4, TC3_neibourghs[0])
  let board5 =new Board(3, TC1_twin1);
  let board6 =new Board(3, TC1_twin2);
  let board7 = new Board(4, TC3_twin)

  expect(board1.isSolvable()).toEqual(true);
  expect(board2.isSolvable()).toEqual(true);
  expect(board3.isSolvable()).toEqual(true);
  expect(board4.isSolvable()).toEqual(true);
  expect(board5.isSolvable()).toEqual(false);
  expect(board6.isSolvable()).toEqual(false);
  expect(board7.isSolvable()).toEqual(false);
});

test("from other constructor", () => {
  let board = Board.fromOther(new Board(3, TC1_tiles));
  expect(board.isGoal()).toEqual(true);
});

test("to string method", () => {
  let board = new Board(3, TC1_tiles);
  expect(board.toString()).toStrictEqual(TC1_string);
});

test("hamming TC2", () => {
  let board = new Board(3, TC2_tiles);
  expect(board.hamming()).toEqual(2);
});

test("manhattan TC1", () => {
  let board = new Board(3, TC1_tiles);
  expect(board.manhattan()).toEqual(0);
});

test("manhattan TC2", () => {
  let board = new Board(3, TC2_tiles);
  expect(board.manhattan()).toEqual(2);
});

test("equals TC2", () => {
  let board1 = new Board(3, TC2_tiles);
  let board2 = new Board(3, TC2_tiles);
  expect(board1.equals(board2)).toEqual(true);
});

test("not-equals TC1-TC2", () => {
  let board1 = new Board(3, TC1_tiles);
  let board2 = new Board(3, TC2_tiles);
  expect(board1.equals(board2)).toEqual(false);
});

test("not-equals TC1-TC3", () => {
  let board1 = new Board(3, TC1_tiles);
  let board2 = new Board(3, TC3_tiles);
  expect(board1.equals(board2)).toEqual(false);
});

test("neighbors TC1", () => {
  let board = new Board(3, TC1_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(3, TC1_neibourghs[0]);
  let expected_n1 = new Board(3, TC1_neibourghs[1]);
  expect(
    neighbors[0].equals(expected_n0) && neighbors[1].equals(expected_n1)
  ).toEqual(true);
});

test("neighbors T2", () => {
  let board = new Board(3, TC2_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(3, TC2_neibourghs[0]);
  let expected_n1 = new Board(3, TC2_neibourghs[1]);
  let expected_n2 = new Board(3, TC2_neibourghs[2]);
  let expected_n3 = new Board(3, TC2_neibourghs[3]);
  expect(
    neighbors[0].equals(expected_n0) &&
      neighbors[1].equals(expected_n1) &&
      neighbors[2].equals(expected_n2) &&
      neighbors[3].equals(expected_n3)
  ).toEqual(true);
});

test("neighbors T3", () => {
  let board = new Board(4, TC3_tiles);
  let neighbors = board.get_neighbors();
  let expected_n0 = new Board(4, TC3_neibourghs[0]);
  let expected_n1 = new Board(4, TC3_neibourghs[1]);
  let expected_n2 = new Board(4, TC3_neibourghs[2]);
  expect(
    neighbors[0].equals(expected_n0) &&
      neighbors[1].equals(expected_n1) &&
      neighbors[2].equals(expected_n2)
  ).toEqual(true);
});
