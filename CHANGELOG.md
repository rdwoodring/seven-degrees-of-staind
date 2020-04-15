
# Change Log
All notable changes to this project will be documented in this file.
 
This project adheres to [Semantic Versioning](http://semver.org/).


 
## [[1.1.0]](https://github.com/rdwoodring/seven-degrees-of-staind/releases/tag/v1.1.0) - 2020-04-14
 
### Features
  - [#17](https://github.com/rdwoodring/seven-degrees-of-staind/issues/17)
  Swap the request module out for Axios for requests being proxied from the server to the Spotify API.
  - [#123](https://github.com/rdwoodring/seven-degrees-of-staind/issues/123), [#124](https://github.com/rdwoodring/seven-degrees-of-staind/issues/124)  Update the search API to include the number of nodes between Staind and the current artist. Update the UI to render a specific message based on the artist's distance from Staind.
  - [#125](https://github.com/rdwoodring/seven-degrees-of-staind/issues/125)
  Add a footer with copyright date and Github badge linking to the project.
 
### Fixes
 
- [#116](https://github.com/rdwoodring/seven-degrees-of-staind/issues/116)
  Pull in [react-document-title](https://www.npmjs.com/package/react-document-title) to update the page title on navigation to various routes.
- [#119](https://github.com/rdwoodring/seven-degrees-of-staind/issues/119)
  Utilize the generated service worker when the app is loaded over HTTPS.
- [#129](https://github.com/rdwoodring/seven-degrees-of-staind/issues/129)
  Replace `new Buffer()` with `Buffer.from()` in login.ts.
- [#131](https://github.com/rdwoodring/seven-degrees-of-staind/issues/131)
  Remove an unused aria attribute where an icon was just cosmetic and had no semantic meaning.
 
## [[1.0.2]](https://github.com/rdwoodring/seven-degrees-of-staind/releases/tag/v1.0.2) - 2020-01-30
 
### Fixes
 
- [PR #122](https://github.com/rdwoodring/seven-degrees-of-staind/pull/122)
  Bump mongoose from 5.6.5 to 5.7.5
 
## [[1.0.1]](https://github.com/rdwoodring/seven-degrees-of-staind/releases/tag/v1.0.1) - 2020-01-30
 
### Fixes
 
- [PR #121](https://github.com/rdwoodring/seven-degrees-of-staind/pull/121)
  Bump mongoose from 5.6.5 to 5.7.5

## [[1.0.0]](https://github.com/rdwoodring/seven-degrees-of-staind/releases/tag/v1.0.0) - 2019-10-23
 
### Features
- [#57](https://github.com/rdwoodring/seven-degrees-of-staind/issues/57), [#59](https://github.com/rdwoodring/seven-degrees-of-staind/issues/59), [#58](https://github.com/rdwoodring/seven-degrees-of-staind/issues/58), [#61](https://github.com/rdwoodring/seven-degrees-of-staind/issues/61)
  Add session management to securely store Spotify API access tokens server-side
- [#66](https://github.com/rdwoodring/seven-degrees-of-staind/issues/66), [#65](https://github.com/rdwoodring/seven-degrees-of-staind/issues/65), [#69](https://github.com/rdwoodring/seven-degrees-of-staind/issues/69), [#64](https://github.com/rdwoodring/seven-degrees-of-staind/issues/64), [#67](https://github.com/rdwoodring/seven-degrees-of-staind/issues/67)
Add a script to build up a related artists graph from Staind using the Spotify API
- Build out the UI
- Add an `/api/v1/search` endpoint that accepts an `artist` query paramter