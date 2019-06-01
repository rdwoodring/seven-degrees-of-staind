import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Home from './pages/home/Home';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => {
                        return (
                            <Home />
                        );
                    }} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
