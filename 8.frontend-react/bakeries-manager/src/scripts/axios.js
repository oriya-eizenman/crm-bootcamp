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
            console.log('here')
            console.log(res.data)
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
            populateLoggedInUser(res.data.loggedInUser[0]);
        })
        .catch(err => {
            alert(err);
        });
}

const getLoggedInUser = (loggedInUser, populateLoggedInUser) => {
    axios.post('http://localhost:8005/registred',
        { loggedInUser },
        { withCredentials: true })
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

const sendResetPasswordEmail = (userEmail) => {
    axios.post('http://localhost:8005/forgotPassword', {
        userEmail: userEmail
    })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            alert(err);
        });
}

const resetPassword = (userEmail, password) => {
    axios.post('http://localhost:8005/resetPassword', {
        userEmail: userEmail,
        password: password
    })
        .then(res => {

        })
        .catch(err => {
            alert(err);
        });
}

const sendAddUserEmail = (managerEmail, userEmail) => {
    axios.post('http://localhost:8005/addUser', {
        managerEmail: managerEmail,
        userEmail: userEmail
    }, { withCredentials: true })
        .then(res => {
        })
        .catch(err => {
            alert(err);
        });
}

const sendUserSignUpData = (userName, userData, userPhone, password) => {
    axios.post('http://localhost:8005/userSignup', {
        userName: userName,
        userData: userData,
        userPhone: userPhone,
        password: password
    }, { withCredentials: true })
        .then(res => {
            console.log('new user added')
        })
        .catch(err => {
            alert(err);
        });
}

const getEmployeesInBakery = (managerEmail, populateEmployees) => {
    axios.post('http://localhost:8005/bakeryEmployees', {
        managerEmail: managerEmail
    }, { withCredentials: true })
        .then(res => {
            populateEmployees(res.data);
        })
        .catch(err => {
            alert(err);
        });
}

const removeUser = (userEmail) => {
    axios.post('http://localhost:8005/deleteUser', {
        userEmail: userEmail
    }, { withCredentials: true })
        .then(res => {
            console.log('deleted User');
        })
        .catch(err => {
            alert(err);
        })
}

const sendEmailToMailingList = async (mailingList, messageTitle, message) => {
    const res = await axios.post('http://localhost:8005/sendEmailToMailingList', {
        mailingList,
        messageTitle,
        message
    }, { withCredentials: true });
    console.log(res);
}


export {
    sendSignUpData,
    sendLoginData,
    requestLogout,
    getLoggedInUser,
    sendResetPasswordEmail,
    resetPassword,
    sendAddUserEmail,
    sendUserSignUpData,
    getEmployeesInBakery,
    removeUser,
    sendEmailToMailingList
};