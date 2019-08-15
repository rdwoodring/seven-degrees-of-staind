import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import MusicOff from '@material-ui/icons/MusicOff';

import ISearchPresentationProps from './ISearchPresentationProps';

import SearchWithButton from '../../components/searches/search-with-button/SearchWithButton';
import ArtistItemCard from '../../components/cards/artist-item-card/ArtistItemCard';
import IconMessage from '../../components/empty-states/icon-message/IconMessage';


class SearchPresentation extends React.Component<ISearchPresentationProps> {
    render() {
        const artistMarkup = this.buildBodyMarkup();

        return (
            <div>
                <Box mb={2}>
                    <SearchWithButton
                        search={this.props.artist}
                        handleChangeSearchField={this.props.handleChangeSearchField}
                        handleKeyUpSearchField={this.props.handleKeyUpSearchField}
                        handleClickSearchButton={this.props.handleClickSearchButton}
                    />
                </Box>
                <div>
                    {artistMarkup}
                </div>
            </div>
        )
    }

    private buildBodyMarkup() {
        let markup;

        if (this.props.results.length) {
            markup = this.buildArtistItemCards();
        } else {
            markup = this.buildEmptyState();
        }

        return markup;
    }

    buildEmptyState(): any {
        return (
            <Card raised={true}>
                <IconMessage icon={MusicOff} message="No results found" />
            </Card>
        );
    }

    private buildArtistItemCards() {
        return this.props.results.map((item) => {
            return (<div key={item.id} style={{
                marginBottom: '5px'
            }}>
                <ArtistItemCard {...item} />
            </div>);
        });
    }
}

export default SearchPresentation;