import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
      return (
        <button className="square" onClick={
          ()=>{
            props.onClick()
          }
        }>
          {props.value}
        </button>
      );
    }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        isXNext:true,
        squares:Array(9).fill(null),
      };
    };
    handleClick(i){
      let image = "X"
      const winner = this.calculateWinner(this.state.squares)
      if(winner){
          
         return
      }
       if(this.state.squares[i]){
        alert("This Is not a clickable square");
        return;
      }
      if(!this.state.isXNext) {
        image = "O";
      }
      const squares = [...this.state.squares];
      squares[i] = image;
      
      const winnner2 = this.calculateWinner(squares)
     if(winnner2){
      //currently working on
      for (let int = 0; int < winnner2.blocks.length; int ++){
        squares[winnner2.blocks[int]] = "W";
      }
     }
      
      
      this.setState({
        squares:squares,
        isXNext:!this.state.isXNext,
        winner:winnner2
      });
    }
    renderSquare(i) {
      return (<Square 
      value={this.state.squares[i]}
      onClick={()=>this.handleClick(i)}
        />);
    }
    
      calculateWinner(squares) {
        const lines = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9],
          [1, 5, 9],
          [3, 5, 7]
        ];
        for( let i = 0; i < lines.length; i++){
          const a = lines[i][0] - 1;
          const b = lines[i][1] - 1;
          const c = lines[i][2] - 1;
          if(squares[a] 
            && squares[a] === squares[b] 
            && squares[c] === squares[a]){
            return {
              winner:squares[a],
              blocks:[a,b,c]
            }
          }
        }
        return null;
      }
      resetGame(){
        this.setState({squares:Array(9).fill(null), isXNext:true})
      }

    render() {
      let image = "X"
      if(!this.state.isXNext) {
        image = "O";
      }
      let status = `Next player: ${image}`;
      const winner = this.calculateWinner(this.state.squares);
      if(winner){
        status = this.state.winner.winner + " Is the Winner";
      }

      const threeXThree = []
      for(let i = 0; i < 3; i++){
        const squares = [];
        for(let j = 0; j < 3; j++){
          let number = j + i * 3;
          squares.push(this.renderSquare(number)) 
        }
        threeXThree.push(<div className="board-row">
        {squares}
      </div>)
      }
      return (
        <div>
          <div className="status">{status}</div>
          {threeXThree}
          <button onClick = {()=>this.resetGame()}>Reset</button>
        </div>
     );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  