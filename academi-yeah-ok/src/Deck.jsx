import React from "react";
import Card from "./Card";

class Deck extends React.Component {
  render() {
    if (this.props.currentPrompt)
      return <Card prompt={this.props.currentPrompt} />;
    return null;
  }
}

export default Deck;
