import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import SearchLoadingPresentation from './SearchLoadingPresentation';
import ISearchPresentationProps from './ISearchPresentationProps';

import Circular from '../../components/loading-states/indeterminate/circular/Circular';

configure({ adapter: new Adapter() });

let data: ISearchPresentationProps;

beforeEach(() => {
    data = {
        search: 'trapt',
        artist: 'trapt',
        isLoading: true,
        results: [],
        handleChangeSearchField: jest.fn(),
        handleKeyUpSearchField: jest.fn(),
        handleClickSearchButton: jest.fn()
    };
});

describe('render', () => {
    it('should render a Circular component as a child', () => {
        const wrapper = shallow<SearchLoadingPresentation>(<SearchLoadingPresentation {...data} />);

        expect(wrapper.find(Circular).length).toBe(1);
    });
});