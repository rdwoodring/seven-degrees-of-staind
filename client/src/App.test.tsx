import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";


import App, {
    WrappedNavbar,
    WrappedSearch
} from './App';

import Footer from './components/footers/Footer';

configure({ adapter: new Adapter() });

describe('render', () => {
    it('should render a WrappedNavbar', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(WrappedNavbar).length).toBe(1);
    });

    it('should render a BrowserRouter', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(BrowserRouter).length).toBe(1);
    });

    it('should render a Footer', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(Footer).length).toBe(1);
    });
});