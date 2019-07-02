import {SyntheticEvent} from 'react';

import ISearchState from './ISearchState';

export default interface ISearchPresentationProps extends ISearchState {
    search: string,
    handleChangeSearchField(e: SyntheticEvent): void
    handleKeyUpSearchField(e: SyntheticEvent): void
    handleClickSearchButton(): void
};