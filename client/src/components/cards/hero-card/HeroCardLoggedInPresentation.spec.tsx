import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import HeroCardLoggedInPresentation from './HeroCardLoggedInPresentation';
import IHeroCardPresentationProps from './IHeroCardPresentationProps';

import SearchWithButton from '../../searches/search-with-button/SearchWithButton';

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
    it('should render a SearchWithButton as a child', () => {
        const wrapper = shallow<HeroCardLoggedInPresentation>(<HeroCardLoggedInPresentation {...data} />);

        expect(wrapper.find(SearchWithButton).length).toBe(1);
    });

    describe('when rendering a SearchWithButton as a child', () => {
        it('should pass along the search prop', () => {
            const wrapper = shallow<HeroCardLoggedInPresentation>(<HeroCardLoggedInPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().search).toEqual('tennis');
        });

        it('should pass along the handleChangeSearchField prop', () => {
            const wrapper = shallow<HeroCardLoggedInPresentation>(<HeroCardLoggedInPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().handleChangeSearchField).toEqual(data.handleChangeSearchField);
        });

        it('should pass along the handleKeyUpSearchField prop', () => {
            const wrapper = shallow<HeroCardLoggedInPresentation>(<HeroCardLoggedInPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().handleKeyUpSearchField).toEqual(data.handleKeyUpSearchField);
        });

        it('should pass along the handleClickSearchButton prop', () => {
            const wrapper = shallow<HeroCardLoggedInPresentation>(<HeroCardLoggedInPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().handleClickSearchButton).toEqual(data.handleClickSearchButton);
        });
    });
});