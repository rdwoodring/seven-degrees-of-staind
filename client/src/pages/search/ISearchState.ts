import IArtistItemCardProps from '../../components/cards/artist-item-card/IArtistItemCardProps'

export default interface ISearchState {
    artist: string
    isLoading: Boolean
    results: IArtistItemCardProps[]
}