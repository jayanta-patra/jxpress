var argv = require('minimist')(process.argv.slice(2));
module.exports = {
    PORT: argv.port || 3100,
    ENV: 'qa'
}