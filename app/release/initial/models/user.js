const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//Naming Convention For Model
// 1. WE have to name our model User for Users collection
// 2. model automatically add 's' after the name of the model name
// 3. do not use 's' at the end of the model name
// 4. if model is not present in the db when first time we add data to collection it will automatically create one.
// 5. if any field does not match with its model field type throw an exception so write catch block 

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: {
            validator: function () {
                return new Promise((res, rej) => {
                    User.findOne({
                            email: this.email,
                            _id: {
                                $ne: this._id
                            }
                        })
                        .then(data => {
                            if (data) {
                                res(false)
                            } else {
                                res(true)
                            }
                        })
                        .catch(err => {
                            res(false)
                        })
                })
            },
            message: 'Email Already Taken'
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Manager', 'Sales', 'Developer', 'Tester', 'Client', 'Customer'],
        default: 'Customer'
    }
}, {
    versionKey: false, // You should be aware of the outcome after set to false
    timestamps: true
});

userSchema.pre('save', async function (next) {

    var user = this;
    if (this.isModified('password') || this.isNew) {

        try {
            var salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            var hashed_password = await bcrypt.hash(user.password, salt)
            user.password = hashed_password;
            user._id = new mongoose.Types.ObjectId();
            return next();
        } catch (error) {
            return next(error);
        }

    } else {
        return next();
    }
})

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatched) {
        if (err) return cb(err)
        cb(null, isMatched)
    })
}

// userSchema.set("toObject", {getters: true});

const User = mongoose.model("users", userSchema)

module.exports = User