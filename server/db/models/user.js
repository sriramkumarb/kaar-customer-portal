var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    creation_dt: {
        type: Date,
        require: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
