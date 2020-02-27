import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Navbar from './components/navbar/Navbar';

import Footer from './components/footers/Footer';

import Home from './pages/home/Home';
import Search from './pages/search/Search';
import FourOhThree from './pages/403/FourOhThree';
import FourOhFour from './pages/404/FourOhFour';

import withIsLoggedIn from './HOCs/withIsLoggedIn/withIsLoggedIn';
import withMustBeLoggedInToView from './HOCs/withMustBeLoggedInToView/withMustBeLoggedInToView';

import Box from '@material-ui/core/Box';

const WrappedSearch = withIsLoggedIn(withMustBeLoggedInToView(Search)),
    WrappedNavbar = withIsLoggedIn(Navbar);

class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <WrappedNavbar />
                    <Box display="flex" maxWidth="970px" flexDirection="column" flex="1 0 0%" margin="0 auto 15px auto" width="calc(100% - 30px)">
                        <Box width="100%">
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
                                <Route exact path="/404" render={() => {
                                    return (
                                        <FourOhFour />
                                    );
                                }} />
                                <Route path="*" render={() => {
                                    return (
                                        <Redirect to="/404" />
                                    );
                                }} />
                            </Switch>
                        </Box>
                    </Box>
                    <Footer />
                </BrowserRouter>
            </>
        );
    }
}

export default App;
export {
    WrappedNavbar,
    WrappedSearch
};