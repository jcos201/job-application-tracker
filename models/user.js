const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,

})
const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    jobTitle: [],
    companies: [companySchema],
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema);