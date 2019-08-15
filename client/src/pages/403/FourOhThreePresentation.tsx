import React from 'react';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IFourOhThreePresentationProps from './IFourOhThreePresentationProps';

class FourOhThreePresentation extends React.Component<IFourOhThreePresentationProps> {
    render() {
        return (
            <Card raised={true}>
                <Box p={2}>
                    <Typography variant="h1" component="h2" align="center">
                        403
                    </Typography>
                    <Typography variant="h2" component="h3" align="center">
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
                </Box>
            </Card>
        );
    }
}

export default FourOhThreePresentation;