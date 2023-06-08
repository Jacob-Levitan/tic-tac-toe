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

    roles: {
        type: Array,
        required: true,
        default: ['user']
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
        const user = await this.model('User').findOne({ username: attemptedUsername });
        return user;
    }
    catch (err) {
        console.log(err);
    }
}

userSchema.statics.getUserById = async function getUserById(id) {
    try {
        const user = await this.model('User').findOne({ _id: id });
        return user;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('User', userSchema);
