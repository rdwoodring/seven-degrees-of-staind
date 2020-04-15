import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import FooterPresentation from './FooterPresentation';
import IFooterPresentationProps from './IFooterPresentationProps';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

configure({ adapter: new Adapter() });

let data: IFooterPresentationProps;

beforeEach(() => {
    data = {};
});

describe('render', () => {
    it('should render Box', () => {
        const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

        expect(wrapper.find(Box).length).toBeGreaterThan(1);
    });

    it('should render Typography', () => {
        const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

        expect(wrapper.find(Typography).length).toBe(1);
    });

    it('should render Link', () => {
        const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

        expect(wrapper.find(Link).length).toBe(1);
    });

    describe('when rendering Box', () => {
        it('should have a bgcolor prop of primary.main', () => {
            const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

            expect(wrapper.find(Box).at(0).props().bgcolor).toBe('primary.main');
        });

        it('should have a color of primary.contrastText', () => {
            const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

            expect(wrapper.find(Box).at(0).props().color).toBe('primary.contrastText');
        });
    });

    describe('when rendering Typography', () => {
        it('should have a color prop of inherit', () => {
            const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

            expect(wrapper.find(Typography).props().color).toBe('inherit');
        });
    });

    describe('when rendering Link', () => {
        it('should have an href prep', () => {
            const wrapper = shallow<FooterPresentation>(<FooterPresentation {...data} />);

            expect(wrapper.find(Link).props().href).toBe('https://github.com/rdwoodring/seven-degrees-of-staind');
        });
    });
});