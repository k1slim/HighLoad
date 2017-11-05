import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import SignIn from '../../components/signInUp/SignIn';

class SignInContainer extends Component {
    onSignIn() {
        const username = this.email.value;
        const password = this.password.value;
        if (username && password) {
            this.props.signIn({ username, password });
        }
    }

    render() {
        const { isLoginRequested, loginErrorMessage } = this.props;
        return (
            <SignIn
                emailRef={node => (this.email = node)}
                passwordRef={node => (this.password = node)}
                onSignIn={this.onSignIn.bind(this)}
                loading={isLoginRequested}
                loginErrorMessage={loginErrorMessage}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoginRequested: state.auth.isLoginRequested,
        loginErrorMessage: state.auth.loginErrorMessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: bindActionCreators(actions.signIn, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
