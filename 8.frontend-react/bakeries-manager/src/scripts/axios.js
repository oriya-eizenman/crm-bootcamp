const axios = require('axios');

const sendSignUpData = (userName, userEmail, businessName, userPhone, numOfWorkers, password, populateLoggedInUser) => {
    axios.post('http://localhost:8005/signup', {
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        businessName: businessName,
        numOfWorkers: numOfWorkers,
        password: password
    }, { withCredentials: true })
        .then(res => {
            populateLoggedInUser(res.data);
        })
        .catch(err => {
            alert(err);
        });
}

const sendLoginData = (userEmail, password, populateLoggedInUser) => {
    axios.post('http://localhost:8005/login', {
        userEmail: userEmail,
        password: password
    }, { withCredentials: true })
        .then(res => {
            populateLoggedInUser(res.data);
        })
        .catch(err => {
            alert(err);
        });
}

const getLoggedInUser = (populateLoggedInUser) => {
    axios.post('http://localhost:8005/registred', {}, { withCredentials: true })
        .then(res => {
            populateLoggedInUser(res.data);
        })
        .catch(err => {
            alert(err);
        });
}

const requestLogout = () => {
    axios.get('http://localhost:8005/logout', { withCredentials: true })
        .then(res => {

        })
        .catch(err => {
            alert(err);
        });
}

const requestResetPassword = (userEmail) => {
    axios.post('http://localhost:8005/forgotPassword', {
        userEmail: userEmail
    }, { withCredentials: true })
        .then(res => {

        })
        .catch(err => {
            alert(err);
        });
}


export { sendSignUpData, sendLoginData, requestLogout, getLoggedInUser, requestResetPassword };