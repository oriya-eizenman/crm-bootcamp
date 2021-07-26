function isEmailValid(userEmail) {
    const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return reg.test(userEmail);
}

function isPasswordValid(password) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return reg.test(password);
}

function isFullNameValid(fullName) {
    const reg = /^([a-zA-Z]{2,}\s{1}[a-zA-Z]{2,}|[a-zA-Z]{2,}\s{1}[a-zA-Z]{2,}\s{1}[a-zA-Z]{2,})$/;
    return reg.test(fullName);
}

function isBusinessNameValid(businessName) {
    const reg = /^((?![\^!@#$*~ <>?]).)((?![\^!@#$*~<>?]).){0,73}((?![\^!@#$*~ <>?]).)$/;
    return reg.test(businessName);
}

function isPhoneNumberValid(phoneNumber) {
    const reg = /^((\+972)|(\+972-)|0)5[2-9](-)?[0-9]{3}(-)?[0-9]{4}$/;
    return reg.test(phoneNumber);
}

module.exports = { isEmailValid, isPasswordValid, isFullNameValid, isBusinessNameValid, isPhoneNumberValid };
