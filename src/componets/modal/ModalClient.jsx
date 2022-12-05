import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {clientSave, file, profileUpdate} from "../../utl/fetchFromAPI";
import {toast} from "react-toastify";
import {gender} from "../../utl/Componet";
import Loading from "../loading";


const ModalClient = ({show, setShow, client, setClient, setShutdown, setShowTicket}) => {

        const [examination, setExamination] = useState(false);
        const handleClose = () => {
            const newProfile = {
                name: '',
                surname: '',
                phone: '',
                price: '',
                gender: '',
                attachId: '',
                ticket: ''

            }
            setClient(newProfile)
            setShow(false)
        };


        function save() {

            console.log("HEllo")
            console.log(client)

            clientSave(client).then((item) => {
                console.log(item)
                if (!item.isError) {
                    toast.success(item.message)

                } else {
                    toast.warning(item.message)
                }
            }).catch((error) => {
                toast.error("SERVER ERROR")
            });
            setShutdown(true)
            setShow(false);
        }

        function onUpdate() {


            profileUpdate(client, client.id).then((item) => {
                if (item.isError) {

                    toast.success(item.message)

                } else {
                    toast.warning(item.message)

                }
            }).catch((error) => {
                toast.error("SERVER ERROR")

            })
            setShutdown(true)
            setShow(false);
        }

        const [options, setOptions] = useState({value: '', name: 'Tanlang'});
        useEffect(() => {
            gender.map((item) => {
                if (client.gender === item.value) {
                    setOptions(item)
                }
            }, [options])


        })

        const onChangeFileHandler = event => {
            setExamination(true);
            const data = new FormData();
            console.log(event.target.files[0])
            data.append('file', event.target.files[0]);
            file(data).then((data) => {
                console.log(data)
                setExamination(false)
                toast.success("Successfully")
                setClient({...client, attachId: data.date[0].id});
            });
        }
        if (examination) return (<Modal show={show} onHide={handleClose}><Loading/></Modal>)

        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Client {!client.id ? 'add' : 'update'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div style={{display: 'flex'}}>
                                <div>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control id="name"
                                                      type="text"
                                                      placeholder="Enter name..."

                                                      autoFocus
                                                      value={client.name}
                                                      onChange={(e) => setClient({...client, name: e.target.value})}

                                        />
                                    </Form.Group>
                                </div>
                                <div style={{padding: '0 0 0 15%'}}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control
                                            id="surname"
                                            type="text"
                                            placeholder="Enter  surname..."
                                            autoFocus
                                            value={client.surname}
                                            onChange={(e) => setClient({...client, surname: e.target.value})}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <div>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            id="phone"
                                            type="tel"
                                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            placeholder="Enter phone..."
                                            autoFocus
                                            value={client.phone}
                                            onChange={(e) => setClient({...client, phone: e.target.value})}
                                        />
                                    </Form.Group>
                                </div>
                                <div style={{padding: '0 0 0 15%'}}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            id="price"
                                            type="number"
                                            placeholder="Enter price..."
                                            autoFocus
                                            value={client.price}
                                            onChange={(e) => setClient({...client, price: e.target.value})}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Group className="mb-2">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control
                                    id="photo"
                                    type="file"
                                    placeholder="file"
                                    autoFocus
                                    accept="image/*"
                                    onChange={(e) => {
                                        console.log(e)
                                        onChangeFileHandler(e)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Gender</Form.Label>
                                <select onChange={(e) => {
                                    setClient({...client, gender: e.target.value})
                                }} className="form-select" aria-label="Default select example">
                                    <option value={options?.value}>{options?.name}</option>
                                    {gender.map((item) => {


                                        if (client.gender !== item.value) {
                                            return (<option value={item.value}>{item.name}</option>)
                                        }
                                    })}


                                </select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Ticket</Form.Label>
                                <div>
                                    <i onClick={() => {

                                        setShowTicket(true)
                                        setShow(false)
                                    }} className="fa fa-circle-plus text-green"
                                       style={{fontSize: '30px'}}></i>
                                </div>
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={!client.id ? save : onUpdate}>
                            {!client.id ? 'Save Changes' : "Update"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
;

export default ModalClient;