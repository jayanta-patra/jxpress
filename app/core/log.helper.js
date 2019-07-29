const chalk = require('chalk');
header='SOCKET INVOKED';

var pjson = require('../../package.json');

module.exports = {
    // socket: ( ...msg ) => {
    //     console.log(chalk.black.bgWhite('************************* '+header+' *************************'));
    //     console.log('');
    //     msg.forEach((c,indx) => {
    //         console.log(chalk.black.bgYellow('Message '+ (indx+1) +': '));
    //         console.log(chalk.cyan(JSON.stringify(c, undefined, 4)));
    //     })    
    //     console.log('');
    //     console.log(chalk.black.bgWhite('************************* '+header+' *************************'));
    // },
    info: (...msg) => {
        msg.forEach((c,indx) => {
            console.log(chalk.yellow(`[${pjson.name}]`), chalk.green(`${c}`));
        })   
    },
    warn: (...msg) => {
        msg.forEach((c,indx) => {
            console.log(chalk.yellow(`[${pjson.name}]`), chalk.yellow(`${c}`));
        })   
    },
    error: (...msg) => {
        msg.forEach((c,indx) => {
            console.log(chalk.yellow(`[${pjson.name}]`), chalk.red(`${c}`));
        })  
    },
    errorWithTermination: (...msg) => {
        msg.forEach((c,indx) => {
            console.log(chalk.yellow(`[${pjson.name}]`), chalk.red(`${c}`));
        })  
        
        process.kill(process.pid, 'SIGTERM');
    },
}
