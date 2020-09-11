import React from 'react';
import { withRouter } from 'react-router';
import {RouteComponentProps} from 'react-router-dom';

import queryString from 'query-string';

import axios, { AxiosResponse } from 'axios';

import ISearchProps from './ISearchProps';

import SearchPresentation from './SearchPresentation';
import SearchLoadingPresentation from './SearchLoadingPresentation';
import { useState, useEffect } from 'react';

const Search: React.FC<ISearchProps & RouteComponentProps> = (props) => {
    const [artist, setArtist] = useState(extractSearchFromProps()),
        [isLoading, setIsLoading] = useState(false),
        [results, setResults] = useState([]);

    useEffect(doSearch, []);

    function handleChangeSearchField(e: React.ChangeEvent<HTMLInputElement>) {
        setArtist(e.target.value);
    }

    function handleKeyUpSearchField(e: React.KeyboardEvent<HTMLInputElement>) {
        const enterKeyCode = 13;
        
        if (e.keyCode === enterKeyCode) {
            handleClickSearchButton();
        }
    }

    function handleClickSearchButton() {
        doSearch();

        props.history.push(`/search?artist=${artist}`);
    }

    function extractSearchFromProps(): string {
        const queryObj = queryString.parseUrl(props.location.search),
            artist = queryObj.query.artist ? queryObj.query.artist.toString() : '';

        return artist;
    }

    function selectSearchPresentation(): React.ElementType {
        if (isLoading) {
            return SearchLoadingPresentation;
        } else {
            return SearchPresentation;
        }
    }

    function doSearch() {
        if (artist) {
            setIsLoading(true);

            axios.get(`/api/v1/artists?search=${artist}`)
                .then((resp: AxiosResponse) => {
                    setIsLoading(false);
                    setResults(resp.data.artists.items);
                });
        }
    }

    const searchPresentationProps = {
        artist,
        isLoading,
        results,
        search: artist,
        handleChangeSearchField,
        handleKeyUpSearchField,
        handleClickSearchButton,
    },
    SelectedSearchPresentation = selectSearchPresentation();

    return (
        <SelectedSearchPresentation {...searchPresentationProps} />
    );
};

export default withRouter(Search);
export {Search}