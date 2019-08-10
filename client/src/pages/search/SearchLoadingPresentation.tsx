import React from 'react';

import ISearchPresentationProps from './ISearchPresentationProps';

import Box from '@material-ui/core/Box';
import Circular from '../../components/loading-states/indeterminate/circular/Circular';

class SearchPresentation extends React.Component<ISearchPresentationProps> {
    render() {
        return (
            <Box display="flex" justifyContent="center">
                <Circular />
            </Box>
        );
    }
}

export default SearchPresentation;