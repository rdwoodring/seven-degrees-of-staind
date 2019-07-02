import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Navbar from './components/navbar/Navbar';

import Home from './pages/home/Home';
import Search from './pages/search/Search';
import FourOhThree from './pages/403/FourOhThree';

import withIsLoggedIn from './HOCs/withIsLoggedIn/withIsLoggedIn';
import withMustBeLoggedInToView from './HOCs/withMustBeLoggedInToView/withMustBeLoggedInToView';

const WrappedSearch = withIsLoggedIn(withMustBeLoggedInToView(Search)),
    WrappedNavbar = withIsLoggedIn(Navbar);

class App extends React.Component {
    render() {
        return (
            <>
                <WrappedNavbar />
                <br />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => {
                            return (
                                <Home />
                            );
                        }} />
                        <Route exact path="/search" component={WrappedSearch} />
                        <Route exact path="/403" render={() => {
                            return (
                                <FourOhThree />
                            );
                        }} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
