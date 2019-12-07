const cluster = require('cluster')


// master?
if (cluster.isMaster) {
    // Cause index.js to be excuted *again* but in slave mode.
    cluster.fork();
} else {

    // slave code.
    const crypto = require('crypto');
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!!');
    });

    app.listen(3000);
}

