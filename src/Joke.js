import React from 'react';
import smile1 from './img/smile1.png';
import smile2 from './img/smile2.png';
import smile3 from './img/smile3.png';
import smile4 from './img/smile4.png';
import smile5 from './img/smile5.png';
import './Joke.css';
class Joke extends React.Component {
  getColor() {
    if (this.props.votes >= 12) {
      return '#4CAF50';
    } else if (this.props.votes >= 9) {
      return '#8BC34A';
    } else if (this.props.votes >= 6) {
      return '#CDDC39';
    } else if (this.props.votes >= 3) {
      return '#FFEB3B';
    } else if (this.props.votes >= 0) {
      return '#FFC107';
    } else if (this.props.votes >= -3) {
      return '#FF9800';
    } else {
      return '#F44336';
    }
  }

  getEmoji() {
    if (this.props.votes >= 12) {
      return smile5;
    } else if (this.props.votes >= 9) {
      return smile5;
    } else if (this.props.votes >= 6) {
      return smile4;
    } else if (this.props.votes >= 3) {
      return smile3;
    } else if (this.props.votes >= 0) {
      return smile2;
    } else if (this.props.votes >= -3) {
      return smile1;
    } else {
      return smile1;
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
          <span style={{ borderColor: this.getColor() }} className="Joke-votes">
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smile">
          <img src={this.getEmoji()} alt="" />
        </div>
      </div>
    );
  }
}

export default Joke;
