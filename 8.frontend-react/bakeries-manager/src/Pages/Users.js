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
    const [ensureDeleteModalIsOpen, setEnsureDeleteModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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
        manage(loggedInUser.user_email, userEmail, setShowEmailErrorMsg);
    }

    function handleDeleteUser(userEmail) {
        setEnsureDeleteModalIsOpen(true);
        setSelectedUser(userEmail);
    }

    const deleteModal =
        <Modal
            isOpen={ensureDeleteModalIsOpen}
            onRequestClose={() => setEnsureDeleteModalIsOpen(false)}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer">
                Are you sure you want to delete this user?
                <div className="modalOptions">
                    <Button
                        value="Delete"
                        handleClick={() => {
                            deleteUser(selectedUser.user_email);
                            setEmployees([]);
                            setEnsureDeleteModalIsOpen(false)
                        }
                        }
                    />
                    <Button
                        value="Cancel"
                        handleClick={() => setEnsureDeleteModalIsOpen(false)}
                    />
                </div>
            </div>
        </Modal>

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
        <div className="tableMainContent">
            {deleteModal}

            <Button className="addNewUser" value="+" handleClick={openModal} />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className="modal newUserModal"
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
                                <Input className="inputEmail newUserEmail" value={userEmail} handleChange={(event) => setUserEmail(event.target.value)} />
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
                        hideEdit={true}
                    />
                </div>
            }
        </div >

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Users" />
    );
}