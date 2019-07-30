import {
    exec
} from 'child_process';

import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

function importRelatedArtists(): Promise<void> {
    return new Promise((resolve) => {
        const command = `mongoimport --uri ${process.env.DB_CONN_STRING} --collection relatedartists --drop --jsonArray --file ./related.json`;
    
        exec(command, (err, stdout, stderr) => {
            fs.unlink('./related.json', () => {
                console.log(stderr);
                console.log('done');
            
                resolve();
            });
        });
    });
}

export default importRelatedArtists;