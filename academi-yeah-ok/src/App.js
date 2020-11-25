import React from "react";
import Deck from "./Deck";
import PromptStore from "./prompts";
import "./App.css";
import RefreshIcon from "./refresh.svg";

class App extends React.Component {
  promptStore;

  constructor(props) {
    super(props);
    this.promptStore = new PromptStore();

    this.state = {
      currentPrompt: undefined,
    };
  }

  componentDidMount() {
    this.promptStore.loadPrompts().then(() => {
      this.pullCard();
    });
  }

  pullCard() {
    let prompt = this.state.currentPrompt;
    while (prompt === this.state.currentPrompt)
      prompt = this.promptStore.getRandomPrompt();

    this.setState({ currentPrompt: prompt });
  }

  render() {
    return (
      <div className="App">
        <div className="headerArea">
          <img
            onClick={() => this.pullCard()}
            className="refreshIcon"
            src={RefreshIcon}
            alt="Icon to draw a new card"
          />
        </div>
        <div className="cardArea">
          {" "}
          <Deck currentPrompt={this.state.currentPrompt} />
        </div>
      </div>
    );
  }
}

export default App;
