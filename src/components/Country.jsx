import React, { Component } from 'react';

class Country extends Component {
    state = {
        name: 'United States',
        gold: 0,
    }

    handleIncrement = () => {
        this.setState((state) => ({ gold: state.gold + 1 }))
    }

    render() { 
        return (
            <div className="country">
                <div className="name">
                    { this.state.name }
                </div>
                <div className="medals">
                    gold medals:  { this.state.gold }
                    <button onClick={ this.handleIncrement }>+</button>
                </div>
            </div>
        );
      }
}

export default Country