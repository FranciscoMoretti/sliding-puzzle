import React from 'react';
import Board from './board'
import Solver from "./solver"
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import update from "immutability-helper"

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
  onClick: ((row:number, column:number) => void),
  grid: Array<Array<number>>
}

export const GridView : React.FC<GridViewProps> = ({onClick, grid}) => {
  function renderSquare(row:number, column:number) {
    return (
      <Square 
        value={grid[row][column]}
        onClick={() => {onClick(row, column)}}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0,0)}
        {renderSquare(0,1)}
        {renderSquare(0,2)}
      </div>
      <div className="board-row">
        {renderSquare(1,0)}
        {renderSquare(1,1)}
        {renderSquare(1,2)}
      </div>
      <div className="board-row">
        {renderSquare(2,0)}
        {renderSquare(2,1)}
        {renderSquare(2,2)}
      </div>
    </div>
  );
}

interface IProps {
}

interface HistoryPointType{
  squares: Array<Array<number>>
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
          squares:Array<Array<number>>(3).fill([]).map(() => new Array<number>(3).fill(-1))
        }
      ],
      solutionStepNumber: 0,
      currentTile: 1,
    };
  }

  handleClick(row: number, column: number) {
    if(this.state.currentTile > 8 || this.state.history[0].squares[row][column] !== -1){
      return
    }
    let initial_squares : Array<Array<number>> = update(this.state.history[0].squares, {
      [row]: {
        [column]: {$set: this.state.currentTile}
      }
    })

    if(this.state.currentTile === 8){
      // find the last tile and set it to 0 (blank)
      for (let rowArr of initial_squares) {
        let ind = rowArr.indexOf(-1)
        if (ind !== -1){
          rowArr[ind] = 0
          break
        }
      }
      let board = new Board(3, initial_squares)
      if(Board.isSolvable(board)){
        let solver = new Solver(board)
        console.log("moves number:" + solver.moves())
        let solutionSteps = solver.solution()
        this.setState({
          history: [{squares:initial_squares }, ...solutionSteps.map((step) =>{ return {squares: step.tiles}})],
        })
      }else{
        console.log("Unsolvable board")
      }
    }else{
      this.setState({
        history : [{squares:initial_squares}]
      })
    }
    this.setState({
      solutionStepNumber:  this.state.history.length -1,
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

    let status;
    if (this.state.currentTile > 8) {
      status = "Move: "+ this.state.solutionStepNumber;
    } else {
      status = "Next tile: " + this.state.currentTile;
    }

    const marks = this.state.currentTile > 8 ? [
      {
        value: 0,
        label: 'Start',
      },
      {
        value: history.length-1,
        label: 'end',
      },] : [];

    return (
      <div className="game">
        <div className="game-board">
          <GridView
            grid={history[this.state.solutionStepNumber].squares}
            onClick={(row, col) => this.handleClick(row, col)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
        <Typography id="discrete-slider" gutterBottom>
        Step
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          onChangeCommitted={(_, value:number | number[]) => {this.jumpTo(value as number)}}
          min={0}
          max={history.length-1}
          disabled={this.state.currentTile < 9}
        />
      </div>
    );
  }
}
