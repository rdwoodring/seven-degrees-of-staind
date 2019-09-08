import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Button from '@material-ui/core/Button';

import FourOhFourPresentation from './FourOhFourPresentation';
import IFourOhFourPresentationProps from './IFourOhFourPresentationProps';

configure({ adapter: new Adapter() });

let data: IFourOhFourPresentationProps;

beforeEach(() => {
    data = {};
});

describe('render', () => {
    it('should render a Button as a child', () => {
        expect(() => {
            shallow(<FourOhFourPresentation {...data} />)
        }).not.toThrow();
    });
});