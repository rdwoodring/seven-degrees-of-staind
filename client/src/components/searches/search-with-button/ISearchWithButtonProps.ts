import {SyntheticEvent} from 'react';

export default interface ISearchWithButtonProps {
    search: string,
    handleChangeSearchField(e: SyntheticEvent): void
    handleKeyUpSearchField(e: SyntheticEvent): void
}