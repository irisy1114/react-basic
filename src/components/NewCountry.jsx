import React from "react";

const NewCountry = (props) => {
    const { onAdd } = props;
    const promptDialog = () => { 
        let newCountry = window.prompt('Enter country name', '');
        if(newCountry ===null || newCountry.trim()==="" ) {
            // alert("Country name can't be empty");
            return;
        }else
            onAdd(newCountry);
    }
    return ( 
        <div className="NewCountry">
            <button onClick={ promptDialog } type="button">New Country</button>
        </div>
    )        

}

export default NewCountry;