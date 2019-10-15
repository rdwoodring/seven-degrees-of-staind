import React from 'react';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import IFourOhFourPresentationProps from './IFourOhFourPresentationProps';

class FourOhFourPresentation extends React.Component<IFourOhFourPresentationProps> {
    render() {
        return (
            <Card raised={true}>
                <Box p={2}>
                    <Typography variant="h1" component="h2" align="center">
                        404
                    </Typography>
                    <Typography variant="h2" component="h3" align="center">
                        Page Not Found
                    </Typography>
                </Box>
            </Card>
        );
    }
}

export default FourOhFourPresentation;