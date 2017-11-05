import React from 'react';

import Tabs from '../../components/common/Tabs';
import '../../scss/signInUp/signInUp.scss';

const SignInUp = ({ children, location }) => {
    const pathname = location.pathname;

    const tabs = [
        {
            text: 'sign in',
            link: '/signin',
            active: pathname.indexOf('signin') !== -1
        },
        {
            text: 'sign up',
            link: '/signup',
            active: pathname.indexOf('signup') !== -1
        }
    ];

    return (
        <div className="sign-in-up-wrapper">
            <Tabs tabs={tabs} />
            {children}
        </div>
    );
};

export default SignInUp;
