import React from 'react';
import { Route, Routes as Switch, BrowserRouter as Router } from 'react-router-dom';

const SwitchRouter = ({ routes }) => (
    <Router>
        <Switch>
            {routes.map(({ id, ...rest }) =>
                <Route key={id} {...rest} />
            )}
        </Switch>
    </Router>
);

export default SwitchRouter;