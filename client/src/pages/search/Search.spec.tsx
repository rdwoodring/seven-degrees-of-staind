import React from 'react';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { RouteComponentProps } from 'react-router';

import axios, {AxiosResponse} from 'axios';

import {Search} from './Search';
import ISearchProps from './ISearchProps';

import SearchPresentation from './SearchPresentation';
import SearchLoadingPresentation from './SearchLoadingPresentation';

import IArtistItemCardProps from '../../components/cards/artist-item-card/IArtistItemCardProps';

configure({ adapter: new Adapter() });

let data: ISearchProps & RouteComponentProps;

beforeEach(() => {
    data = {
        history: {
            length: 0,
            action: 'PUSH',
            location: {
                pathname: '',
                search: '?artist=trapt',
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
            search: '?artist=trapt',
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

describe('componentDidMount', () => {
    let fakePromise: Promise<any>;

    beforeEach(() => {
        fakePromise = new Promise<any>((resolve) => {
            resolve({
                data: {
                    artists: {
                        items: [
                            {},
                            {}
                        ]
                    }
                }
            });
        });

        axios.get = jest.fn((url: string, data?: any, config?: any) => {
            // return Promise.resolve({} as AxiosResponse)
            return fakePromise;
        })
    })

    describe('when artist state is truthy', () => {
        it('should call axios.get', () => {
            shallow(<Search {...data} />);

            expect(axios.get).toHaveBeenCalled();
        });

        it('should set isLoading state to true', () => {
            const wrapper = shallow<Search>(<Search {...data} />);

            expect(wrapper.state().isLoading).toBe(true);
        });

        describe('when calling axios.get', () => {
            it('should pass /api/v1/search?artist= plus the artist state', () => {
                shallow(<Search {...data} />);

                expect(axios.get).toHaveBeenCalledWith('/api/v1/search?artist=trapt');
            });
        });

        describe('when the call to axios.get resolve', () => {
            it('should set results state to resp.data.artists.items', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                return fakePromise.then(() => {
                    expect(wrapper.state().results).toEqual([
                        {},
                        {}
                    ]);
                });
            });
        })
    });
});

describe('render', () => {
    describe('when isLoading state is false', () => {
        it('should render SearchPresentation as a child', () => {
            const wrapper = shallow<Search>(<Search {...data} />);

            wrapper.setState({
                isLoading: false
            });
    
            expect(wrapper.find(SearchPresentation).length).toBe(1);
        });
    
        describe('when rendering SearchPresentation as a child', () => {
            it('should pass along the artist state as search', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                wrapper.setState({
                    isLoading: false,
                    artist: 'elmo'
                });
    
                expect(wrapper.find(SearchPresentation).props().search).toEqual('elmo');
            });

            it('should pass along the results state', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                wrapper.setState({
                    isLoading: false,
                    results: [
                        {} as IArtistItemCardProps
                    ]
                });
    
                expect(wrapper.find(SearchPresentation).props().results).toEqual([
                    {}
                ]);
            });

            it('should pass along the handleChangeSearchField method as a prop', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                wrapper.setState({
                    isLoading: false
                });
    
                expect(wrapper.find(SearchPresentation).props().handleChangeSearchField).toEqual(wrapper.instance().handleChangeSearchField);
            });
            
            it('should pass along the handleKeyUpSearchField method as a prop', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                wrapper.setState({
                    isLoading: false
                });
    
                expect(wrapper.find(SearchPresentation).props().handleKeyUpSearchField).toEqual(wrapper.instance().handleKeyUpSearchField);
            });
            
            it('should pass along the handleClickSearchButton method as a prop', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                wrapper.setState({
                    isLoading: false
                });
    
                expect(wrapper.find(SearchPresentation).props().handleClickSearchButton).toEqual(wrapper.instance().handleClickSearchButton);
            });
        });
    });

    describe('when isLoading state is true', () => {
        it('should render SearchLoadingPresentation as a child', () => {
            const wrapper = shallow<Search>(<Search {...data} />);
    
            wrapper.setState({
                isLoading: true
            });
    
            expect(wrapper.find(SearchLoadingPresentation).length).toBe(1);
        });
    
        describe('when rendering SearchLoadingPresentation as a child', () => {
            it('should pass along the artist state as search', () => {
                const wrapper = shallow<Search>(<Search {...data} />);
    
                wrapper.setState({
                    isLoading: true,
                    artist: 'elmo'
                });
    
                expect(wrapper.find(SearchLoadingPresentation).props().search).toEqual('elmo');
            });
    
            it('should pass along the results state', () => {
                const wrapper = shallow<Search>(<Search {...data} />);
    
                wrapper.setState({
                    isLoading: true,
                    results: [
                        {} as IArtistItemCardProps
                    ]
                });
    
                expect(wrapper.find(SearchLoadingPresentation).props().results).toEqual([
                    {}
                ]);
            });
    
            it('should pass along the handleChangeSearchField method as a prop', () => {
                const wrapper = shallow<Search>(<Search {...data} />);
    
                wrapper.setState({
                    isLoading: true
                });
    
                expect(wrapper.find(SearchLoadingPresentation).props().handleChangeSearchField).toEqual(wrapper.instance().handleChangeSearchField);
            });
            
            it('should pass along the handleKeyUpSearchField method as a prop', () => {
                const wrapper = shallow<Search>(<Search {...data} />);
    
                wrapper.setState({
                    isLoading: true
                });
    
                expect(wrapper.find(SearchLoadingPresentation).props().handleKeyUpSearchField).toEqual(wrapper.instance().handleKeyUpSearchField);
            });
            
            it('should pass along the handleClickSearchButton method as a prop', () => {
                const wrapper = shallow<Search>(<Search {...data} />);
    
                wrapper.setState({
                    isLoading: true
                });
    
                expect(wrapper.find(SearchLoadingPresentation).props().handleClickSearchButton).toEqual(wrapper.instance().handleClickSearchButton);
            });
        });
    });
});

