import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import SignUp from '../../components/signInUp/SignUp';

class SignUpContainer extends Component {
    onSignUp() {
        const username = this.email.value;
        const password = this.password.value;
        if (username && password) {
            this.props.signUp({ username, password });
        }
    }

    render() {
        const { isSignUpRequested, signUpErrorMessage } = this.props;

        return (
            <SignUp
                emailRef={node => (this.email = node)}
                passwordRef={node => (this.password = node)}
                onSignUp={this.onSignUp.bind(this)}
                loading={isSignUpRequested}
                signUpErrorMessage={signUpErrorMessage} />
        );
    }
}

function mapStateToProps(state) {
    return {
        isSignUpRequested: state.auth.isSignUpRequested,
        signUpErrorMessage: state.auth.signUpErrorMessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: bindActionCreators(actions.signUp, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
