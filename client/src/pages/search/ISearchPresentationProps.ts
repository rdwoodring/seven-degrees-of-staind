import {SyntheticEvent} from 'react';

import IArtistItemCardProps from '../../components/cards/artist-item-card/IArtistItemCardProps'

export default interface ISearchPresentationProps {
    artist: string
    isLoading: Boolean
    results: IArtistItemCardProps[]
    search: string,
    handleChangeSearchField(e: SyntheticEvent): void
    handleKeyUpSearchField(e: SyntheticEvent): void
    handleClickSearchButton(): void
};