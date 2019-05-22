import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => {
                        return (
                            <div>Home</div>
                        );
                    }} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
