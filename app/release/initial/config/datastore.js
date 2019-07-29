module.exports = {
    dev: {
        activeConnection: 'default', // name of any of the connections
        connections: {
            default: {
                "database": 'xxxxxxxxxx', 
                "username": '',  //only for testing purposes you can also define the values here
                "password": '', //replace '@' with '%40' if present in passphrase
                "host":     'localhost',
                "port":     '27017',
                "dns":      '' //srv or txt
            }
        }
    },
    prod: {
        activeConnection: 'default', // name of any of the connections
        connections: {
            default: {
                "database": 'xxxxxxxxxx', 
                "username": 'xxxxxxxxxx',  //only for testing purposes you can also define the values here
                "password": 'xxxxxxxxxx', //replace '@' with '%40' if present in passphrase
                "host":     'localhost',
                "port":     '27017',
                "dns":      '' //srv or txt
            }
        }
    },
    qa: {
        activeConnection: 'default', // name of any of the connections
        connections: {
            default: {
                "database": 'xxxxxxxxxx', 
                "username": 'xxxxxxxxxx',  //only for testing purposes you can also define the values here
                "password": 'xxxxxxxxxx', //replace '@' with '%40' if present in passphrase
                "host":     'localhost',
                "port":     '27017',
                "dns":      '' //srv or txt
            }
        }
    },
    staging: {
        activeConnection: 'default', // name of any of the connections
        connections: {
            default: {
                "database": 'xxxxxxxxxx', 
                "username": 'xxxxxxxxxx',  //only for testing purposes you can also define the values here
                "password": 'xxxxxxxxxx', //replace '@' with '%40' if present in passphrase
                "host":     'localhost',
                "port":     '27017',
                "dns":      '' //srv or txt
            }
        }
    }
}