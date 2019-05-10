import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import chars from "./chars.json";
import "./App.css";

const randChar = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

class App extends Component {
  state = {
    chars,
    score: 0,
    highScore: 0,
    correctIncorrect: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.score + 1;
    this.setState({
      score: newScore,
      correctIncorrect: "You guessed correctly!"
    });
    if (newScore >= this.state.highScore) {
      this.setState({ highScore: newScore });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      score: 0,
      highScore: this.state.highScore,
      correctIncorrect: "You guessed incorrectly!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledChars = randChar(chars);
    this.setState({ chars: shuffledChars });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="GAME OF THRONES CLICKY!"
          score={this.state.score}
          highScore={this.state.highScore}
          correctIncorrect={this.state.correctIncorrect}
        />

        <Title>
        Click on an image to earn points, but don't click on any more than once!
        </Title>
        <Container>
          <Row>
            {this.state.chars.map(Character => (
              <Column size="md-3 sm-6">
                <CharacterCard
                  key={Character.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={Character.id}
                  image={Character.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
