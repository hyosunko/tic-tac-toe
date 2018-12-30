import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'
import GameInfo from './GameInfo.js'
import Header from './Header.js'

class App extends Component {
  // BOARD COMPONENT:  initial data - start state of board.  (meaning begining status is zero)
  // need board size and empty board array
  // inital data = number player (two players), generate collumn information
  constructor(props){
    super(props)
      this.state = {
        // used to determine board size.
        boardSize: 3,
        // will make the board.  Based on boardsize^2
        boardArr: [],
        // arranges the board into a square
        boardColumn:[],
        // will contain the winning combinations.
        winComboArr:[],
        // hold the number of turns.  Used to determine turn, setting grid value, ect.
        clickCount: 0,
    // based on board size, limit to how many turns can be played
        clickCountLimit:0,

        winStatus:"",
        playerInfoArr:[],
        player1:"❌",
        player2:"⭕"
      }
  }

componentDidMount() {
  // console.log(this.state);
  let {boardSize, boardArr, boardColumn, winComboArr, clickCount, clickCountLimit, playerInfoArr, player1, player2} = this.state

  clickCountLimit = boardSize**2
  boardArr = Array(boardSize**2).fill(0)
  // console.log(boardArr);
  playerInfoArr = Array(boardSize**2).fill("")
  boardColumn = Array(boardSize).fill('100px')
  // console.log(boardColumn);
  let tempArr = boardArr.map((v,i)=>i)

    for (let i = 0; i < boardSize; i++) {
      winComboArr.push(tempArr.slice(i*boardSize, (i+1)*boardSize))
    }
    // console.log('temp', tempArr);
    for (let i = 0; i < boardSize; i++){
      let tempTwoArr = tempArr.filter(v=>v % boardSize === i)
      winComboArr.push(tempTwoArr)
    }
      let tempThreeArr = tempArr.filter(v=>(v% (boardSize+1)) === 0)
      winComboArr.push(tempThreeArr)

      let tempLastArr = tempArr.filter(v=>((v% (boardSize-1)) === 0)&&(v!==0)&&(v!==(boardSize**2-1)))
      winComboArr.push(tempLastArr)

// console.log("second win", winComboArr);

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount, clickCountLimit:clickCountLimit, playerInfoArr:playerInfoArr, player1:player1, player2:player2 })

}

selectIcon=()=>{
  let {player1, player2} = this.state

  var x = document.getElementsByName("icon");

    console.log("x[0]: ",x[0].checked);
    console.log("player1",player1);
    if(x[0].checked){
      player1= "❌"
      player2= "⭕"
    } else if(x[1].checked){
      player1= "⭕"
      player2= "❌"
    }
    console.log("player1 after",player1);

  this.setState({player1:player1, player2:player2})
}

reSizeBoard=()=> {
  // console.log(this.state);
  let {boardSize, boardArr, boardColumn, winComboArr, clickCount, clickCountLimit, playerInfoArr,winStatus, player1, player2} = this.state

  boardSize = parseInt(document.getElementById("width").value)
  console.log("boardsize : ", boardSize);

  winComboArr=[]

  clickCountLimit = boardSize**2
  boardArr = Array(boardSize**2).fill(0)
  // console.log(boardArr);
  playerInfoArr = Array(boardSize**2).fill("")
  boardColumn = Array(boardSize).fill('100px')
  // console.log(boardColumn);
  let tempArr = boardArr.map((v,i)=>i)

    for (let i = 0; i < boardSize; i++) {
      winComboArr.push(tempArr.slice(i*boardSize, (i+1)*boardSize))
      // console.log("winComboArr: ",winComboArr);
    }
    console.log('temp', tempArr);
    for (let i = 0; i < boardSize; i++){
      let tempTwoArr = tempArr.filter(v=>v % boardSize === i)
      winComboArr.push(tempTwoArr)
    }
      let tempThreeArr = tempArr.filter(v=>(v% (boardSize+1)) === 0)
      winComboArr.push(tempThreeArr)

      let tempLastArr = tempArr.filter(v=>((v% (boardSize-1)) === 0)&&(v!==0)&&(v!==(boardSize**2-1)))
      winComboArr.push(tempLastArr)

      winStatus=""
      clickCount=0

// console.log("second win", winComboArr);

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount, clickCountLimit:clickCountLimit, playerInfoArr:playerInfoArr, boardSize:boardSize, winStatus:winStatus, player1:player1, player2:player2})

}


