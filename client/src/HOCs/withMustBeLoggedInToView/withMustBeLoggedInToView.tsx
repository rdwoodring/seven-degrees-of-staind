import React from 'react';
import { Redirect } from 'react-router-dom';

import IMustBeLoggedInToViewProps from './IMustBeLoggedInToViewProps';

import Cookies from '../../utils/cookies/Cookies';
import ICookies from '../../utils/cookies/ICookies';

const withMustBeLoggedInToView = (WrappedComponent: React.ComponentType<any>) => {
    return class IsLoggedIn extends React.PureComponent<IMustBeLoggedInToViewProps> {
        // constructor(props: IMustBeLoggedInToViewProps) {
        //     super(props);

        //     this.cookies = new Cookies();
        // }

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