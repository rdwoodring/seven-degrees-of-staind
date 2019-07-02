export default interface IArtistSearchResultItem {
    external_urls: {
        spotify: string
    }
    followers: {
        href: string | null
        total: number
    }
    genres: string[]
    href: string
    id: string
    images: {
        height: number
        url: string
        width: number
    }[]
    isbuttrock: Boolean
    name: string
    popularity: number
    type: string
    uri: string
}