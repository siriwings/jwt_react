import express from 'express';
import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';

import config from './config';

import passport from 'passport';
import localSignupStrategy from './passport/local-signup';
import localLoginStrategy from './passport/local-login';


//import authCheckMiddleware from './middleware/auth-check';

//export한 route폴더의 index.js
import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
//app.use(bodyParser.json());

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

//pass the passport middleware
app.use(passport.initialize());

// load passport strategies
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


/*
app.use(function(req, res, next) {
    //모든 도메인의 요청을 허용하지 않으면 웹브라우저에서 CORS 에러를 발생시킨다.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
*/

/* mongodb connection */
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });

app.use('/', express.static(path.join(__dirname, './../public')));

/* setup routers & static directory */
//import api from './routes';
app.use('/api', api);


// pass the authenticaion checker middleware
//app.use('/dashboard', authCheckMiddleware);


// routes
//const authRoutes = require('./routes/auth');
//app.use('/auth', authRoutes);

/* support client-side routing */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});


/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
