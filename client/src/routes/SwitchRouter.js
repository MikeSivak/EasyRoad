// import React from 'react';
// import { Route, Routes as Switch, BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes as Switch, BrowserRouter as Router} from 'react-router-dom';


const SwitchRouter = ({ routes }) => (
    <Router>
        <Switch>
            {routes.map(({id, path, component}) =>
                <Route key={id} path={path} element={component} />
            )}
        </Switch>
    </Router>
);

export default SwitchRouter;