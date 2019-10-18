import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import Button from '@material-ui/core/Button';

import FourOhThreePresentation from './FourOhThreePresentation';
import IFourOhThreePresentationProps from './IFourOhThreePresentationProps';

configure({ adapter: new Adapter() });

let data: IFourOhThreePresentationProps;

beforeEach(() => {
    data = {
        handleClickLoginButton: jest.fn()
    };
});

describe('render', () => {
    it('should render a Button as a child', () => {
        const wrapper = shallow<FourOhThreePresentation>(<FourOhThreePresentation {...data} />);

        expect(wrapper.find(Button).length).toBe(1);
    });

    describe('when rendering button as a child', () => {
        it('should pass the handleClickLoginButton prop as onClick', () => {
            const wrapper = shallow<FourOhThreePresentation>(<FourOhThreePresentation {...data} />);

            expect(wrapper.find(Button).props().onClick).toEqual(data.handleClickLoginButton);
        });
    });
});