// import jest from 'jest';
const jest = require('jest');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

let argv = process.argv.slice(2);

argv.push('--config', JSON.stringify({
    "roots": [
        "./src"
    ],
    "transform": {
        "^.+\\.spec\\.tsx?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest"
    }
}));

argv.push('--env=node');

jest.run(argv);