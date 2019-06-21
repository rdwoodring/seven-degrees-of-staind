import ICookies from './ICookies';
import ICookiesMap from './ICookiesMap';

class Cookies implements ICookies {
    private cookiesMap: ICookiesMap;

    constructor() {
        this.cookiesMap = this.buildCookiesMap();
    }

    private buildCookiesMap(): ICookiesMap {
        const cookieString = document.cookie || '',
            cookiesArray = cookieString.split(';');

        return cookiesArray.reduce((accumulator, cookie) => {
            if (cookie.length) {
                const splitCookie = cookie.split('=');
    
                return {
                    ...accumulator,
                    [splitCookie[0].trim()]: splitCookie[1].trim()
                };
            } else {
                return accumulator;
            }
        }, {});
    }
    
    public getCookie(cookieName: string): string {
        const cookie: string | undefined = this.cookiesMap[cookieName];

        return cookie;
    }    
    
    public setCookie(cookieName: string, value: string): void {
        throw new Error("Method not implemented.");
    }

    public getCookies(): ICookiesMap {
        return this.cookiesMap;
    }
}

export default Cookies;