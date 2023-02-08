import React, { Component } from "react";

class NewCountry extends Component {

    promptDialog = () => { 
        let newCountry = window.prompt('Enter country name', '');
        if(newCountry==="" || newCountry ===null) {
            alert("Country name can't be empty");
            return;
        }else
            this.props.onAdd(newCountry);
    }

    render() {
        return ( 
            <div className="NewCountry">
                <button onClick={ this.promptDialog } type="button">New Country</button>
            </div>
        )        
    }
}

export default NewCountry;