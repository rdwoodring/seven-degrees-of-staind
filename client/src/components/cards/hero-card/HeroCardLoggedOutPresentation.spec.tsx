import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import HeroCardLoggedOutPresentation from './HeroCardLoggedOutPresentation';
import IHeroCardPresentationProps from './IHeroCardPresentationProps';

import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });

let data: IHeroCardPresentationProps;

beforeEach(() => {
    data = {
        search: 'tennis',
        handleClickLoginButton: jest.fn(),
        handleClickSearchButton: jest.fn(),
        handleChangeSearchField: jest.fn(),
        handleKeyUpSearchField: jest.fn()
    };
});

describe('render', () => {
    it('should render a Button as a child', () => {
        const wrapper = shallow<HeroCardLoggedOutPresentation>(<HeroCardLoggedOutPresentation {...data} />);

        expect(wrapper.find(Button).length).toBe(1);
    });

    describe('when rendering Button', () => {
        it('should pass the handleClickLoginButton as onClick', () => {
            const wrapper = shallow<HeroCardLoggedOutPresentation>(<HeroCardLoggedOutPresentation {...data} />);

            expect(wrapper.find(Button).props().onClick).toEqual(data.handleClickLoginButton);
        })
    })
});