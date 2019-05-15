# Seven Degrees of Staind (Butt Rock Classifier)

At work, we got tired of arguing over which bands were or were not [butt rock](https://www.urbandictionary.com/define.php?term=Butt%20Rock), so we wanted an objective way to make the determination. Everyone could agree that Staind was the epicenter of butt rock, so this app uses Spotify's Related Artist API to build a tree of related artists seven degrees out from Staind to classify what's butt rock.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to install a copy of [Node.js](https://nodejs.org/en/download/) to run this project. Download the appropriate installer for your system and follow the installation wizard. Note that the project was built using Node 10.15, though it probably should work on later versions and maybe on older versions.

You will also need to have either NPM or Yarn installed. NPM comes packaged with Node.js so you'll get that for free by installing Node.js. If you want to use [Yarn](https://yarnpkg.com/en/docs/install) download the appropriate installer and follow the installation wizard. Yarn should work fine, but note that the project was developed using NPM and the instructions are based on NPM.

### Installing

1. Clone the repository
2. Install all dependencies in the project root by running `npm install`
3. Create a dotenv file named ".env"
4. Login to your Spotify account and get an API key
5. Add CLIENT_ID=your_spotify_app_client_id to your .env file
6. Add CLIENT_SECRET=your_spotify_app_client_secret to your .env file
7. Run `npm run build-server-ts` to compile the TypeScript server code into JavaScript that Node can run
8. Run `npm start` to start the Node server

You should now be able to access the app on [localhost:3000](localhost:3000).

## Deployment

TODO

## Built With

* [Node.js](https://nodejs.org/) - Web framework
* [NPM](https://www.npmjs.com/) - Dependency Management
* [TypeScript](https://www.typescriptlang.org/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

TODO 

## Authors

* **Ryan Woodring** - *Initial work* - [rdwoodring](https://github.com/rdwoodring)

See also the list of [contributors](https://github.com/rdwoodring/seven-degrees-of-staind) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details

## Acknowledgments

TODO