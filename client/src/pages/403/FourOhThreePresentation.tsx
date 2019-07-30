import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IFourOhThreePresentationProps from './IFourOhThreePresentationProps';

class FourOhThreePresentation extends React.Component<IFourOhThreePresentationProps> {
    render() {
        return (
            <div>
                <Typography variant="h1" align="center">
                    403
                </Typography>
                <Typography variant="h2" align="center">
                    Access Denied
                </Typography>
                <Typography variant="body1" align="center">
                    <div>
                        You must login with your Spotify account to see this page.
                    </div>
                    <Button size="large" variant="contained" color="primary" onClick={this.props.handleClickLoginButton}>
                        Login to Spotify
                    </Button>
                </Typography>
            </div>
        );
    }
}

export default FourOhThreePresentation;