import React, { Component } from 'react';
import './App.css';

import Game from './components/Game';
import Moves from './components/Moves';
import Time from './components/Time';
import NewGameButton from './components/NewGameButton';
import Win from './components/Win';
import ChangeSize from './components/ChangeSize';

export default class GamePuzzle extends Component {

  constructor(props) {
    super(props)
    this.state = { size: 4, moves: 0, time: 0, board: [], win: false }
  }

  componentDidMount() {
    this.newBoard();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  parseTime = () => {
    let timeStr = '';
    let time = this.state.time;
    if(time<60) timeStr = time+'s';
    else timeStr = Math.floor(time/60) + 'm '+time%60 + 's';
    return timeStr;
  }


  newBoard = () => {
    let board = [];
    let size = this.state.size;
    //board = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    for(let i = 0; i<size*size; i++) {board.push(i)} //generate a 0...size**2 array
    do{
      board.sort(function(a, b){return 0.5 - Math.random()}); //randomise the array
    }
    while(!this.checkIfSolvable(board, size));
    clearInterval(this.timer);
    this.setState({moves: 0, time: 0, board, win:false}); //reset state
  }

  checkIfSolvable(board, size){
    //count inversions
    let invCount = 0;
    for(let i = 0; i < size*size-1; i++) {
      for(let j = i+1; j < size*size; j++) {
        if(board[i] && board[j] && board[i] > board[j]) invCount++;
      }
    }
    //check if blank is in a even or odd row
    let blankPos = 0;
    blankPos = Math.abs(Math.floor(board.findIndex((v)=>v===0)/size)-size);
    if(size%2) return !(invCount%2);
    else {
      if(blankPos%2) return !(invCount%2);
      else return !!(invCount%2);
    }
  }

  startTimer = () => {
    this.setState( {time: this.state.time+1});
    this.timer = setInterval( () => {this.setState( {time: this.state.time+1})}, 1000 );
  }

  swap = (a,b, board) => {
    let temp = board[a];
    board[a] = board[b];
    board[b] = temp;
    return board;
  }

  checkWin = () => {
    let tempBoard = [];
    for(let i = 0; i<this.state.size*this.state.size; i++) {tempBoard.push(i+1)}
    tempBoard[tempBoard.length-1] = 0;
    if(tempBoard.length !== this.state.board.length) return false;
    for (var i = 0; i < tempBoard.length; i++) {
      if (tempBoard[i] !== this.state.board[i]) return false;
    }
    return true;
  }

  move = (key) => {
    if(this.state.board[key] === 0) { return } //dont move if clicked on empty tile

    let direction = this.checkPossibleDirection(key);
    if(direction) {
      if(!this.state.time) { //start timer on first move
        this.startTimer();
      }
      this.setState({moves: this.state.moves+1}); //increment moves counter
      let currentIndex = this.state.board.findIndex((v)=>v===0);
      let tempBoard = [...this.state.board];
      while(currentIndex!==key){
        switch(direction) {
          case 'up':
              tempBoard = this.swap(currentIndex, currentIndex+this.state.size, tempBoard);
              currentIndex = currentIndex+this.state.size;
            break;
          case 'down':
              tempBoard = this.swap(currentIndex, currentIndex-this.state.size, tempBoard);
              currentIndex = currentIndex-this.state.size;
            break;
          case 'left':
              tempBoard = this.swap(currentIndex, currentIndex+1, tempBoard);
              currentIndex = currentIndex+1;
            break;
          case 'right':
              tempBoard = this.swap(currentIndex, currentIndex-1, tempBoard);
              currentIndex = currentIndex-1;
            break;
          default:
            break;
        }
      }
      this.setState({board: tempBoard}, () => {
        if(this.checkWin()) {
          clearInterval(this.timer);
          this.setState({win: true});
        } else if(this.state.win) {
          this.setState({win: false});
          this.startTimer();
      }
      });
    }
  }

  checkPossibleDirection = (key) => {
    let index=key; //reset key value
    //check up
    while(key >= this.state.size) {
      key-=this.state.size;
      if(this.state.board[key] === 0) return "up";
    }
    //check down
    key = index;
    while(key < this.state.size*(this.state.size-1)) {
      key+=this.state.size;
      if(this.state.board[key] === 0) return "down";
    }
    //check left
    key = index;
    while(key> index-index%this.state.size) {
      key-=1;
      if(this.state.board[key] === 0) return "left";
    }
    //check right
    key = index;
    while(key< (index+this.state.size-(index%this.state.size))-1) {
      key+=1;
      if(this.state.board[key] === 0) return "right";
    }
    return 0;
  }

  changeSize = (size) => {
    this.setState({size}, () => this.newBoard());
  }

  render() {
    return (
        <div className="bodyPuzzle">
      <div className="App">
        <div className="Menu">
          <NewGameButton onClick={this.newBoard}/>
          <Time time={this.parseTime()}/>
          <Moves moves={this.state.moves}/>
        </div>
        <Game board={this.state.board} move={this.move} size={this.state.size}/>
        <ChangeSize onClick={this.changeSize}/>
        <Win win={this.state.win} time={this.parseTime()} moves={this.state.moves}/>
      </div>
        </div>
    );
  }

}