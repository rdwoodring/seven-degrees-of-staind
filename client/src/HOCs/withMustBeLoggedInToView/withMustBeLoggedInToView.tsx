import React from 'react';
import { Redirect } from 'react-router-dom';

import IMustBeLoggedInToViewProps from './IMustBeLoggedInToViewProps';

const withMustBeLoggedInToView = (WrappedComponent: React.ComponentType<any>) => {
    return class IsLoggedIn extends React.PureComponent<IMustBeLoggedInToViewProps> {
        render() {
            if (!this.props.isLoggedIn) {
                return (
                    <Redirect to="/403" />
                );
            } else {
                return (
                    <WrappedComponent {...this.props} />
                );
            }
        }
    }
};

export default withMustBeLoggedInToView;