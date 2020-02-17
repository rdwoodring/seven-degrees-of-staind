export default interface IArtistItemCardProps {
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
    stepsAwayFromStaind: number | null
    name: string
    popularity: number
    type: string
    uri: string
}