import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import ICircular from './ICircular';

class Circular extends React.PureComponent<ICircular> {
    render() {
        return <CircularProgress size={100} />
    }
}

export default Circular;