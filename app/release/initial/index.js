const express = require('express');
const mongoose = require('mongoose');
const fid = require('../../core/file.helper');
const Logger = require('../../core/log.helper');
const dbconf = require('./config/datastore');
const router = express.Router();

var argv = require('minimist')(process.argv.slice(2));
const env_from_cli = argv.dev ? 'dev' : (argv.prod ? 'prod' : (argv.qa ? 'qa' : (argv.staging ? 'staging' : 'dev') ) )
const env = require(`../../environment/env-${env_from_cli}`);
const port = env.PORT;

const connection_string = `mongodb${ dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].dns !='' ? '+' + dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].dns : '' }://` +
`${dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].username != '' ? dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].username + ':' : ''}` +
`${dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].password != '' ? dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].password + '@' : ''}` +
`${dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].port != '' ? dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].host + ':' : dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].host + '/'}` + 
`${dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].port != '' ? dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].port + '/': ''}` + 
`${dbconf[env_from_cli].connections[dbconf[env_from_cli].activeConnection].database}` +
`?retryWrites=true&w=majority`;
console.log(connection_string);

mongoose.connect(connection_string,{
    useCreateIndex: true,    
    useNewUrlParser:true
}).then(status => {
    Logger.info('connected to datastore','up & running', `on http://localhost:${port} or http://127.0.0.1:${port}`);
    fid.getFiles(__dirname,'./endpoints').then(files => {

        files.forEach(file => {
            file = file.replace(/.js/g,''); 
            router.use(`/${file}`,require(`./endpoints/${file}`))
        });

    })

}).catch(err => {

    Logger.errorWithTermination('error connecting datastore',err,'app crashed')
    
})

module.exports = router