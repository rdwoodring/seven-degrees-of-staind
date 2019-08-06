import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IFourOhFourPresentationProps from './IFourOhFourPresentationProps';

class FourOhFourPresentation extends React.Component<IFourOhFourPresentationProps> {
    render() {
        return (
            <div>
                <Typography variant="h1" align="center">
                    404
                </Typography>
                <Typography variant="h2" align="center">
                    Page Not Found
                </Typography>
            </div>
        );
    }
}

export default FourOhFourPresentation;