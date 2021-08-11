import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import Table from "../Components/Table";
import { getItems, deleteItem, addItem, setItemInBakery } from '../scripts/manageItems';
import LoggedInPage from '../Components/LoggedInPage';
import UserContext from '../UserContext';
import Modal from 'react-modal';
import Button from '../Components/Button';
import Form from '../Components/Form';
import Select from 'react-select';


export default function Items(props) {
    const [items, setItems] = useState([]);
    const itemsRef = useRef(items);
    itemsRef.current = items;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [itemAdded, setItemAdded] = useState(false);
    const [item, setItem] = useState(
        {
            item_id: "",
            item: "",
            description: "",
            price: "",
            cost: "",
            category: ""
        }
    )
    const [category, setCategory] = useState("")
    const [isNewItemModal, setIsNewItemModal] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ensureDeleteModalIsOpen, setEnsureDeleteModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        getItems(loggedInUser.bakery_id, (data) => {
            setItems(data);
        });
    }, [items.length, itemAdded]);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setItem(
            {
                item_id: "",
                item: "",
                description: "",
                price: "",
                cost: "",
                category: ""
            }
        );
        setModalIsOpen(false);
    }

    function handleDeleteItems(item) {
        setSelectedItem(item);
        setEnsureDeleteModalIsOpen(true);
    }

    function handleEditItem(item) {
        setItem({
            item_id: item.item_id,
            item: item.item,
            description: item.description,
            price: item.price,
            cost: item.cost,
            category: item.category
        })
        setIsNewItemModal(false);
        openModal();
    }

    function editItem() {
        setItemInBakery(item);
        setItemAdded(!itemAdded);
        setItems([]);
        closeModal();
    }

    function handleAddItem() {
        console.log(selectedFile)
        addItem(loggedInUser.bakery_id, item, selectedFile);
        setItemAdded(!itemAdded);
        setItems([]);
        closeModal();
    }

    function onFileChange(event) {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            // event.target.files[0].name
        );
        console.log("form data", formData)
        // setItem({ ...item, item_img: selectedFile });
    };

    console.log(selectedFile)

    function onFileUpload() {
        const formData = new FormData();
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // console.log(formData);

        //axios.post("api/uploadfile", formData); 
    };

    const deleteModal =
        <Modal
            isOpen={ensureDeleteModalIsOpen}
            onRequestClose={() => setEnsureDeleteModalIsOpen(false)}
            ariaHideApp={false}
            contentLabel="Example Modal"
            className="modal"
        >
            <div className="modalContainer">
                Are you sure you want to delete this item?
                <div>
                    <Button
                        value="Delete"
                        handleClick={() => {
                            deleteItem(loggedInUser.bakery_id, selectedItem);
                            setItems([]);
                            setEnsureDeleteModalIsOpen(false);
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
                Header: "Item",
                accessor: "item"
            },
            {
                Header: "Description",
                accessor: "description"
            },
            {
                Header: "Price",
                accessor: "price"
            },
            {
                Header: "Category",
                accessor: "category"
            }
        ]
    );

    const categories = [
        {
            label: 'bread',
            value: 'bread'
        },
        {
            label: 'sweet pastry',
            value: 'sweet pastry'
        },
        {
            label: 'salty pastry',
            value: 'salty pastry'
        },
        {
            label: 'cake',
            value: 'cake'
        },
        {
            label: 'cookie',
            value: 'cookie'
        },
        {
            label: 'desert',
            value: 'desert'
        },
        {
            label: 'pie',
            value: 'pie'
        },
    ]

    const fields =
        [
            {
                type: "input",
                inputType: "text",
                value: item.item,
                onChange: (event) => {
                    setItem({ ...item, item: event.target.value });
                },
                placeholder: "Item",
            },
            {
                type: "input",
                inputType: "text",
                value: item.description,
                onChange: (event) => {
                    setItem({ ...item, description: event.target.value });
                },
                placeholder: "Description",
            },
            {
                type: "input",
                inputType: "text",
                value: item.price,
                onChange: (event) => {
                    setItem({ ...item, price: event.target.value });
                },
                placeholder: "Price",
            },
            {
                type: "input",
                inputType: "text",
                value: item.cost,
                onChange: (event) => {
                    setItem({ ...item, cost: event.target.value });
                },
                placeholder: "Cost",
            },
            {
                type: "select",
                options: categories,
                defaultValue: item.category,
                onChange: (name) => setItem({ ...item, category: name.value })
            },
            {
                type: "file",
                file: selectedFile,
                onChange: onFileChange,
                onClick: onFileUpload,
                fileData: () => {
                    if (selectedFile) {
                        return (
                            <div>
                                <h2>File Details:</h2>
                                <p>File Name: {this.state.selectedFile.name}</p>
                                <p>File Type: {this.state.selectedFile.type}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <br />
                                <h4>Choose before Pressing the Upload button</h4>
                            </div>
                        );
                    }
                }
            },
            {
                type: "button",
                value: isNewItemModal ? "Add item" : "Edit",
                onClick: isNewItemModal ? handleAddItem : editItem
            }
        ]

    const mainContent =
        <div className="tableMainContent">
            {deleteModal}

            <Button
                className="addNewItem"
                value="+"
                handleClick={() => {
                    setIsNewItemModal(true);
                    openModal();
                }
                }
            />

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
                    <div className="mainModal">
                        {isNewItemModal ?
                            <div>Enter the new item's details:</div> :
                            <div>Edit item:</div>
                        }
                        <Form fields={fields} />
                    </div>
                </div>
            </Modal>
            {
                itemsRef &&
                <div className="App">
                    <Table
                        columns={columns}
                        data={itemsRef.current}
                        handleClick={(item) => handleDeleteItems(item)}
                        handleEdit={(item) => handleEditItem(item)}
                        databaseColumn="item"
                    />
                </div>
            }
        </div >

    return (
        <LoggedInPage mainContent={mainContent} activatedPage="Items" />
    );
}