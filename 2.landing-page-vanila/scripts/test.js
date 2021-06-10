function testFormInput() {
    if (!isInputNameValid()) {
        styleError("invalidName");
    }
    if (!isInputEmailValid()) {
        styleError("invalidEmail");
    }

}

function isInputNameValid() {
    const inputName = document.getElementById("inputName");
    const reg = /^\w+\s\w+$/;
    return reg.test(inputName.value);
}

function isInputEmailValid() {
    const inputEmail = document.getElementById("inputEmail");
    const reg = /^\w+@\w{2,}\.\w{2,}$/;
    return reg.test(inputEmail.value)
}

function clearInputName() {
    document.getElementById("invalidName").style.display = "none";
}

function clearInputEmail() {
    document.getElementById("invalidEmail").style.display = "none";
}

function styleError(invalidElementId) {
    const errorMsgStyle = document.getElementById(invalidElementId).style;
    errorMsgStyle.display = "flex";
    errorMsgStyle.color = "red";
    errorMsgStyle.fontSize = "0.8em";
    errorMsgStyle.position = "absolute";
    errorMsgStyle.left = "70%";
}