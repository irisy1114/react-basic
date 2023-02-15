import React from 'react';
import Medal from './Medal';

const Country = (props) => {
    const { id, name, gold, silver, bronze, onIncrement, onDecrement, onDelete } = props;
    return (
        <div className="country">
            <div className="name">
                { name }
                <span className="badge"> { gold + silver + bronze }</span>
            </div>

            <Medal id={ id } medal={"gold"} count={ gold } onIncrement={ onIncrement } onDecrement={ onDecrement }>
            </Medal>
            <Medal id={ id } medal={"silver"} count={ silver } onIncrement={ onIncrement } onDecrement={ onDecrement }>
            </Medal>
            <Medal id={ id } medal={"bronze"} count={ bronze } onIncrement={ onIncrement } onDecrement={ onDecrement }>
            </Medal>
            <button onClick={ () => onDelete(id) }>Delete</button>
            <hr />
        </div>
    );
    
}

export default Country