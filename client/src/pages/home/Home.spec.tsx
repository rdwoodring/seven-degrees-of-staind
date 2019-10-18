import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import {Home} from './Home';
import IHomeProps from './IHomeProps';

import HomePresentation from './HomePresentation';

configure({ adapter: new Adapter() });

let data: IHomeProps & RouteComponentProps;

beforeEach(() => {
    data = {
        history: {
            length: 0,
            action: 'PUSH',
            location: {
                pathname: '',
                search: '',
                state: '',
                hash: ''
            },
            push: jest.fn(),
            replace: jest.fn(),
            go: jest.fn(),
            goBack: jest.fn(),
            goForward: jest.fn(),
            block: jest.fn(),
            listen: jest.fn(),
            createHref: jest.fn()
        },
        location: {
            pathname: '',
            search: '',
            state: '',
            hash: ''
        },
        match: {
            params: '',
            isExact: true,
            path: '',
            url: ''
        }
    }
});

describe('render', () => {
    it('should render HomePresentation as a child', () => {
        const wrapper = shallow<Home>(<Home {...data} />);

        expect(wrapper.find(HomePresentation).length).toBe(1);
    });

    describe('when rendering HomePresentation as a child', () => {
        it('should pass along the handleClickHeroLoginButton method as a prop', () => {
            const wrapper = shallow<Home>(<Home {...data} />);

            expect(wrapper.find(HomePresentation).props().handleClickHeroLoginButton).toEqual(wrapper.instance().handleClickHeroLoginButton);
        });
    });
});

describe('handleClickHeroLoginButton', () => {
    it('should call the history prop\'s push method', () => {
        const wrapper = shallow<Home>(<Home {...data} />);

        wrapper.instance().handleClickHeroLoginButton();

        expect(data.history.push).toHaveBeenCalled();
    });

    describe('when calling the history prop\'s push method', () => {
        it('should pass /login', () => {
            const wrapper = shallow<Home>(<Home {...data} />);

            wrapper.instance().handleClickHeroLoginButton();

            expect(data.history.push).toHaveBeenCalledWith('/login');
        });
    });
});