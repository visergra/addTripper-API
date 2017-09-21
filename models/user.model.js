const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'The username is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    firstname: {
        type: String,
        required: [true, 'The firstname is required']
    },
    nickname: {
        type: String,
        unique: true,
        required: [true, 'The nickname is required']
    },
    country: {
        type: String,
        required: [true, 'The country is required']
    },
    about_you: {
        type: String,
        required: [true, 'The about you is required']
    },
    profile_pic: {
        type: String
    }
}, {timestamps: true});

userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }
        else {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) { return next(err); }
                else {
                    user.password = hash;
                    return next();
                }
            })
        }
    })
});

userSchema.methods.checkPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
}

const User = mongoose.model('User', userSchema);
module.exports = User;