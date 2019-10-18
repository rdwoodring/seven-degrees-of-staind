import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import CircularProgress from '@material-ui/core/CircularProgress';

import Circular from './Circular';
import ICircular from './ICircular';

configure({ adapter: new Adapter() });

describe('render', () => {
    it('should render a CircularProgress component', () => {
        const wrapper = shallow(<Circular />);

        expect(wrapper.find(CircularProgress).length).toBe(1);
    });
});