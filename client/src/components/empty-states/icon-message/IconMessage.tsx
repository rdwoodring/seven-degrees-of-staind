import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import IIconMessageProps from './IIconMessageProps';

export default class IconMessage extends React.PureComponent<IIconMessageProps> {
    render() {
        const Icon = this.props.icon;

        return (
            <Box textAlign="center" p={2}>
                <Typography variant="h1" component="h3">
                    <Icon color="disabled" fontSize="inherit" aria />
                </Typography>
                <Typography variant="h5" component="h2">
                    {this.props.message}
                </Typography>
            </Box>
        );
    }
}