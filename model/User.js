const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String
    }, 
    {
    timestamps: true
});
schema.method.fullName = function() {
    return `${this.firstName} ${this.lastName}`;
};
const User = mongoose.model('User', schema);
module.exports = User;
   