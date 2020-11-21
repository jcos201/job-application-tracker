const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    companyName: String,
    jobTitle: String,
    dateApplied: Date,
    interviewDate: Date,
    contactName: String,
})
const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    applications: [applicationSchema],
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema);