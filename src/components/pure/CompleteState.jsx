import React from 'react';
import PropTypes from 'prop-types';

const CompleteState = ({innerRef, cont }) => {
    return (
        <div id="complete-state" ref={innerRef}>
            <img src='images/icon-complete.svg' alt="complete-icon" id="complete-state-img"></img>
            <h1 id="complete-state-title">THANK YOU!</h1>
            <p id="complete-state-p">we've added your card details</p>
            <button id="complete-state-button" onClick={() => cont()}>Continue</button>
        </div>
    );
}

CompleteState.propTypes = {
    innerRef: PropTypes.object.isRequired,
    continue: PropTypes.func.isRequired
};

export default CompleteState;


