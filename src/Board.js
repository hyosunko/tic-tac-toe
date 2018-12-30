import React, {Component} from 'react';

class Board extends Component {
  render() {
    // console.log("player1 board emoji", this.props.player1);
    console.log("player info @ board", this.props.playerInfo);

    return (
        <div className = "boxClass" onClick={this.props.clickFun} id = {this.props.id} >
          <h1> {this.props.playerInfo} </h1>
        </div>
    );
  }
}

export default Board;