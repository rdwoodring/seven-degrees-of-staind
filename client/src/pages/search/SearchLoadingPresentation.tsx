import React from 'react';

import ISearchPresentationProps from './ISearchPresentationProps';

import Circular from '../../components/loading-states/indeterminate/circular/Circular';

class SearchPresentation extends React.Component<ISearchPresentationProps> {
    render() {
        return (
            <Circular />
        )
    }
}

export default SearchPresentation;