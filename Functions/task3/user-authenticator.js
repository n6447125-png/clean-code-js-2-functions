const userService = require('./thirdparty/user-service');
const sessionManager = require('./thirdparty/session-manager');

const authenticator = {
    login: function (userName, password) {
        const user = userService.getUserByName(userName);
        if (!userService.isPasswordCorrect(user, password)) {
            return null;
        }
        sessionManager.setCurrentUser(user);
        return user;
    },
};

module.exports = authenticator;
