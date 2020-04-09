import React from 'react';
import Board from './board'
import Solver from "./solver"

type SquareProps = {
  onClick: (() => void),
  value: number
}

export const Square : React.FC<SquareProps> = ({onClick, value}) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

type GridViewProps = {
  onClick: ((i:number) => void),
  grid: Array<number>
}

export const GridView : React.FC<GridViewProps> = ({onClick, grid}) => {
  function renderSquare(i:number) {
    return (
      <Square
        value={grid[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

interface IProps {
}

interface HistoryPointType{
  squares: Array<number>
}

interface IState {
  history: Array<HistoryPointType>,
  solutionStepNumber: number,
  currentTile: number,}

export class Game extends React.Component<IProps,IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(-1)
        }
      ],
      solutionStepNumber: 0,
      currentTile: 1,
    };
  }

  handleClick(i: number) {
    if(this.state.currentTile > 8 || this.state.history[0].squares[i] !== -1){
      return
    }
    const history = this.state.history.slice(0);
    const initial = this.state.history[0];
    const squares = initial.squares.slice();
    squares[i] = this.state.currentTile;
    if(this.state.currentTile === 8){
      squares[squares.indexOf(-1)] = 0;
      history[0].squares = squares
      let board = new Board(3,
        [squares.slice(0,3), squares.slice(3,6), squares.slice(6,9)])
      if(Board.isSolvable(board)){
        let solver = new Solver(board)
        console.log("moves number:" + solver.moves())
        let solutionSteps = solver.solution()
        for (let i= 0; i< solutionSteps.length; i++){
          history.push(
            {
              squares: [...solutionSteps[i].tiles[0], 
                ...solutionSteps[i].tiles[1],
                ...solutionSteps[i].tiles[2]]
            },
          )
        }
      }
    }else{
      history[0].squares = squares
    }
    this.setState({
      history: history,
      solutionStepNumber: history.length -1,
      currentTile: this.state.currentTile + 1 
    });
  }

  jumpTo(step: number) {
    this.setState({
      solutionStepNumber: step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.solutionStepNumber];

    const moves = history.map((_, move: number)=> {
      const desc = move ?
        'Go to move #' + move :
        'Go to initial board';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (this.state.currentTile > 8) {
      status = "Move: "+ this.state.solutionStepNumber;
    } else {
      status = "Next tile: " + this.state.currentTile;
    }

    return (
      <div className="game">
        <div className="game-board">
          <GridView
            grid={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
