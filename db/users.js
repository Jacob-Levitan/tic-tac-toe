// For now use in-memory array of users until we connect to real DB
const users = [];

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

module.exports = { users, getUserByEmail, getUserById };
