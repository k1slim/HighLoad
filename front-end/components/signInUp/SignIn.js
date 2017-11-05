import React from 'react';

import Input from '../common/Input';
import Button from '../common/Button';

const SignIn = props => (
    <div className="sign-in">
        {props.loginErrorMessage && (
            <span className="form-error">{props.loginErrorMessage}</span>
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
            onClick={props.onSignIn}
            label="sign in"
            loading={props.loading}
        />
    </div>
);

export default SignIn;
