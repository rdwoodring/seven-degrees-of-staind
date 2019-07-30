import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import IFourOhThreeProps from './IFourOhThreeProps';

import FourOhThreePresentation from './FourOhThreePresentation';

class FourOhThree extends React.Component<IFourOhThreeProps & RouteComponentProps> {
    constructor(props: IFourOhThreeProps & RouteComponentProps) {
        super(props);

        this.bindMethods();
    }

    bindMethods() {
        this.handleClickLoginButton = this.handleClickLoginButton.bind(this);

        return this;
    }

    render() {
        const fourOhThreePresentationProps = {
            handleClickLoginButton: this.handleClickLoginButton
        };

        return (
            <FourOhThreePresentation {...fourOhThreePresentationProps} />
        );
    }

    handleClickLoginButton() {
        window.location.href = '/login';
    }
}

export default withRouter(FourOhThree);
export { FourOhThree };