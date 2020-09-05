import React from 'react';

import {
    screen,
    render,
    waitForElement
} from '@testing-library/react';

import '@testing-library/jest-dom'

import userEvent from '@testing-library/user-event'

import axios, {
    AxiosResponse
} from 'axios';

import {
    MemoryRouter
} from 'react-router-dom';

import Search from './Search';
import { ActionCardTravel } from 'material-ui/svg-icons';
import { act } from 'react-dom/test-utils';

let fakePromise: Promise<any>;

beforeEach(() => {
    fakePromise = new Promise<any>((resolve) => {
        resolve({
            data: {
                artists: {
                    items: [
                        {
                            followers: {
                                total: 23
                            },
                            id: 'APL',
                            images: [],
                            name: 'apple'
                        },
                        {
                            followers: {
                                total: 23
                            },
                            id: 'BAN',
                            images: [],
                            name: 'banana'
                        }
                    ]
                }
            }
        });
    });

    axios.get = jest.fn((url: string, data?: any, config?: any) => {
        return fakePromise;
    });
});

describe('when there is an artist query parameter', () => {
    it('should call axios.get', async () => {
        render(
            <MemoryRouter initialEntries={['/search?artist=creed']}>
                <Search />
            </MemoryRouter>
        );

        await screen.findByText('banana');

        expect(axios.get).toHaveBeenCalled();
    });

    it('should populate the search field with the initial search artist', async () => {
        render(
            <MemoryRouter initialEntries={['/search?artist=creed']}>
                <Search />
            </MemoryRouter>
        );

        await screen.findByText('banana');

        expect(screen.getByRole('textbox')).toHaveValue('creed');
    });

    describe('when calling axios.get', () => {
        it('should call pass the artist as the search query param to the artists endpoint', async () => {
            render(
                <MemoryRouter initialEntries={['/search?artist=creed']}>
                    <Search />
                </MemoryRouter>
            );
    
            await screen.findByText('banana');
    
            expect(axios.get).toHaveBeenCalledWith('/api/v1/artists?search=creed');
        });
    });

    describe('when there are no matching results', () => {
        beforeEach(() => {
            fakePromise = new Promise<any>((resolve) => {
                resolve({
                    data: {
                        artists: {
                            items: []
                        }
                    }
                });
            });
        
            axios.get = jest.fn((url: string, data?: any, config?: any) => {
                return fakePromise;
            });
        });

        it('should render an empty state', async () => {
            render(
                <MemoryRouter initialEntries={['/search?artist=creed']}>
                    <Search />
                </MemoryRouter>
            );
    
            await expect((await screen.findByText('No results found'))).toBeInTheDocument();
        })
    });
});

describe('when typing in the search field', () => {
    it('should update the search input field', async () => {
        render(
            <MemoryRouter initialEntries={['/search?artist=creed']}>
                <Search />
            </MemoryRouter>
        );

        await screen.findByText('banana');

        userEvent.clear(screen.getByRole('textbox'));
        userEvent.type(screen.getByRole('textbox'), 'orange');

        expect(screen.getByRole('textbox')).toHaveValue('orange');
    });

    describe('when the enter key is not pressed', () => {
        it('should not call axios.get', async () => {
            render(
                <MemoryRouter initialEntries={['/search?artist=creed']}>
                    <Search />
                </MemoryRouter>
            );
    
            await screen.findByText('banana');

            axios.get = jest.fn((url: string, data?: any, config?: any) => {
                return new Promise<any>((resolve) => {
                    resolve({
                        data: {
                            artists: {
                                items: [
                                    {
                                        followers: {
                                            total: 23
                                        },
                                        id: 'ORG',
                                        images: [],
                                        name: 'orange'
                                    }
                                ]
                            }
                        }
                    });
                });
            });

            userEvent.clear(screen.getByRole('textbox'));
            userEvent.type(screen.getByRole('textbox'), 'orange');

            expect(axios.get).not.toBeCalled();
        });
    });

    describe('when the search button is clicked', () => {
        it('should trigger a call to axios.get', async () => {
            
            render(
                <MemoryRouter initialEntries={['/search?artist=creed']}>
                    <Search />
                </MemoryRouter>
            );
    
            await screen.findByText('banana');
    
            axios.get = jest.fn((url: string, data?: any, config?: any) => {
                return new Promise<any>((resolve) => {
                    resolve({
                        data: {
                            artists: {
                                items: [
                                    {
                                        followers: {
                                            total: 23
                                        },
                                        id: 'ORG',
                                        images: [],
                                        name: 'orange'
                                    }
                                ]
                            }
                        }
                    });
                });
            });
    
            userEvent.clear(screen.getByRole('textbox'));
            userEvent.type(screen.getByRole('textbox'), 'turkey');
    
            userEvent.click(screen.getByRole('button', {
                name: 'Search'
            }));

            await screen.findByText('orange');

            expect(axios.get).toHaveBeenCalled();
        });

        describe('when calling axios.get', () => {
            it('pass the artist as a search query param to the artists endpoint', async () => {
            
                render(
                    <MemoryRouter initialEntries={['/search?artist=creed']}>
                        <Search />
                    </MemoryRouter>
                );
        
                await screen.findByText('banana');
        
                axios.get = jest.fn((url: string, data?: any, config?: any) => {
                    return new Promise<any>((resolve) => {
                        resolve({
                            data: {
                                artists: {
                                    items: [
                                        {
                                            followers: {
                                                total: 23
                                            },
                                            id: 'ORG',
                                            images: [],
                                            name: 'orange'
                                        }
                                    ]
                                }
                            }
                        });
                    });
                });
        
                userEvent.clear(screen.getByRole('textbox'));
                userEvent.type(screen.getByRole('textbox'), 'turkey');
        
                userEvent.click(screen.getByRole('button', {
                    name: 'Search'
                }));
    
                await screen.findByText('orange');
    
                expect(axios.get).toHaveBeenCalledWith('/api/v1/artists?search=turkey');
            });
        });
    });
});