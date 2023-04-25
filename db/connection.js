const mongoose = require('mongoose')
const read_secret = require('../server/secret_reader');
const DB_USER = read_secret('db_user')
const DB_PW = read_secret('db_pw')
const DB_SERVER = process.env.DB_URI
const dbURI = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_SERVER}?retryWrites=true&w=majority`

mongo_connect();

async function mongo_connect() {
    try {
        await mongoose.connect(dbURI)
        console.log('CONNECTION SUCCESSFUL')
    } catch (err) {
        console.log(`CONNECTION FAILED: ${err}`)
        return err
    }
}

async function mongo_disconnect() {
    try {
        await mongoose.disconnect()
    } catch (err) {
        console.log(err)
    }
}

module.exports = { mongo_connect, mongo_disconnect }
