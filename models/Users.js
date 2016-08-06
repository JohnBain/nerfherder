var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    } ,
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 99
    },
    tags: Array,
    img_resources: Array,
    location_info: Object,
    about: String,
    what_im_doing: String,
    miscellaneous_nerdery: String
});

//"pre" is a middleware affecting the save function.
//All we're doing here is encrypting the password given to us in the signup form.

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//we will use this to de-hash the password given at login and check if it matches

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);

/*
            name: 'surf_boarder',
            age: 32,
            gender: 'M',
            tags: ['surfing', 'online dating', 'fantasy'],
            default_img: '',
            location_text: '',
            img_resources: ['public/images/man.jpg'],
            location_info: { lat: -34.397, lng: 150.644 }
*/

/* username: String,
password: String,
gender: String,
tags: Array,
img_resources: Array,
location_info: Object,
about: String,
what_im_doing: String,
miscellaneous_nerdery: String
*/
