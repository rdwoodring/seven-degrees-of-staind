import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import githubLogo from '../../images/GitHub-Mark-Light-32px.png';

class FooterPresentation extends React.Component {
    render() {
        return (
            <Box bgcolor="primary.main" color="primary.contrastText" >
                <Box maxWidth="970px" margin="0 auto" padding="5px 15px" display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="body2" color="inherit">
                            {`${String.fromCharCode(169)} ${new Date().getFullYear()}`}
                        </Typography>
                    </Box>
                    <Box height="32px">
                        <Link href="https://github.com/rdwoodring/seven-degrees-of-staind" target="_blank" rel="noopener">
                            <img src={githubLogo} />
                        </Link>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default FooterPresentation;