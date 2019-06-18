import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import IHomeProps from './IHomeProps';

import HomePresentation from './HomePresentation';

class Home extends React.Component<IHomeProps & RouteComponentProps> {
    constructor(props: any) {
        super(props);
        
        this.bindMethods();
    }

    bindMethods() {
        this.handleClickHeroLoginButton = this.handleClickHeroLoginButton.bind(this);

        return this;
    }

    render() {
        const homePresentationData = {
                handleClickHeroLoginButton: this.handleClickHeroLoginButton
            };

        return (
            <HomePresentation {...homePresentationData} />
        );
    }

    handleClickHeroLoginButton(e: React.SyntheticEvent) {
        // history.pushState('/login', 'Login');
        this.props.history.push('/login');
    }
}

export default withRouter(Home);
export { Home };