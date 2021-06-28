sendReq = (leadName, leadEmail, leadPhone, populateRes) => {
    axios.post('http://localhost:8004', {
        leadName: leadName,
        leadEmail: leadEmail,
        leadPhone: leadPhone
    })
        .then(res => {
            populateRes(res.data);
        })
        .catch(err => {
            alert(err);
        });
}

getLeads = (sortBy, order, populateRes) => {
    axios.post('http://localhost:8004/leads', {
        sortBy: sortBy,
        order: order
    })
        .then(res => {
            populateRes(res.data);
        })
        .catch(err => {
            alert.apply(err);
        })
}

