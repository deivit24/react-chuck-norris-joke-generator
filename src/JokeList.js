import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import uuid from 'uuid/v4';
import './JokeList.css';
import img from './img/chuck.png';

class JokeList extends React.Component {
  static defaultProps = {
    numjokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
  async getJokes() {
    try {
      // LOAD JOKES
      let jokes = [];
      while (jokes.length < this.props.numjokesToGet) {
        let res = await axios.get('https://api.chucknorris.io/jokes/random/');

        let newJoke = res.data.value;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log('FOUND DUPLICATE');
          console.log(newJoke);
        }
      }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
      // window.localStorage.setItem('jokes', JSON.stringify(jokes));
    } catch (e) {
      alert(e);
      this.setState({
        loading: false
      });
    }
  }
  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }
  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList">
          <div className="JokeList-sidebar">
            <h1 className="JokeList-title">
              <span>Chuck Norris</span> Jokes
            </h1>
            <img src={img} alt=" Chuck Norris" />
            <button onClick={this.handleClick} className="JokeList-getmore">
              New Jokes
            </button>
          </div>

          <div className="JokeList-jokes">
            <div className="Spinner">
              <i className="fas fa-grin-squint-tears fa-8x fa-spin"></i>
              <h1 className="JokeList-title">Loading...</h1>
            </div>
          </div>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Chuck Norris</span> Jokes
          </h1>
          <img src={img} alt=" Chuck Norris" />
          <button onClick={this.handleClick} className="JokeList-getmore">
            New Jokes
          </button>
        </div>

        <div className="JokeList-jokes">
          {jokes.map(j => (
            <div>
              <Joke
                votes={j.votes}
                text={j.text}
                key={j.id}
                upvote={() => this.handleVote(j.id, 1)}
                downvote={() => this.handleVote(j.id, -1)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
