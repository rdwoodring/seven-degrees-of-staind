import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import AppBar from '@material-ui/core/AppBar';

import { RouteComponentProps } from 'react-router';

import NavbarPresentation from './NavbarPresentation';
import INavbarPresentationProps from './INavbarPresentationProps';

configure({ adapter: new Adapter() });

let data: INavbarPresentationProps;

beforeEach(() => {
    data = {
        isLoggedIn: true,
        handleClickLoginLogoutButton: jest.fn()
    };
});

describe('render', () => {
    it('should render an AppBar', () => {
        const wrapper = shallow(<NavbarPresentation {...data} />);

        expect(wrapper.dive().find(AppBar).length).toBe(1);
    });
});