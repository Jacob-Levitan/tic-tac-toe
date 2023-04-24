const fs = require('fs');
const path = require('path')
const secretsPath = '/run/secrets'

function read_secret(name) {
    const secretPath = path.join(secretsPath, name);
    return fs.readFileSync(secretPath, { encoding: 'utf-8', flag: 'r' } );
}

module.exports = read_secret;
