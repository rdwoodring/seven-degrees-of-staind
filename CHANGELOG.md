
# Change Log
All notable changes to this project will be documented in this file.
 
This project adheres to [Semantic Versioning](http://semver.org/).
 
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