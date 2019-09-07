import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import TextField from '@material-ui/core/TextField';

import SearchWithButton from './SearchWithButton';
import ISearchWithButtonProps from './ISearchWithButtonProps';

configure({ adapter: new Adapter() });

let data: ISearchWithButtonProps;

beforeEach(() => {
    data = {
        search: 'banana',
        handleChangeSearchField: jest.fn(),
        handleKeyUpSearchField: jest.fn(),
        handleClickSearchButton: jest.fn()
    };
});

describe('render', () => {
    it('should render a TextField as a child', () => {
        const wrapper = shallow<SearchWithButton>(<SearchWithButton {...data} />);

        expect(wrapper.find(TextField).length).toBe(1);
    });

    describe('when rendering a TextField as a child', () => {
        it('should pass along the search prop as value', () => {
            const wrapper = shallow<SearchWithButton>(<SearchWithButton {...data} />);

            expect(wrapper.find(TextField).props().value).toBe('banana');
        });

        it('should pass along the handleChangeSearchField prop as onChange', () => {
            const wrapper = shallow<SearchWithButton>(<SearchWithButton {...data} />);

            expect(wrapper.find(TextField).props().onChange).toEqual(data.handleChangeSearchField);
        });

        it('should pass along the handleKeyUpSearchField prop as onKeyUp', () => {
            const wrapper = shallow<SearchWithButton>(<SearchWithButton {...data} />);

            expect(wrapper.find(TextField).props().onKeyUp).toEqual(data.handleKeyUpSearchField);
        });
    });
});