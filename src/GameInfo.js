import React, {Component} from 'react';

class GameInfo extends Component {
  render() {
    return (
      <div className = "GameInfoClass">
        <h1> GameInfo </h1>
        <h2> {this.props.winner} </h2>
        <input onClick = {this.props.restButton} type= "submit" value= "reset" />
      </div>
    );
  }
}

export default GameInfo;