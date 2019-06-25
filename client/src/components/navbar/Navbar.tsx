import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import INavbarProps from './INavbarProps';

class Navbar extends React.PureComponent<INavbarProps> {
    render() {
        return (
            <>
                <AppBar position="static">
                    <ToolBar>
                        <Typography color="inherit" component="h1" variant="h6" gutterBottom>
                            Seven Degrees of Staind
                        </Typography>
                    </ToolBar>
                </AppBar>
            </>
        );
    }
}

export default Navbar;