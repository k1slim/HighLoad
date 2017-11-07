import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import connectProtectors from './helpers/routeProtectors';
import AppLayout from './containers/common/AppLayout';
import SignInContainer from './containers/signInUp/SignInContainer';
import SignUpContainer from './containers/signInUp/SignUpContainer';
import SignInUp from './containers/signInUp/SignInUpContainer';
import MapContainer from './containers/map/MapContainer';

const store = configureStore();

const { checkInitialURl } = connectProtectors(store);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={AppLayout}>
                <Route component={SignInUp}>
                    <Route path="signin" component={SignInContainer} />
                    <Route path="signup" component={SignUpContainer} />
                </Route>
                <Route path="/" component={MapContainer} onEnter={checkInitialURl} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
