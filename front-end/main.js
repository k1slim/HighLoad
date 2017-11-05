import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import AppLayout from './containers/common/AppLayout';
import SignInContainer from './containers/signInUp/SignInContainer';
import SignUpContainer from './containers/signInUp/SignUpContainer';
import SignInUp from './containers/signInUp/SignInUpContainer';
import MapContainer from './containers/map/MapContainer';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={AppLayout}>
                <Route component={SignInUp}>
                    <Route path="signin" component={SignInContainer} />
                    <Route path="signup" component={SignUpContainer} />
                </Route>
                <Route path="/" component={MapContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
