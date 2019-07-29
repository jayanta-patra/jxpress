const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/globals');
const User = require('../models/user')
const jwtTokenGen = require('../config/jwt');

module.exports = {
    signup : function (req,res,next) {

        // chk if email exist 409 status => conflict/ 422 unprocessable entity 
        if(!req.body.email || !req.body.passkey)
        {
            return res.status(404).json({
                message: 'Please enter user email and password.'
            })
        }else{
            var newUser = new User({
                email: req.body.email,
                password: req.body.passkey,
                name: req.body.name
            });
            newUser.save(function (err,d) { 

                if (err) { return res.status(201).json({message: "User not registered", err}) }
                
                res.status(200).json({
                    message: 'user created',
                    user : d
                })
            });
        }
    },
    login : (req,res,next) => {

        User.findOne({email: req.body.email}, function (err,user) { //, { password: 0 }
            if (err) { throw err }
            
            if(!user)
            {
                return res.status(404).json('User not found')
            }else{
                
                user.comparePassword(req.body.passkey, async function (err,isMatch) {
                    
                    if(isMatch && !err)
                    {                      
                        try {
                            user = JSON.parse(JSON.stringify(user));
                            delete user.password; 
                            var token = await jwtTokenGen(user);
                            
                            res.status(200).json({token: 'JWT ' + token})
                        } catch (error) {
                            return res.status(201).json('Auth failed.'+JSON.stringify(error))
                        }
                    }else {
                        return res.status(201).json('Auth failed.')
                    }
                })
            }
        })

    }
} 
