import React, { useEffect, useState, useMemo, useRef } from 'react';
import Modal from 'react-modal';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Label from '../Components/Label';
import Table from "../Components/Table";
import manage from '../scripts/manageAddUser';
import manageEmployees from '../scripts/manageUsers';
import Page from '../Components/Page';

export default function Users(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [employees, setEmployees] = useState([]);
    const employeesRef = useRef(employees);
    employeesRef.current = employees;

    useEffect(() => {
        manageEmployees(props.manager[0]?.user_email ?? props.manager.userEmail, (data) => {
            setEmployees(data);
        }, []);
    })

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setEmailSubmitted(false);
    }

    function handleAddUser(event) {
        event.preventDefault();
        setEmailSubmitted(true);
        manage(props.manager.userEmail, userEmail, setShowEmailErrorMsg);
    }

    const columns = useMemo(
        () => [
            {
                Header: "Users",
                columns: [
                    {
                        Header: "Name",
                        accessor: "user_name"
                    },
                    {
                        Header: "Email",
                        accessor: "user_email"
                    },
                    {
                        Header: "Phone number",
                        accessor: "user_phone"
                    }
                ]
            }
        ]
    );

    const headerLinks =
        [
            {
                to: "/home",
                value: "Home"
            }
        ]

    const navbarLinks =
        [
        ]

    const mainContent =
        <div className="usersMainContent">
            <Button value="+" handleClick={openModal} />

            <Modal
                isOpen={modalIsOpen}
                //onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className="modal"
            >
                <div className="modalContainer">
                    <a className="link modalLink" onClick={closeModal}>x</a>
                    {emailSubmitted ?
                        <div>
                            Email sent to user.
    </div>
                        :
                        <div className="mainModal">
                            <div>Enter the new user's email:</div>
                            <form>
                                <Input className="inputEmail" value={userEmail} handleChange={(event) => setUserEmail(event.target.value)} />
                                <Button className="formButton" value="Add user" handleClick={(event) => handleAddUser(event)} />
                                {!!showEmailErrorMsg && <Label value="Please enter a valid email" />}
                            </form>
                        </div>
                    }
                </div>
            </Modal>


            {
                employeesRef &&
                <div className="App">
                    <Table columns={columns} data={employeesRef.current} />
                </div>
            }
        </div >

    return (
        <Page mainContent={mainContent} headerLinks={headerLinks} />
    );
}