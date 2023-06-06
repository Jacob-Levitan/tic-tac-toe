const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        immutable: true,
        unique: true
    },

    hashedPw: {
        type: String,
        required: true
    },

    userCreatedDate: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },

    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },

    wins: {
        type: Number,
        required: true

    },

    losses: {
        type: Number,
        required: true
    }
});

userSchema.statics.getUserByEmail = async function getUserByEmail(attemptedEmail) {
    try {
        const user = await this.model('User').findOne({ email: attemptedEmail });
        return user;
    }
    catch (err) {
        console.log(err);
    }
}

userSchema.statics.getUserByUsername = async function getUserByUsername(attemptedUsername) {
    try {
        // await mongo_connect();
        const user = await this.model('User').findOne({ username: attemptedUsername });
        // await mongo_disconnect();

        return user;
    }
    catch (err) {
        console.log(err);
    }
}

userSchema.statics.getUserById = async function getUserById(id) {
    try {
        // await mongo_connect();
        const user = await this.model('User').findOne({ _id: id });
        // await mongo_disconnect();
        return user;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('User', userSchema);
