import React from 'react';

import IIsLoggedInProps from './IIsLoggedInProps';

import Cookies from '../../utils/cookies/Cookies';
import ICookies from '../../utils/cookies/ICookies';

const withIsLoggedIn = (WrappedComponent: React.ComponentType<any>) => {
    return class IsLoggedIn extends React.PureComponent<IIsLoggedInProps> {
        private cookies: ICookies;

        constructor(props: IIsLoggedInProps) {
            super(props);

            this.cookies = new Cookies();
        }

        render() {
            const hasAccessToken = Boolean(this.cookies.getCookie('accessToken')),
                enhancedProps = {
                    ...this.props,
                    isLoggedIn: hasAccessToken
                };
            return (
                <WrappedComponent {...enhancedProps} />
            );
        }
    }
};

export default withIsLoggedIn;