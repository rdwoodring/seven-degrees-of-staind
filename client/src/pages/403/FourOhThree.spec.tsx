import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import {FourOhThree} from './FourOhThree';
import IFourOhThreeProps from './IFourOhThreeProps';

import FourOhThreePresentation from './FourOhThreePresentation';

configure({ adapter: new Adapter() });

let data: IFourOhThreeProps & RouteComponentProps;

beforeEach(() => {
    data = {} as RouteComponentProps;
});

describe('render', () => {
    it('should render FourOhThreePresentation as a child', () => {
        const wrapper = shallow<FourOhThree>(<FourOhThree {...data} />);

        expect(wrapper.find(FourOhThreePresentation).length).toBe(1);
    });

    describe('when rendering FourOhThreePresentation as a child', () => {
        it('should pass along the handleClickLoginButton method as a prop', () => {
            const wrapper = shallow<FourOhThree>(<FourOhThree {...data} />);

            expect(wrapper.find(FourOhThreePresentation).props().handleClickLoginButton).toEqual(wrapper.instance().handleClickLoginButton);
        });
    });
});