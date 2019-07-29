const express = require('express');
const fid = require('./core/file.helper');
const router = express.Router();

fid.getFiles(__dirname,'./release').then(releases => {
    releases.forEach(release => { 
        router.use(`/${release}`,require(`./release/${release}/index`))
    })
})

module.exports = router