describe('handleChangeSearchField', () => {
    let fakeEvent: React.ChangeEvent<HTMLInputElement>;

    beforeEach(() => {
        fakeEvent = {
            target: {
                value: 'bob ross'
            }
        } as React.ChangeEvent<HTMLInputElement>;
    });

    it('should set the artist state to the target.value of the passed in event', () => {
       const wrapper = shallow<Search>(<Search {...data} />);
       
       wrapper.setState({
           artist: 'leonardo'
       });

       wrapper.instance().handleChangeSearchField(fakeEvent);

       expect(wrapper.state().artist).toEqual('bob ross');
    });
});

describe('handleKeyUpSearchField', () => {
    let fakeEvent: React.KeyboardEvent<HTMLInputElement>;

    describe('when the passed in event has a keyCode of 13 (enter)', () => {
        let fakePromise: Promise<any>,
            fakeGet: jest.Mock;

        beforeEach(() => {
            fakePromise = new Promise<any>((resolve) => {
                resolve({
                    data: {
                        artists: {
                            items: [
                                {},
                                {}
                            ]
                        }
                    }
                });
            });

            fakeGet = jest.fn((url: string, data?: any, config?: any) => {
                // return Promise.resolve({} as AxiosResponse)
                return fakePromise;
            });

            fakeEvent = {
                keyCode: 13
            } as React.KeyboardEvent<HTMLInputElement>;

            axios.get = fakeGet;
        })

        describe('when artist state is not empty', () => {
            it('should call axios.get', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                fakeGet.mockClear();

                wrapper.setState({
                    artist: 'bob ross'
                });

                wrapper.instance().handleKeyUpSearchField(fakeEvent);

                expect(fakeGet).toHaveBeenCalled();
            });

            it('should set isLoading state to true', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                fakeGet.mockClear();

                wrapper.setState({
                    artist: 'bob ross'
                });

                wrapper.instance().handleKeyUpSearchField(fakeEvent);

                expect(wrapper.state().isLoading).toBe(true);
            });

            describe('when calling axios.get', () => {
                it('should pass /api/v1/search?artist= plus the artist state', () => {
                    const wrapper = shallow<Search>(<Search {...data} />);

                    fakeGet.mockClear();

                    wrapper.setState({
                        artist: 'bob ross'
                    });

                    wrapper.instance().handleKeyUpSearchField(fakeEvent);

                    expect(fakeGet).toHaveBeenCalledWith('/api/v1/search?artist=bob ross');
                });
            });

            describe('when the call to axios.get resolve', () => {
                it('should set results state to resp.data.artists.items', () => {
                    const wrapper = shallow<Search>(<Search {...data} />);

                    fakeGet.mockClear();

                    wrapper.setState({
                        artist: 'bob ross'
                    });

                    wrapper.instance().handleKeyUpSearchField(fakeEvent);

                    return fakePromise.then(() => {
                        expect(wrapper.state().results).toEqual([
                            {},
                            {}
                        ]);
                    });
                });
            })
        });

        describe('when artist state is empty', () => {
            it('should not call axios.get', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                fakeGet.mockClear();

                wrapper.setState({
                    artist: ''
                });

                wrapper.instance().handleKeyUpSearchField(fakeEvent);

                expect(fakeGet).not.toHaveBeenCalled();
            });
        });
    });
});

