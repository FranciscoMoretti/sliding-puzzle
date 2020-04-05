export default class Board {
    tiles: number[][];
    n: number;
    blank: number[];
    hamming_d: number;
    manhattan_d: number;

    constructor(_n: number, _tiles: number[][]) {
        this.n = _n
        this.tiles = new Array<Array<number>>()
        this.blank = [-1, -1]
        this.hamming_d = 0
        this.manhattan_d = 0
        let index: number = 0
        for (let i: number = 0; i < _n; i++) {
            this.tiles[i] = []
            for (let j: number = 0; j < _n; j++) {
                let tile : number = _tiles[i][j] 
                this.tiles[i][j] =tile
                if (tile === 0) {
                    this.blank = [i, j]
                }else{
                    if (tile !== index) {
                        this.hamming_d++
                    };
                    let x_diff = Math.abs(tile % this.n - j)
                    let y_diff = Math.abs(Math.floor(tile / this.n) - i)
                    this.manhattan_d += x_diff + y_diff
                }
                index++
            }
        }
    }

    static fromOther(other: Board) {
        return new this(other.dimension(), other.tiles)
    }

    // string representation of this board
    public toString(): string {
        let str = this.n.toString() + '\n'
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                str += this.tiles[i][j].toString()
                if (j < this.n - 1) {
                    str += ' '
                }
            }
            str += '\n'
        }
        return str
    }

    // board dimension n
    public dimension(): number {
        return this.n
    }

    // number of tiles out of place
    public hamming(): number {
        return this.hamming_d
            }

    // sum of Manhattan distances between tiles and goal
    public manhattan(): number {
        return this.manhattan_d
                }

    // is this board the goal board?
    public isGoal(): boolean {
        return this.hamming() === 0
    }

    // does this board equal y?
    public equals(other: Board): boolean {
        if (this.n !== other.dimension()) {
            return false
        }
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (this.tiles[i][j] !== other.tiles[i][j]) {
                    return false
                };
            }
        }
        return true
    }

    public down() {
        let y0 = this.blank[0]
        let x0 = this.blank[1]
        this.tiles[y0][x0] = this.tiles[y0 - 1][x0]
        this.tiles[y0 - 1][x0] = 0
        this.blank = [y0 - 1, x0]
    }

    public up() {
        let y0 = this.blank[0]
        let x0 = this.blank[1]
        this.tiles[y0][x0] = this.tiles[y0 + 1][x0]
        this.tiles[y0 + 1][x0] = 0
        this.blank = [y0 + 1, x0]
    }

    public right() {
        let y0 = this.blank[0]
        let x0 = this.blank[1]
        this.tiles[y0][x0] = this.tiles[y0][x0 - 1]
        this.tiles[y0][x0 - 1] = 0
        this.blank = [y0, x0 - 1]
    }

    public left() {
        let y0 = this.blank[0]
        let x0 = this.blank[1]
        this.tiles[y0][x0] = this.tiles[y0][x0 + 1]
        this.tiles[y0][x0 + 1] = 0
        this.blank = [y0, x0 + 1]
    }

    // all neighboring boards
    public get_neighbors(): Array<Board> {
        let neighbors = new Array<Board>()
        if (this.blank[0] > 0) {
            let board = Board.fromOther(this)
            board.down()
            neighbors.push(board)
        }
        if (this.blank[0] < this.n - 1) {
            let board = Board.fromOther(this)
            board.up()
            neighbors.push(board)
        }
        if (this.blank[1] > 0) {
            let board = Board.fromOther(this)
            board.right()
            neighbors.push(board)
        }
        if (this.blank[1] < this.n - 1) {
            let board = Board.fromOther(this)
            board.left()
            neighbors.push(board)
        }
        return neighbors
    }
};
