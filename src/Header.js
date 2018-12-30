import React, {Component} from 'react';

class Header extends Component {
  resize=(e) =>{
    e.preventDefault();
    this.props.changeBoard()
  }
  selectIcon=(e) => {
    e.preventDefault();
    this.props.selectIcon()
  }
  render() {

    var playerTurn ="";
    if(this.props.clickCount%2===0){
      playerTurn = `Turn : Player 1 : ${this.props.player1}`
    } else {
      playerTurn = `Turn : Player 2 : ${this.props.player2}`
    }
    console.log("turn: ", playerTurn);

    let turnStyle = {
      backgroundColor: 'lightskyblue',
      width:'200px',
      margin: 'auto'
    }
    return (


      <div className= "headerClass">
        <h1> Tic Tac Toe </h1>
        <div>
          <form onSubmit={this.resize}>
              Board Size : <input type="number" id="width" min="3" max="10" required/>
              <input type="submit" value="Submit" />
          </form>

        </div>
        <br />
        Player 1 : {this.props.player1}, Player 2: {this.props.player2}
        <br />
        <div>
        <form onSubmit={this.selectIcon}>
        Player 1 Icon :
          <input type="radio" name="icon" value="❌" checked/> ❌
          <input type="radio" name="icon" value="⭕"/> ⭕
          <input type="submit" />
        </form>
        </div>
        <br />
        <div style={turnStyle}>
        {playerTurn}
        </div>

      </div>
    );
  }
}

export default Header;