import React from 'react';

import '../../scss/common/input.scss';

const Input = props => (
    <div className="input-field">
        <label htmlFor={props.id}>{props.label}</label>
        <input
            ref={props.inputRef}
            id={props.id}
            placeholder={props.label}
            type={props.type}
        />
    </div>
);

export default Input;
