const cluster = require('cluster')

// master?
if (cluster.isMaster) {
    // Cause index.js to be excuted *agin* but in slave mode.
    cluster.fork();
} else {

    // slave code.

    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) { }
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there');
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!!');
    });

    app.listen(3000);
}

