var argv = require('minimist')(process.argv.slice(2));
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const _linker = require('./app/index');
const app = express();

app.set('_env', require(`./app/environment/env-${argv.dev ? 'dev' : (argv.prod ? 'prod' : (argv.qa ? 'qa' : (argv.staging ? 'staging' : 'dev') ) )}`) )
app.use(morgan('dev'));
app.use(express.static('uploads')); //with base url and file name
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin" , "*");
    res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods" , "PUT, POST, PATCH, DELETE, GET");     
        return res.status(200).json({});   
    }
    next();
});
app.use('/', _linker);
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error:{
            message : error.message
        }
    });
});

module.exports = app;                                                       

