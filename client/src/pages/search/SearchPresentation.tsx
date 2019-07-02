import React from 'react';

import ISearchPresentationProps from './ISearchPresentationProps';

import SearchWithButton from '../../components/searches/search-with-button/SearchWithButton';
import ArtistItemCard from '../../components/cards/artist-item-card/ArtistItemCard';

class SearchPresentation extends React.Component<ISearchPresentationProps> {
    render() {
        const artistMarkup = this.buildArtistItemCards();

        return (
            <div>
                <SearchWithButton
                    search={this.props.artist}
                    handleChangeSearchField={this.props.handleChangeSearchField}
                    handleKeyUpSearchField={this.props.handleKeyUpSearchField}
                    handleClickSearchButton={this.props.handleClickSearchButton}
                />
                <div>
                    {artistMarkup}
                </div>
            </div>
        )
    }

    private buildArtistItemCards() {
        return this.props.results.map((item) => {
            return (
                <div key={item.id} style={{
                    marginBottom: '5px'
                }}>
                    <ArtistItemCard {...item} />
                </div>
            );
        });
    }
}

export default SearchPresentation;