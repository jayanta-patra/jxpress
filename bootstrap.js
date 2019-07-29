var argv = require('minimist')(process.argv.slice(2));
const env_from_cli = argv.dev ? 'dev' : (argv.prod ? 'prod' : (argv.qa ? 'qa' : (argv.staging ? 'staging' : 'dev') ) )
const fid = require('./app/core/file.helper');
const Logger = require('./app/core/log.helper');
const http = require('http');
const app = require('./app');
const env = require(`./app/environment/env-${env_from_cli}`);
const port = env.PORT;
const server = http.createServer(app);

server.listen(port, () => {
    Logger.info('app is starting up', `as ${env_from_cli}`);
});

if(argv.ws)
{
    const socketPort = env.SOCKET_PORT || 3200;
    const socketServer = http.createServer();
    var io = require('socket.io')(socketServer);
    
    argv.ws === 'boolean' ? fid.getFiles(__dirname,'./app/release').then(releases => {
        releases.forEach(release => {
            require(`./app/release/${release}/config/socket.bundler`).bundler(io)
        })
    }) : null;

    io.attach(socketPort, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });
}