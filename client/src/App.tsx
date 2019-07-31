import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import Navbar from './components/navbar/Navbar';

import Home from './pages/home/Home';
import Search from './pages/search/Search';
import FourOhThree from './pages/403/FourOhThree';

import withIsLoggedIn from './HOCs/withIsLoggedIn/withIsLoggedIn';
import withMustBeLoggedInToView from './HOCs/withMustBeLoggedInToView/withMustBeLoggedInToView';

const WrappedSearch = withIsLoggedIn(withMustBeLoggedInToView(Search)),
    WrappedNavbar = withIsLoggedIn(Navbar),
    styles = createStyles({
        'nav-bar-wrapper': {
            width: '100%',
            marginBottom: '15px'
        },
        'app-body-wrapper': {
            boxSizing: 'border-box',
            padding: '0 15px',
            maxWidth: '1000px',
            margin: '0 auto'
        }
    });

class App extends React.Component<WithStyles<typeof styles>> {
    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes['nav-bar-wrapper']}>
                    <WrappedNavbar />
                </div>
                <div className={classes['app-body-wrapper']}>
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
                </div>
            </>
        );
    }
}

export default withStyles(styles)(App);
