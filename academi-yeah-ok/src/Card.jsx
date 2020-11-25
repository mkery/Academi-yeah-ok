import React from "react";
import ReactCardFlip from "react-card-flip";

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
      >
        <div className="Card front" onClick={this.handleClick}>
          <h1>Conflict Academia</h1>
        </div>

        <div className="Card back" onClick={this.handleClick}>
          <h1>Sample Card</h1>
          <p>
            A situation happens that is hard for everyone to deal with because
            it's pretty terrible and toxic. Help.
          </p>
          <h3>How would you like to see this case solved by the department?</h3>
        </div>
      </ReactCardFlip>
    );
  }
}

export default Card;
