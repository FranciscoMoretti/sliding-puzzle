import Board from "./board";
import * as Collections from 'typescript-collections';

function compareFunction (a : SearchNode, b : SearchNode) : number {
    if(a.moves + a.board.manhattan() > b.moves + b.board.manhattan()){
        return -1
    }else if(a.moves + a.board.manhattan() < b.moves + b.board.manhattan()){
        return 1
    }else{
        return 0
    }
}

class SearchNode {
    board: Board
    moves: number
    parent: SearchNode | undefined

    constructor(board: Board, moves: number, parent ?: SearchNode){
        this.board = board
        this.moves = moves
        this.parent = parent 
    }
}

export default class Solver {
    board: Board
    solution_path: Array<Board>

    // find a solution to the initial board (using the A* algorithm)
    constructor(initial: Board) {
        this.board = initial
        if(this.isSolvable()){
            this.solution_path = this.a_star(this.board)
        }else{
            this.solution_path = []
        }
    }
    
    // min number of moves to solve initial board
    public moves():number{
        return this.solution_path.length
    }

    // sequence of boards in a shortest solution
    public solution():Array<Board>{
        return this.solution_path
    }

    // is the initial board solvable? (see below)
    public isSolvable():boolean{
        let num_inversions : number = this.count_invertions(([] as number[]).concat(...this.board.tiles))
        if(this.board.n % 2 === 0){
            // dimension is even
            if(this.board.blank[0] % 2 === 0){
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

    private a_star(initial:Board): Array<Board> {
        let frontier_pq = new Collections.PriorityQueue<SearchNode>(compareFunction)
        frontier_pq.enqueue(new SearchNode(this.board, 0))
        
        while(!frontier_pq.isEmpty()){
            let current : SearchNode = frontier_pq.dequeue()!

            if (current.board.isGoal()){
                // return the current one
                let path = new Array<Board>()
                while(current.parent !== undefined){
                    path.unshift(current.board)
                    current = current.parent
                }
                return path
            }

            let neigbors: Array<Board> = current.board.get_neighbors()
            
            for(let board of neigbors){
                // check that we don't add the previous of the current again
                if(current.parent !== undefined && board.equals(current.parent.board)){
                    continue
                }
                frontier_pq.enqueue(new SearchNode(board, current.moves + 1, current))
            }
        }
        return []
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
