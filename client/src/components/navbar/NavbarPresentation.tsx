import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';

import INavbarPresentationProps from './INavbarPresentationProps';

const styles = createStyles({
    'app-bar': {
        marginBottom: '15px'
    },
    'nav-bar': {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0 15px',
        maxWidth: '1000px' ,
        margin: '0 auto' 
    },
    'toolbar': {
        padding: '0px'
    },
    'logo-link': {
        color: 'inherit',
        textDecoration: 'none'
    }
});

class NavbarPresentation extends React.PureComponent<INavbarPresentationProps & WithStyles<typeof styles>> {
    render() {
        const loginLogoutButtonLabel = this.props.isLoggedIn ? 'Logout' : 'Login',
            { classes } = this.props;

        return (
            <>
                <AppBar position="sticky" className={classes['app-bar']}>
                    <ToolBar className={classes['toolbar']}>
                        <div className={classes['nav-bar']}>
                            <Grid justify="space-between" container alignItems="center" alignContent="center">
                                <Grid item>
                                    <Link to="/" className={classes['logo-link']}>
                                        <Typography color="inherit" component="h1" variant="h6" gutterBottom>
                                            Seven Degrees of Staind
                                        </Typography>
                                    </Link>
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

export default withStyles(styles)(NavbarPresentation);