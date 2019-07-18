import {
    exec
} from 'child_process';

import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

const command = `mongoimport --uri ${process.env.DB_CONN_STRING} --collection relatedArtists --drop --jsonArray --file ./related.json`;

new Promise((resolve) => {
    exec(command, (err, stdout, stderr) => {
        fs.unlink('./related.json', () => {
            console.log(stderr);
            console.log('done');
        
            resolve();
        });
    });
});