import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import aaa from '@material-ui/core/colors/'
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import INavbarPresentationProps from './INavbarPresentationProps';

const styles = createStyles({
    'nav-bar': {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0 15px',
        maxWidth: '1000px' ,
        margin: '0 auto' 
    }
});

class Navbar extends React.PureComponent<INavbarPresentationProps & WithStyles<typeof styles>> {
    render() {
        const loginLogoutButtonLabel = this.props.isLoggedIn ? 'Logout' : 'Login',
            { classes } = this.props;

        return (
            <>
                <AppBar position="static">
                    <ToolBar>
                        <div className={classes['nav-bar']}>
                            <Grid justify="space-between" container alignItems="center" alignContent="center">
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
                        </div>
                    </ToolBar>
                </AppBar>
            </>
        );
    }
}

export default withStyles(styles)(Navbar);