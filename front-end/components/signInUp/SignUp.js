import React from 'react';

import Input from '../common/Input';
import Button from '../common/Button';

const SignUp = props => (
    <div className="sign-up">
        {props.signUpErrorMessage && (
            <span className="form-error">{props.signUpErrorMessage}</span>
        )}
        <Input
            id="email"
            inputRef={props.emailRef}
            label="Email"
            type="email"
        />
        <Input
            id="password"
            inputRef={props.passwordRef}
            label="Password"
            type="password"
        />
        <Button
            onClick={props.onSignUp}
            label="sign up"
            loading={props.loading}
        />
    </div>
);

export default SignUp;
