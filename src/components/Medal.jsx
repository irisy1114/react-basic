import React from 'react';

const Medal = (props) => {
    const { id, medal, count, onIncrement, onDecrement } = props;
    return (
        <div className="medals">
                { medal } medals:  { count }
                <button onClick={ () => onIncrement(id, medal) }>+</button>
                <button onClick={ () => onDecrement(id, medal) } disabled={count === 0 ? true : false}>-</button>
        </div>
    )        
}

export default Medal