describe('handleClickSearchButton', () => {
    let fakePromise: Promise<any>,
            fakeGet: jest.Mock;

        beforeEach(() => {
            fakePromise = new Promise<any>((resolve) => {
                resolve({
                    data: {
                        artists: {
                            items: [
                                {},
                                {}
                            ]
                        }
                    }
                });
            });

            fakeGet = jest.fn((url: string, data?: any, config?: any) => {
                // return Promise.resolve({} as AxiosResponse)
                return fakePromise;
            });

            axios.get = fakeGet;
        })

        describe('when artist state is not empty', () => {
            it('should call axios.get', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                fakeGet.mockClear();

                wrapper.setState({
                    artist: 'bob ross'
                });

                wrapper.instance().handleClickSearchButton();

                expect(fakeGet).toHaveBeenCalled();
            });

            it('should set isLoading state to true', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                fakeGet.mockClear();

                wrapper.setState({
                    artist: 'bob ross'
                });

                wrapper.instance().handleClickSearchButton();

                expect(wrapper.state().isLoading).toBe(true);
            });

            it('should call the history prop\'s push method', () => {
                const wrapper = shallow<Search>(<Search {...data} />);

                wrapper.setState({
                    artist: 'bob ross'
                });

                wrapper.instance().handleClickSearchButton();

                expect(data.history.push).toHaveBeenCalled();
            });

            describe('when calling axios.get', () => {
                it('should pass /api/v1/search?artist= plus the artist state', () => {
                    const wrapper = shallow<Search>(<Search {...data} />);

                    fakeGet.mockClear();

                    wrapper.setState({
                        artist: 'bob ross'
                    });

                    wrapper.instance().handleClickSearchButton();

                    expect(fakeGet).toHaveBeenCalledWith('/api/v1/search?artist=bob ross');
                });
            });

            describe('when the call to axios.get resolve', () => {
                it('should set results state to resp.data.artists.items', () => {
                    const wrapper = shallow<Search>(<Search {...data} />);

                    fakeGet.mockClear();

                    wrapper.setState({
                        artist: 'bob ross'
                    });

                    wrapper.instance().handleClickSearchButton();

                    return fakePromise.then(() => {
                        expect(wrapper.state().results).toEqual([
                            {},
                            {}
                        ]);
                    });
                });
            });

            describe('when calling the history prop\'s push method', () => {
                it('should pass /search?artist= plus the artist in state', () => {
                    const wrapper = shallow<Search>(<Search {...data} />);

                    wrapper.setState({
                        artist: 'bob ross'
                    });

                    wrapper.instance().handleClickSearchButton();

                    expect(data.history.push).toHaveBeenCalledWith('/search?artist=bob ross');
                });
            });
        });
});
