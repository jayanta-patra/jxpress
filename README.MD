# Documentation

### Installation
`$ sudo npm i`
> use **--unsafe-perm** parameter on the above command if you find any permission issue 


### Running The Application

##### Run with the command
`$ node bootstrap.js`

##### Using 'nodemon'
`$ nodemon bootstrap.js -w`
> if you do not want to restart the sedrver upon modifing the code then do not use **-w** after the command

##### Using specific PORT number
`$ node bootstrap.js --port {PORT}`
`$ nodemon bootstrap.js --port {PORT} -w`
> Replace **{PORT}** with your specified port number.


### Database connectivity
Find **datastore.js** in the following path 
`app/release/**{your_release_no}**/config/datastore.js`

>create your database connecttion here as default and set **activeConnection** for each of the environment (dev/prod/qa/staging)


### Setting JWT key
Find **globals.js** in the following path 
`app/release/**{your_release_no}**/config/globals.js`
and set your public and private keys here

### Default PORT
Port 3100 is default port for this application

### API endpoints will be
http://localhost:{**port_specified or 3100**}/{**release_number**}/{**name_of_the_endpoint_file_without_js_extension**}/{**endpoint**}

> eg. http://localhost:3100/initial/user/login