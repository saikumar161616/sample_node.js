/**
 * @constant express epxress library for handling of server requests
 */
let express = require('express');

/**
 * @constant bodyParser parses the json requests
 */
const bodyParser = require('body-parser');

/**
 * @constant routes root routes object to handle all the requests.
*/
const routes = require('./routes');
/**
 * @constant app instance of the express object
*/
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

/**
 * @constant morganFormat logs all the http requests
*/
const morganFormat = 'dev';
const PORT = 5000;
const mongoDBURL = "mongodb://localhost:27017/mydb";


app.use(require('morgan')(morganFormat));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**Initialize Routes*/
app.use('/api', routes);


mongoose.connect(mongoDBURL,
    {
        socketTimeoutMS: 30000,
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => console.log(err.reason));
mongoose.connection.on('error', (err) => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});


let httpServer = require('http').createServer(app);

/**server listening on default port or given port*/
httpServer.listen(PORT, () => {
    console.log('///////////////////////////////////////////////////////////');
    console.log(`server is up and running on port ${PORT}`);
    console.log('///////////////////////////////////////////////////////////');
});

module.exports = httpServer;
