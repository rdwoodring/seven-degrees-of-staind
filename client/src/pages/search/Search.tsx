import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

import queryString from 'query-string';

import axios, { AxiosResponse } from 'axios';

import ISearchProps from './ISearchProps';
import ISearchState from './ISearchState';

import SearchPresentation from './SearchPresentation';
import SearchLoadingPresentation from './SearchLoadingPresentation';

class Search extends React.Component<ISearchProps & RouteComponentProps, ISearchState> {
    constructor(props: ISearchProps & RouteComponentProps) {
        super(props);

        const initialSearch = this.extractSearchFromProps();

        this.handleChangeSearchField = this.handleChangeSearchField.bind(this);
        this.handleKeyUpSearchField = this.handleKeyUpSearchField.bind(this);

        this.state = {
            artist: initialSearch,
            isLoading: false,
            results: []
        };
    }

    componentDidMount() {
        this.doSearch();
    }

    render() {
        const searchPresentationProps = {
            ...this.state,
            search: this.state.artist,
            handleChangeSearchField: this.handleChangeSearchField,
            handleKeyUpSearchField: this.handleKeyUpSearchField,
            handleClickSearchButton: this.handleClickSearchButton,
        },
        SelectedSearchPresentation = this.selectSearchPresentation();

        return (
            <SelectedSearchPresentation {...searchPresentationProps} />
        );
    }

    handleChangeSearchField(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            artist: e.target.value
        });
    }

    handleKeyUpSearchField(e: React.KeyboardEvent<HTMLInputElement>) {
        const enterKeyCode = 13;
        
        if (e.keyCode === enterKeyCode) {
            this.handleClickSearchButton();
        }
    }

    handleClickSearchButton() {
        this.doSearch();
    }

    private extractSearchFromProps(): string {
        const queryObj = queryString.parseUrl(this.props.location.search),
            artist = queryObj.query.artist ? queryObj.query.artist.toString() : '';

        return artist;
    }

    private selectSearchPresentation(): React.ElementType {
        if (this.state.isLoading) {
            return SearchLoadingPresentation;
        } else {
            return SearchPresentation;
        }
    }

    private doSearch() {
        if (this.state.artist) {
            this.setState({
                isLoading: true
            });

            axios.get(`/api/v1/search?artist=${this.state.artist}`)
                .then((resp: AxiosResponse) => {
                    this.setState({
                        isLoading: false,
                        results: resp.data.artists.items
                    });
                });
        }
    }
}

export default Search;