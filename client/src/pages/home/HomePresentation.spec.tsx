import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import HomePresentation from './HomePresentation';
import HeroCard from '../../components/cards/hero-card/HeroCard';
import IHomePresentationProps from './IHomePresentationProps';


configure({ adapter: new Adapter() });

let data: IHomePresentationProps;

beforeEach(() => {
    data = {
        handleClickHeroLoginButton: jest.fn()
    }
});

describe('render', () => {
    it('should render', () => {
        expect(() => {
            shallow(<HomePresentation {...data} />);
        }).not.toThrow();
    });
});