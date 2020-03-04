import React from 'react';
import { configure, shallow, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import { Route, BrowserRouter, Switch, Redirect, MemoryRouter } from "react-router-dom";

import DocumentTitle from 'react-document-title';

import App, {
    WrappedNavbar,
    WrappedSearch
} from './App';

import Footer from './components/footers/Footer';
import Home from './pages/home/Home';
import FourOhThree from './pages/403/FourOhThree';
import FourOhFour from './pages/404/FourOhFour';

configure({ adapter: new Adapter() });

describe('render', () => {
    it('should render a WrappedNavbar', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(WrappedNavbar).length).toBe(1);
    });

    it('should render a BrowserRouter', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(BrowserRouter).length).toBe(1);
    });

    it('should render a Footer', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(Footer).length).toBe(1);
    });

    it('should render a Route components as a child', () => {
        const wrapper = shallow<App>(<App />);

        expect(wrapper.find(Route).length).toBeGreaterThan(1);
    });

    describe('when rendering Route components', () => {
        it('should render a Route with a path of /', () => {
            const wrapper = shallow<App>(<App />);

            expect(wrapper.findWhere((comp) => {
                return comp.name() === 'Route' && comp.prop('path') === '/';
            }).length).toBe(1);
        });

        it('should render a Route with a path of /search', () => {
            const wrapper = shallow<App>(<App />);

            expect(wrapper.findWhere((comp) => {
                return comp.name() === 'Route' && comp.prop('path') === '/search';
            }).length).toBe(1);
        });

        it('should render a Route with a path of /403', () => {
            const wrapper = shallow<App>(<App />);

            expect(wrapper.findWhere((comp) => {
                return comp.name() === 'Route' && comp.prop('path') === '/403';
            }).length).toBe(1);
        });

        it('should render a Route with a path of /404', () => {
            const wrapper = shallow<App>(<App />);

            expect(wrapper.findWhere((comp) => {
                return comp.name() === 'Route' && comp.prop('path') === '/404';
            }).length).toBe(1);
        });

        it('should render a Route with a path of *', () => {
            const wrapper = shallow<App>(<App />);

            expect(wrapper.findWhere((comp) => {
                return comp.name() === 'Route' && comp.prop('path') === '*';
            }).length).toBe(1);
        });
        
        describe('when rendering a Route with a path of /', () => {
            it('should render a Home component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(Home)).toHaveLength(1);
            });

            it('should render a DocumentTitle component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(DocumentTitle)).toHaveLength(1);
            });

            describe('when rendering a DocumentTitle component', () => {
                it('should pass a title prop of Seven Degrees of Staind - Home', () => {
                    const wrapper = shallow<App>(<App />),
                        routeComponent = wrapper.findWhere((comp) => {
                            return comp.name() === 'Route' && comp.prop('path') === '/';
                        }),
                        routeWrapper = shallow(
                            <div>
                                {routeComponent.props().render()}
                            </div>
                        );
                        
                    expect(routeWrapper.find(DocumentTitle).props().title).toBe('Seven Degrees of Staind - Home');
                });
            });
        });
        
        describe('when rendering a Route with a path of /search', () => {
            it('should render a WrappedSearch component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/search';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(WrappedSearch)).toHaveLength(1);
            });

            it('should render a DocumentTitle component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/search';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(DocumentTitle)).toHaveLength(1);
            });

            describe('when rendering a DocumentTitle component', () => {
                it('should pass a title prop of Seven Degrees of Staind - Search', () => {
                    const wrapper = shallow<App>(<App />),
                        routeComponent = wrapper.findWhere((comp) => {
                            return comp.name() === 'Route' && comp.prop('path') === '/search';
                        }),
                        routeWrapper = shallow(
                            <div>
                                {routeComponent.props().render()}
                            </div>
                        );
                        
                    expect(routeWrapper.find(DocumentTitle).props().title).toBe('Seven Degrees of Staind - Search');
                });
            });
        });
        
        describe('when rendering a Route with a path of /403', () => {
            it('should render a WrappedSearch component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/403';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(FourOhThree)).toHaveLength(1);
            });

            it('should render a DocumentTitle component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/403';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(DocumentTitle)).toHaveLength(1);
            });

            describe('when rendering a DocumentTitle component', () => {
                it('should pass a title prop of Seven Degrees of Staind - Home', () => {
                    const wrapper = shallow<App>(<App />),
                        routeComponent = wrapper.findWhere((comp) => {
                            return comp.name() === 'Route' && comp.prop('path') === '/403';
                        }),
                        routeWrapper = shallow(
                            <div>
                                {routeComponent.props().render()}
                            </div>
                        );
                        
                    expect(routeWrapper.find(DocumentTitle).props().title).toBe('Seven Degrees of Staind - Permission Denied');
                });
            });
        });
        
        describe('when rendering a Route with a path of /404', () => {
            it('should render a FourOhFour component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/404';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(FourOhFour)).toHaveLength(1);
            });

            it('should render a DocumentTitle component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '/404';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(DocumentTitle)).toHaveLength(1);
            });

            describe('when rendering a DocumentTitle component', () => {
                it('should pass a title prop of Seven Degrees of Staind - Home', () => {
                    const wrapper = shallow<App>(<App />),
                        routeComponent = wrapper.findWhere((comp) => {
                            return comp.name() === 'Route' && comp.prop('path') === '/404';
                        }),
                        routeWrapper = shallow(
                            <div>
                                {routeComponent.props().render()}
                            </div>
                        );
                        
                    expect(routeWrapper.find(DocumentTitle).props().title).toBe('Seven Degrees of Staind - Page Not Found');
                });
            });
        });
        
        describe('when rendering a Route with a path of /*', () => {
            it('should render a Redirect component', () => {
                const wrapper = shallow<App>(<App />),
                    routeComponent = wrapper.findWhere((comp) => {
                        return comp.name() === 'Route' && comp.prop('path') === '*';
                    }),
                    routeWrapper = shallow(
                        <div>
                            {routeComponent.props().render()}
                        </div>
                    );
                    
                expect(routeWrapper.find(Redirect)).toHaveLength(1);
            });

            describe('when rendering a Redirect', () => {
                it('should have a to prop of /404', () => {
                    const wrapper = shallow<App>(<App />),
                        routeComponent = wrapper.findWhere((comp) => {
                            return comp.name() === 'Route' && comp.prop('path') === '*';
                        }),
                        routeWrapper = shallow(
                            <div>
                                {routeComponent.props().render()}
                            </div>
                        );
                        
                    expect(routeWrapper.find(Redirect).props().to).toBe('/404');
                });
            });
        });
    });
});