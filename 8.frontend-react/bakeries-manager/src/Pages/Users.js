import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import Modal from 'react-modal';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Label from '../Components/Label';
import Table from "../Components/Table";
import manage from '../scripts/manageAddUser';
import { getUsers, deleteUser } from '../scripts/manageUsers';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';

export default function Users(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [employees, setEmployees] = useState([]);
    const employeesRef = useRef(employees);
    employeesRef.current = employees;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        getUsers(loggedInUser.user_email, (data) => {
            setEmployees(data);
        });
    }, [employees.length])

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

    function handleDeleteUser(userEmail) {
        deleteUser(userEmail);
    }

    const columns = useMemo(
        () => [
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
    );

    const mainContent =
        <div className="usersMainContent">
            <Button className="addNewUser" value="+" handleClick={openModal} />

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
                    <Table
                        columns={columns}
                        data={employeesRef.current}
                        handleClick={(userEmail) => handleDeleteUser(userEmail)}
                        databaseColumn="user_email"

                    />
                </div>
            }
        </div >

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Users" />
    );
}