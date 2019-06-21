import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Home from './pages/home/Home';
import FourOhThree from './pages/403/FourOhThree';

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
                    <Route exact path="/403" render={() => {
                        return (
                            <FourOhThree />
                        );
                    }} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
