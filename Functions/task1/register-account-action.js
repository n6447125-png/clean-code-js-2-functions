const WrongAccountNameException = require('./thirdparty/wrong-account-name-exception');
const WrongPasswordException = require('./thirdparty/wrong-password-exception');

const MIN_NAME_LENGTH = 6;
const SHORT_PASSWORD_MAX_LENGTH = 8;

module.exports = class RegisterAccountAction {
    constructor() {
        this.passwordChecker = null;
        this.accountManager = null;
    }

    register(account) {
        this.validateName(account.name);
        this.validatePassword(account.password);
        this.populateAccount(account);
        this.accountManager.createNewAccount(account);
    }

    validateName(name) {
        if (name.length < MIN_NAME_LENGTH) {
            throw new WrongAccountNameException(name);
        }
    }

    validatePassword(password) {
        if (this.isShortPassword(password) && !this.isPasswordAccepted(password)) {
            throw new WrongPasswordException();
        }
    }

    isShortPassword(password) {
        return password.length <= SHORT_PASSWORD_MAX_LENGTH;
    }

    isPasswordAccepted(password) {
        return this.passwordChecker.validate(password) === this.passwordChecker.result.OK;
    }

    populateAccount(account) {
        account.setCreatedDate(new Date());
        account.setAddresses(this.collectAddresses(account));
    }

    collectAddresses(account) {
        return new Set([
            account.getHomeAddress(),
            account.getWorkAddress(),
            account.getAdditionalAddress(),
        ]);
    }

    setAccountManager(accountManager) {
        this.accountManager = accountManager;
    }

    setPasswordChecker(passwordChecker) {
        this.passwordChecker = passwordChecker;
    }
};
