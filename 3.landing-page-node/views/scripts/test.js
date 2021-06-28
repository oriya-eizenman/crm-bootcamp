function testFormInput() {
    let isValid = true;
    if (!isInputNameValid()) {
        isValid = false;
        styleError("invalidName");
    }
    if (!isInputEmailValid()) {
        isValid = false;
        styleError("invalidEmail");
    }
    if (!isInputPhoneValid()) {
        isValid = false;
        styleError("invalidPhone");
    }
    if (isValid) {
        const leadName = document.getElementById("inputName").value;
        const leadEmail = document.getElementById("inputEmail").value;
        const leadPhone = document.getElementById("inputPhone").value;

        const populateRes = (data) => {
            isValid = true;
            let result = {};
            result.isValid = data;


            if (!result.isValid.isNameValid) {
                isValid = false;
                styleError("invalidName");
            }
            if (!result.isValid.isEmailValid) {
                isValid = false;
                styleError("invalidEmail");
            }
            if (!result.isValid.isPhoneValid) {
                isValid = false;
                styleError("invalidPhone");
            }
            if (!result.isValid.isSqlSuccessful) {
                isValid = false;
                styleError("invalidSqlQuery");
            }
            if (isValid) {
                styleSuccess("leadForm", leadName);
            }
        };
        sendReq(leadName, leadEmail, leadPhone, populateRes);
    }
}


function isInputNameValid() {
    const inputName = document.getElementById("inputName");
    const reg = /^\w+\s\w+$/;
    return reg.test(inputName.value);
}

function isInputEmailValid() {
    const inputEmail = document.getElementById("inputEmail");
    const reg = /^\w+.{0,1}\w+@\w{2,}\.\w{2,}$/;
    return reg.test(inputEmail.value)
}

function isInputPhoneValid() {
    const inputPhone = document.getElementById("inputPhone");
    const reg = /^0[1-9][0-9]{8}$/;
    return reg.test(inputPhone.value)
}

function clearInputName() {
    document.getElementById("invalidName").style.display = "none";
}

function clearInputEmail() {
    document.getElementById("invalidEmail").style.display = "none";
}

function clearInputPhone() {
    document.getElementById("invalidPhone").style.display = "none";
}

function styleError(invalidElementId) {
    const errorMsgStyle = document.getElementById(invalidElementId).style;
    errorMsgStyle.display = "flex";
    errorMsgStyle.color = "red";
    errorMsgStyle.fontSize = "0.8em";
    errorMsgStyle.position = "absolute";
    errorMsgStyle.left = invalidElementId === "invalidSqlQuery" ? "79%" : "70%";
}

function styleSuccess(formElementId, userName) {
    const form = document.getElementById(formElementId);
    form.innerHTML = "";
    const h4 = document.createElement("h4");
    h4.textContent = `Thanks ${userName}! We will be in touch soon :)`;
    form.style.display = "flex";
    form.style.justifyContent = "center";
    form.style.alignItems = "center";
    form.style.color = "rgba(78, 124, 177, 0.925)";
    form.appendChild(h4);
}