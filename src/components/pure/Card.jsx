import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/card/cardStyles.css';

const Card = ({type, cardNumber, name, expMonth, expYear, cvc}) => {
    return (
        <div className="card" id={ type === 'front' ? 'front' : 'back' }>
            { type === 'front' ?
            <div id='card-front-content'>
                <img src='images/card-logo.svg' alt='card-logo' id='card-logo'></img>
                <p id="card-number">{cardNumber}</p>
                <div id='card-bottom-section'>
                    <p>{name}</p>
                    <p>{expMonth}/{expYear}</p>
                </div>
            </div>
            :
            <div id='card-back-content'>
                <p id="cvc-number">{cvc}</p>
            </div>
            }
        </div>
    );
};


Card.propTypes = {
    type: PropTypes.string.isRequired,
    cardNumber: PropTypes.string,
    name: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    cvc: PropTypes.string
};


export default Card;
