import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import Navbar from './Navbar';
import INavbarProps from './INavbarProps';

import NavbarPresentation from './NavbarPresentation';

configure({ adapter: new Adapter() });

let data: INavbarProps;

beforeEach(() => {
    data = {
        isLoggedIn: true
    };
});

describe('render', () => {
    it('should render NavbarPresentation', () => {
        const wrapper = shallow<Navbar>(<Navbar {...data} />);

        expect(wrapper.find(NavbarPresentation).length).toBe(1);
    });

    describe('when rendering NavbarPresentation', () => {
        it('should pass along the isLoggedIn prop', () => {
            const wrapper = shallow<Navbar>(<Navbar {...data} />);

            expect(wrapper.find(NavbarPresentation).props().isLoggedIn).toBe(true);
        });

        it('should pass the handleClickLoginLogoutButton method', () => {
            const wrapper = shallow<Navbar>(<Navbar {...data} />);

            expect(wrapper.find(NavbarPresentation).props().handleClickLoginLogoutButton).toEqual(wrapper.instance().handleClickLoginLogoutButton);
        });
    });
});