var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    hash: String,
    salt: String,
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
    bio: String,
    created_on: { type: Date, default: Date.now }
});

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // this is when our JWT expires

    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        age: this.age,
        gender: this.gender,
        exp: parseInt(expiry.getTime() / 1000), //UNIX time in seconds
    }, process.env.JWT_SECRET); //secret used by hash algorithm

};

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex'); //Create a random string for salt
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
        //doing it this way keeps us from having a password in the databse in any form
}

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash //returns a boolean telling us if password is valid
}

module.exports = mongoose.model('User', userSchema);
