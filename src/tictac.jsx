import React from 'react';
import Board from './board'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export class BoardView extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      solutionStepNumber: 0,
      currentTile: 1,
    };
  }

  handleClick(i) {
    if(this.state.currentTile > 8){
      return
    }
    // const history = this.state.history.slice(0, this.state.solutionStepNumber + 1);
    // const current = history[history.length - 1];
    // const squares = current.squares.slice();
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    // squares[i] = this.state.currentTile;

    const initial = this.state.history[0];
    const squares = initial.squares.slice();
    squares[i] = this.state.currentTile;
    if(this.state.currentTile === 8){
      squares[squares.indexOf(null)] = 0;
    }
    this.setState({
      history: //history.concat([
        [{
          squares: squares
        }],
//      ]),
      // solutionStepNumber: history.length,
      currentTile: this.state.currentTile + 1 
    });
  }

  jumpTo(step) {
    this.setState({
      solutionStepNumber: step,
      // SET THE RIGHT BOARD
      // xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.solutionStepNumber];
    // const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (false) { // place here the solved status!
      status = "Winner: " // + winner;
    } else {
      status = "Next tile: " + this.state.currentTile;
    }

    return (
      <div className="game">
        <div className="game-board">
          <BoardView
            squares={current.squares}
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
