[![CircleCI](https://circleci.com/gh/rdwoodring/seven-degrees-of-staind/tree/master.svg?style=svg)](https://circleci.com/gh/rdwoodring/seven-degrees-of-staind/tree/master)
[![GitHub license](https://img.shields.io/github/license/rdwoodring/seven-degrees-of-staind)](https://github.com/rdwoodring/seven-degrees-of-staind/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/rdwoodring/seven-degrees-of-staind)](https://GitHub.com/rdwoodring/seven-degrees-of-staind/releases/)
[![GitHub contributors](https://img.shields.io/github/contributors/rdwoodring/seven-degrees-of-staind)](https://GitHub.com/rdwoodring/seven-degrees-of-staind/graphs/contributors/)


# Seven Degrees of Staind (Butt Rock Classifier)

At work, we got tired of arguing over which bands were or were not [butt rock](https://www.urbandictionary.com/define.php?term=Butt%20Rock), so we wanted an objective way to make the determination. Everyone could agree that Staind was the epicenter of butt rock, so this app uses Spotify's Related Artist API to build a tree of related artists seven degrees out from Staind to classify what's butt rock.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to install a copy of [Node.js](https://nodejs.org/en/download/) to run this project. Download the appropriate installer for your system and follow the installation wizard. Note that the project was built using Node 10.15, though it probably should work on later versions and maybe on older versions.

You will also need to have [Yarn](https://yarnpkg.com/en/docs/install) installed, as Seven Degrees of Staind takes advantage of Yarn's workspace feature. Download the appropriate installer and follow the installation wizard.

Finally, you will need an instance of MongoDB. You can probably use one of Mongo's free cloud instances, but the project was developed using a copy of [MongoDB](https://www.mongodb.com/download-center/community) locally. MongoDB is primarily used for secure, server-side storage of session data so that the access token and refresh token returned from Spotify don't have to be stored client-side in something like a cookie.

### Installing

1. Clone the repository
2. Install all dependencies in the project root by running `yarn install`
3. Create a dotenv file named ".env"
4. Login to your Spotify account and get an API key
5. Add CLIENT_ID=your_spotify_app_client_id to your .env file
6. Add CLIENT_SECRET=your_spotify_app_client_secret to your .env file
7. Add SESSION_SECRET=a_strong_random_string to your .env file
8. Add DB_CONN_STRING=my_db_connection_string to your .env file. If you installed MongoDB locally, the connection string will look something like this: `mongodb://localhost:1234/my-seven-degrees-of-staind-dev-db-cluster`
9. Run `mongod --dbpath='path/to/your/data/directory'`
10. Run `yarn run watch` to compile the TypeScript server and client code into JavaScript that Node can run. This command runs the server behind [nodemon](https://www.npmjs.com/package/nodemon) so the server gets restarted on all changes and also ensures that the client code gets re-overlayed on all changes.
11. [Import the butt rock related artists graph](#importing-butt-rock-artists) into your database

You should now be able to access the app on [localhost:3000](localhost:3000).

#### Importing Butt Rock Artists
There are two ways you can get some butt rock related artists imported into your development database:

##### Import Manually Using a Pre-built Related Artists JSON
1. Download the [related.json](https://gist.github.com/rdwoodring/0ab919e723669de447611def7ff5a84f) file from the gist. This file was generated from a recent import done during development.
2. Place it in the root of Seven Degrees of Staind project
3. Ensure that mongod is running
3. Run the `mongoimport --uri ${process.env.DB_CONN_STRING} --collection relatedartists --drop --jsonArray --file ./related.json` command from the root of your Seven Degrees of Staind project.

##### Import Using the Import Scripts
1. Ensure that your TypeScript has been compiled to JavaScript.
2. Ensure that mongod is running
3. Run the `node ./server/dist/scripts/cron/updateButtRockGraph` from the root of your Seven Degrees of Staind project.

## Deployment
1. Clone the code to the production VM
2. TODO: add node and apache install instructions
3. TODO: add and enable the site instructions
4. Add CLIENT_ID=your_spotify_app_client_id to your .env file
5. Add CLIENT_SECRET=your_spotify_app_client_secret to your .env file
6. Add SESSION_SECRET=a_strong_random_string to your .env file
7. Add DB_CONN_STRING=my_db_connection_string to your .env file. If you installed MongoDB locally, the connection string will look something like this: `mongodb://localhost:1234/my-seven-degrees-of-staind-prod-db-cluster`
8. Start mongo by running `mongod --fork --dbpath ~/data/db`
9. Go to the site directory (var/www/butt-rock.com/html/nodejs)
10. Install pm2 by running `npm install pm2 -g`
11. Run `sudo pm2 start bin/www --watch --name butt-rock`
12. Run `sudo pm2 startup`
13. Copy and paste the output of the startup command and run it
14. Run `sudo pm2 save` to complete the process of daemonizing the app

## Built With

* [Node.js](https://nodejs.org/) - Web framework
* [Yarn](https://classic.yarnpkg.com/en/) - Dependency Management
* [TypeScript](https://www.typescriptlang.org/) - JavaScript... but with type safety!
* [React](https://www.reactjs.org) - Fast and straightforward UI library
* [MaterialUI](https://material-ui.com/) - UI components library
* [Express](https://expressjs.com/) - Server framework
* [MongoDB](https://www.mongodb.com/) - Persistent server-side storage

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

This project adheres to [semantic versioning](https://semver.org/). 

## Authors

* **Ryan Woodring** - *Initial work* - [rdwoodring](https://github.com/rdwoodring)

See also the list of [contributors](https://github.com/rdwoodring/seven-degrees-of-staind) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details

## Acknowledgments

TODO