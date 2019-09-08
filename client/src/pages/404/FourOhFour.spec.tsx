import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import FourOhFour from './FourOhFour';
import IFourOhFourProps from './IFourOhFourProps';

import FourOhFourPresentation from './FourOhFourPresentation';

configure({ adapter: new Adapter() });

let data: IFourOhFourProps;

beforeEach(() => {
    data = {};
});

describe('render', () => {
    it('should render FourOhFourPresentation as a child', () => {
        const wrapper = shallow<FourOhFour>(<FourOhFour {...data} />);

        expect(wrapper.find(FourOhFourPresentation).length).toBe(1);
    });
});