restButton = () => {

  let {boardArr, clickCount, playerInfoArr, winStatus, boardSize, boardColumn, clickCountLimit, player1, player2} = this.state

  boardArr = Array(boardSize**2).fill(0)
    boardColumn = Array(boardSize).fill('100px')
  clickCount = 0
  clickCountLimit = boardSize**2

  playerInfoArr = Array(boardSize**2).fill("")

  winStatus = ""

  this.setState({boardArr: boardArr, clickCount:clickCount, playerInfoArr:playerInfoArr, winStatus:winStatus, boardSize:boardSize, boardColumn:boardColumn, clickCountLimit:clickCountLimit, player1:player1, player2:player2})

}

clickFun = e => {
    let clickedIdent = e.target.id
    let {boardSize, boardArr, boardColumn, winComboArr, clickCount, clickCountLimit, winStatus, playerInfoArr, player1, player2} = this.state
    let matchCount = 0;
    // console.log("winComboArr", winComboArr);
    // console.log("clickCount", clickCount);
    // console.log("player1 emoji": player1);
    // console.log("player2 emoji": player2);
    if ((boardArr[clickedIdent] === 0 && (clickCount<(boardSize**2 )&& winStatus==""))) {
      if (clickCount % 2 === 0) {
        boardArr[clickedIdent] = 1
        playerInfoArr[clickedIdent]=player1
        for(let i=0; i<(boardSize*2+2);i++){
          for(let j=0; j<boardSize;j++){
            if(boardArr[winComboArr[i][j]]===1){
              matchCount++
            }
          }
          if(matchCount===boardSize){
            winStatus = "Player 1 Wins";
            // clickCount = boardSize**2
            break
          }
          matchCount=0;
        }
      } else {
        boardArr[clickedIdent] = 2
        playerInfoArr[clickedIdent]=player2
        for(let i=0; i<(boardSize*2+2);i++){
          for(let j=0; j<boardSize;j++){
            if(boardArr[winComboArr[i][j]]===2){
              matchCount++
            }
          }
          if(matchCount===boardSize){
            winStatus = "Player 2 Wins";
            // clickCount = boardSize**2
            break
          }
          matchCount=0;
        }
      }
      clickCount ++
      if (clickCount === boardSize**2&&winStatus=="") {
        winStatus = "Draw"
      }
      console.log("clickCount after player", clickCount);
     }

     console.log("boardArr",boardArr);

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount, clickCountLimit:clickCountLimit, winStatus:winStatus, playerInfoArr:playerInfoArr, player1:player1, player2:player2})
  // console.log("player1 emoji": player1);
  // console.log("player2 emoji": player2);

}
// console.log("winStatus",winStatus);

  render() {
  console.log('state', this.state);
    let grids = this.state.boardArr.map((v, i) =>{
      return(
        <Board id = {i} clickFun={this.clickFun} boardValue = {this.state.boardArr[i]} playerInfo={this.state.playerInfoArr[i]} />

      )
    })
    let gridStyle = {
      display: 'grid',
      margin: 'auto',
      justifyContent: 'center',
      // backgroundColor: 'green',
      gridTemplateColumns: this.state.boardColumn.join(' ')
    }
    // console.log(this.state);
    return (
      <div>
        <Header changeBoard = {this.reSizeBoard} selectIcon = {this.selectIcon} player1={this.state.player1}  player2={this.state.player2} clickCount={this.state.clickCount}/>
        <div style = {gridStyle}>
        {grids}
        </div>
        <GameInfo winner = {this.state.winStatus} restButton={this.restButton} player1={this.state.player1}  player2={this.state.player2}/>
      </div>
    );
  }
}

export default App;