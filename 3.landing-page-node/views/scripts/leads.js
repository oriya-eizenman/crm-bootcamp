
document.addEventListener('DOMContentLoaded', function (event) {
    getSqlLeads('created', 'asc');
});

function getSqlLeads(sortBy, order) {
    let leads = {};
    const populateRes = (data) => {
        leads = data;

        clearLeadsTable();
        const table = document.getElementById("leadsTable");
        leads.forEach(lead => {
            const row = document.createElement('tr');
            row.className = "tableRow";

            for (const key in lead) {
                const td = document.createElement('td');
                if (key == 'user_email') {
                    const a = document.createElement('a');
                    a.href = '#';
                    a.innerText = lead[key];
                    a.onclick = () => sendEmailToLead(lead[key]);
                    row.appendChild(a);
                }
                else {
                    td.innerText = lead[key];
                    row.appendChild(td);
                }
            }

            table.appendChild(row);
        })
    };

    getLeads(sortBy, order, populateRes);
}

const emailSubject = "Hello from OOGIE'S BAKERY!"
const emailBody = "Hi,"
    + "\n\nThis is Oriya from OOGIE'S BAKERY, it's nice to meet you."
    + "\nI saw that you left us your contact details, I would like to provide you with any information you need."
    + "\nPlease reply with the information you need or order to be placed."
    + "\n\nYou can also contact us by phone: +97212345678."
    + "\nThank you!"
    + "\nOriya (:"

const test = encodeURIComponent(emailBody);

sendEmailToLead = (userEmail) => {
    const link = `mailto:${userEmail}`
        + `?subject=${emailSubject}`
        + `&body=${test}`
        ;

    location.href = link;
}

function clearLeadsTable() {
    const tableRows = document.querySelectorAll(".tableRow");
    tableRows.forEach(row => {
        row.innerHTML = "";
    })
}