import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import aaa from '@material-ui/core/colors/'
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import INavbarPresentationProps from './INavbarPresentationProps';

class Navbar extends React.PureComponent<INavbarPresentationProps> {
    render() {
        const loginLogoutButtonLabel = this.props.isLoggedIn ? 'Logout' : 'Login';

        return (
            <>
                <AppBar position="static">
                    <ToolBar>
                        <Grid justify="space-between" container spacing={24}>
                            <Grid item>
                                <Typography color="inherit" component="h1" variant="h6" gutterBottom>
                                    Seven Degrees of Staind
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button size="medium" variant="contained" color="secondary" onClick={this.props.handleClickLoginLogoutButton}>
                                    {loginLogoutButtonLabel}
                                </Button>
                            </Grid>
                        </Grid>
                    </ToolBar>
                </AppBar>
            </>
        );
    }
}

export default Navbar;