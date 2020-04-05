export default class Board {
    tiles: number[][];
    n: number;
    blank: number[];

    constructor(_n: number, _tiles: number[][]) {
        this.n = _n
        this.tiles = new Array<Array<number>>()
        this.blank = [-1, -1]
        for (let i: number = 0; i < _n; i++) {
            this.tiles[i] = []
            for (let j: number = 0; j < _n; j++) {
                this.tiles[i][j] = _tiles[i][j]
                if (_tiles[i][j] === 0) {
                    this.blank = [i, j]
                }
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
        let hamming: number = 0
        let index: number = 0
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if (this.tiles[i][j] !== index++ && this.tiles[i][j] !== 0) {
                    hamming++
                };
            }
        }
        return hamming
    }

    // sum of Manhattan distances between tiles and goal
    public manhattan(): number {
        let manhattan: number = 0
        for (let i: number = 0; i < this.n; i++) {
            for (let j: number = 0; j < this.n; j++) {
                if( this.tiles[i][j] === 0){
                    continue
                }
                let x_diff = Math.abs(this.tiles[i][j] % this.n - j)
                let y_diff = Math.abs(Math.floor(this.tiles[i][j] / this.n) - i)
                manhattan += x_diff + y_diff
            }
        }
        return manhattan
    }

    // is this board the goal board?
    public isGoal(): boolean {
        return this.hamming() === 0
    }

    // is the initial board solvable? (see below)
    public isSolvable():boolean{
        let num_inversions : number = this.count_invertions(([] as number[]).concat(...this.tiles))
        if(this.n % 2 === 0){
            // dimension is even
            if(this.blank[0] % 2 === 0){
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
};
