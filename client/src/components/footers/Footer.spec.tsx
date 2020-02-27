import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Footer from './Footer';
import IFooterProps from './IFooterProps';

import FooterPresentation from './FooterPresentation';

configure({ adapter: new Adapter() });

let data: IFooterProps;

beforeEach(() => {
    data = {};
});

describe('render', () => {
    it('should render FooterPresentation', () => {
        const wrapper = shallow<Footer>(<Footer {...data} />);

        expect(wrapper.find(FooterPresentation).length).toBe(1);
    });
});