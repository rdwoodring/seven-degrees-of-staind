import {SyntheticEvent} from 'react';

export default interface IHeroCardPresentationProps {
    search: string
    handleClickLoginButton(): void
    handleClickSearchButton(): void
    handleChangeSearchField(e: SyntheticEvent): void
    handleKeyUpSearchField(e: SyntheticEvent): void
}