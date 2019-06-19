import ICookiesMap from "./ICookiesMap";

export default interface ICookies {
    // handleClickHeroLoginButton(e: React.SyntheticEvent): void
    getCookie(cookieName: string): string
    setCookie(cookieName: string, value: string): void
    getCookies(): ICookiesMap
}