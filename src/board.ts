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

    // all neighboring boards
    public get_neighbors(): Array<Board> {
        let neighbors = new Array<Board>()
        if (this.blank[0] > 0) {
            let tiles_copy = Board.deepCopyTiles(this.tiles)
            Board.swapTiles(tiles_copy, this.blank, [this.blank[0]-1, this.blank[1]])
            neighbors.push(new Board(this.n, tiles_copy))
        }
        if (this.blank[0] < this.n - 1) {
            let tiles_copy = Board.deepCopyTiles(this.tiles)
            Board.swapTiles(tiles_copy, this.blank, [this.blank[0]+1, this.blank[1]])
            neighbors.push(new Board(this.n, tiles_copy))
        }
        if (this.blank[1] > 0) {
            let tiles_copy = Board.deepCopyTiles(this.tiles)
            Board.swapTiles(tiles_copy, this.blank, [this.blank[0], this.blank[1]-1])
            neighbors.push(new Board(this.n, tiles_copy))
        }
        if (this.blank[1] < this.n - 1) {
            let tiles_copy = Board.deepCopyTiles(this.tiles)
            Board.swapTiles(tiles_copy, this.blank, [this.blank[0], this.blank[1]+1])
            neighbors.push(new Board(this.n, tiles_copy)) 
        }
        return neighbors
    }

    static swapTiles (tiles: number[][], tile1: number[], tile2: number[]){
        let tmp : number = tiles[tile1[0]][tile1[1]]
        tiles[tile1[0]][tile1[1]] = tiles[tile2[0]][tile2[1]]
        tiles[tile2[0]][tile2[1]] = tmp
    }

    static deepCopyTiles (tiles: number[][]) :  number[][] {
        let n = tiles.length
        let new_tiles = new Array<Array<number>>()
        for (let i: number = 0; i < n; i++) {
            new_tiles[i] = []
            for (let j: number = 0; j < n; j++) {
                new_tiles[i][j] = tiles[i][j] 
            }
        }
        return new_tiles
    }

    private count_invertions(tiles : Array<number>):number{
        var inversions:number = 0;

        for(var i:number=0;i<tiles.length;i++){
            for(var j:number=i+1;j<tiles.length;j++){
                if(tiles[j]>tiles[i]){
                    inversions++;
                }
            }
        }
        return inversions
    }

    // is the initial board solvable? (see below)
    static isSolvable(board: Board):boolean{
        let num_inversions : number = board.count_invertions(([] as number[]).concat(...board.tiles))
        if(board.n % 2 === 0){
            // dimension is even
            if(board.blank[0] % 2 === 0){
                // the blank is on an even row counting from the bottom
                // (or even row counting from the top starting from 0)
                // -> invertions must be odd
                return num_inversions % 2 === 1
            }else{
                // the blank is on an even row counting from the bottom
                // (or even row counting from the top starting from 0)
                // -> invertions must be even
                return num_inversions % 2 === 0
            }
        }else{
            // dimension is odd -> inversions must be even 
            return num_inversions % 2 === 0
        }
    }
};
