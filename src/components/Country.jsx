import React, { Component } from 'react';

class Country extends Component {
    state = {
       goldMedalCount: this.props.country.goldMedalCount
    }
    handleIncrement = () => {
        this.setState({ goldMedalCount: this.state.goldMedalCount + 1 })
    }
    handleDecrement = () => {
        this.setState({ goldMedalCount: this.state.goldMedalCount - 1 })
    }
    render() { 
        const { country } = this.props;
        return (
            <div className="country">
                <div className="name">
                    { country.name }
                </div>
                <div className="medals">
                    gold medals:  { this.state.goldMedalCount }
                    <button onClick={ this.handleIncrement }>+</button>
                    <button onClick={ this.handleDecrement } disabled={this.state.goldMedalCount === 0 ? true : false}>-</button>
                </div>
                <hr></hr>
            </div>
        );
      }
}

export default Country