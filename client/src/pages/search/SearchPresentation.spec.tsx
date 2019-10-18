import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import MusicOff from '@material-ui/icons/MusicOff';

import SearchPresentation from './SearchPresentation';
import ISearchPresentationProps from './ISearchPresentationProps';

import SearchWithButton from '../../components/searches/search-with-button/SearchWithButton';
import IArtistItemCardProps from '../../components/cards/artist-item-card/IArtistItemCardProps';
import ArtistItemCard from '../../components/cards/artist-item-card/ArtistItemCard';
import IconMessage from '../../components/empty-states/icon-message/IconMessage';

configure({ adapter: new Adapter() });

let data: ISearchPresentationProps;

beforeEach(() => {
    data = {
        search: 'trapt',
        artist: 'trapt',
        isLoading: false,
        results: [ ],
        handleChangeSearchField: jest.fn(),
        handleKeyUpSearchField: jest.fn(),
        handleClickSearchButton: jest.fn()
    };
});

describe('render', () => {
    it('should render a SearchWithButton component as a child', () => {
        const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

        expect(wrapper.find(SearchWithButton).length).toBe(1);
    });

    describe('when rendering a SearchWithButton component', () => {
        it('should pass the artist prop as search', () => {
            const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().search).toBe('trapt');
        });

        it('should pass along the handleChangeSearchField prop', () => {
            const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().handleChangeSearchField).toEqual(data.handleChangeSearchField);
        });

        it('should pass along the handleKeyUpSearchField prop', () => {
            const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().handleKeyUpSearchField).toEqual(data.handleKeyUpSearchField);
        });

        it('should pass along the handleClickSearchButton prop', () => {
            const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

            expect(wrapper.find(SearchWithButton).props().handleClickSearchButton).toEqual(data.handleClickSearchButton);
        });

    });

    describe('when results prop has length', () => {
        beforeEach(() => {
            data = {
                ...data,
                results: [
                    {
                        id: '1'
                    } as IArtistItemCardProps,
                    {
                        id: '2'
                    } as IArtistItemCardProps
                ]
            };
        });

        it('should render ArtistItemCards for each item in results', () => {
            const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

            expect(wrapper.find(ArtistItemCard).length).toBe(2);
        });
    });

    describe('when results prop has no length', () => {
        beforeEach(() => {
            data = {
                ...data,
                results: []
            };
        });

        it('should render an IconMessage as an empty state', () => {
            const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

            expect(wrapper.find(IconMessage).length).toBe(1);
        });

        describe('when rendering an IconMessage component', () => {
            it('should have a icon prop of MusicOff', () => {
                const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

                expect(wrapper.find(IconMessage).props().icon).toEqual(MusicOff);
            });

            it('should have a message prop of "No results found"', () => {
                const wrapper = shallow<SearchPresentation>(<SearchPresentation {...data} />);

                expect(wrapper.find(IconMessage).props().message).toEqual('No results found');
            });
        });
    });
});