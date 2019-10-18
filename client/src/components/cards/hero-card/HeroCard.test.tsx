import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import {HeroCard} from './HeroCard';
import IHeroCardProps from './IHeroCardProps';

import HeroCardLoggedInPresentation from './HeroCardLoggedInPresentation';
import HeroCardLoggedOutPresentation from './HeroCardLoggedOutPresentation';

configure({ adapter: new Adapter() });

let data: IHeroCardProps & RouteComponentProps;

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
        },
        isLoggedIn: true
    }
})

describe('render', () => {
    describe('when the isLoggedIn prop is true', () => {
        beforeEach(() => {
            data = {
                ...data,
                isLoggedIn: true
            };
        });

        it('should render the HeroCardLoggedInPresentation', () => {
            const wrapper = shallow<HeroCard>(<HeroCard {...data} />);

            expect(wrapper.find(HeroCardLoggedInPresentation).length).toBe(1);
        });
    });

    describe('when the isLoggedin prop is false', () => {
        beforeEach(() => {
            data = {
                ...data,
                isLoggedIn: false
            };
        });

        it('should render the HeroCardLoggedOutPresentation', () => {
            const wrapper = shallow<HeroCard>(<HeroCard {...data} />);

            expect(wrapper.find(HeroCardLoggedOutPresentation).length).toBe(1);
        });
    });
});

describe('handleClickLoginButton', () => {
    
});

describe('handleClickSearchButton', () => {
    it('should call the history prop\'s push method', () => {
        const wrapper = shallow<HeroCard>(<HeroCard {...data} />);

        wrapper.instance().handleClickSearchButton();

        expect(data.history.push).toHaveBeenCalled();
    });

    describe('when calling the history prop\'s push method', () => {
        it('should pass the string /search?artist= plus the contents of state\'s search', () => {
            const wrapper = shallow<HeroCard>(<HeroCard {...data} />);

            wrapper.setState({
                search: 'banana'
            });

            wrapper.instance().handleClickSearchButton();

            expect(data.history.push).toHaveBeenCalledWith('/search?artist=banana');
        });
    });
});

describe('handleChangeSearchField', () => {
    it('should set state\'s search to the target.value of the passed in event', () => {
        const wrapper = shallow<HeroCard>(<HeroCard {...data} />),
            fakeEvent = {
                target: {
                    value: 'apple pie with ice cream'
                }
            } as React.ChangeEvent<HTMLInputElement>;

        wrapper.setState({
            search: 'peach pie'
        });

        wrapper.instance().handleChangeSearchField(fakeEvent);

        expect(wrapper.state().search).toEqual('apple pie with ice cream');
    });
});

describe('handleKeyUpSearchField', () => {
    describe('when the passed in event has a keyCode of 13 (enter)', () => {
        it('should call the history prop\'s push method', () => {
            const wrapper = shallow<HeroCard>(<HeroCard {...data} />),
                fakeEvent = {
                    keyCode: 13
                } as React.KeyboardEvent<HTMLInputElement>;
    
            wrapper.setState({
                search: 'peach pie'
            });
    
            wrapper.instance().handleKeyUpSearchField(fakeEvent);
    
            expect(data.history.push).toHaveBeenCalled();
        });
    
        describe('when calling the history prop\'s push method', () => {
            it('should pass the string /search?artist= plus the contents of state\'s search', () => {
                const wrapper = shallow<HeroCard>(<HeroCard {...data} />),
                    fakeEvent = {
                        keyCode: 13
                    } as React.KeyboardEvent<HTMLInputElement>;
        
                wrapper.setState({
                    search: 'peach pie'
                });
        
                wrapper.instance().handleKeyUpSearchField(fakeEvent);
    
                expect(data.history.push).toHaveBeenCalledWith('/search?artist=peach pie');
            });
        });
    });

    describe('when the passed in event does not have a keyCode of 13', () => {
        it('should call the history prop\'s push method', () => {
            const wrapper = shallow<HeroCard>(<HeroCard {...data} />),
                fakeEvent = {
                    keyCode: 24
                } as React.KeyboardEvent<HTMLInputElement>;
    
            wrapper.setState({
                search: 'peach pie'
            });
    
            wrapper.instance().handleKeyUpSearchField(fakeEvent);
    
            expect(data.history.push).not.toHaveBeenCalled();
        });
    });
});
