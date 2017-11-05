import React from 'react';

import '../../scss/common/button.scss';

const Button = props => (
    <button
        className="btn"
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled || props.loading}
    >
        {props.loading ? 'Loading ' : props.label}
    </button>
);

Button.defaultProps = {
    type: 'button'
};

export default Button;
