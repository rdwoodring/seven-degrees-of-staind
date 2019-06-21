import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import IFourOhThreeProps from './IFourOhThreeProps';

import FourOhThreePresentation from './FourOhThreePresentation';

class FourOhThree extends React.Component<IFourOhThreeProps & RouteComponentProps> {
    render() {
        return (
            <FourOhThreePresentation />
        )
    }
}

export default withRouter(FourOhThree);
export { FourOhThree };