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
        if(Board.isSolvable(initial)){
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

    private a_star(initial:Board): Array<Board> {
        let frontier_pq = new Collections.PriorityQueue<SearchNode>(compareFunction)
        frontier_pq.enqueue(new SearchNode(initial, 0))
        
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
};
