import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {filialSave, filialUpdate} from "../../utl/fetchFromAPI";
import {toast} from "react-toastify";


const ModalFilial = ({show, setShow, filial, setFilial, setShutdown}) => {


    const [filials, setFilials] = useState({
        id: filial?.id ? "" : filial?.id,
        name: filial?.name ? "" : filial?.name,
        status: filial?.status ? 'NOT_ACTIVE' : filial?.status
    });

    useEffect(() => {
        if (filial) {

            setFilials(filial);
        }
    }, [filial])


    const handleClose = () => {


        setShutdown(true)

        setShow(false);


    };


    function save() {

        filialSave(filials)
            .then((item) => {

                if (!item.isError) {
                    toast.success(item.message)

                } else {
                    toast.warning(item.message)
                }
            })
            .catch((eror) => {
                toast.error("Server ERROR")
            })
        setShutdown(true)
        setShow(false)
    }

    function onUpdate() {

        filialUpdate(filials, filials.id)
            .then((item) => {
                setShutdown(true)
                if (!item.isError) {
                    toast.success(item.message)

                } else {
                    toast.warning(item.message)
                }
            })
            .catch((eror) => {
                toast.error("Server ERROR")
            })
        setShutdown(true)
        setShow(false)

    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filial {!filials.id ? 'add' : 'update'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name..."
                                autoFocus
                                value={filials.name}
                                onChange={(t) => setFilials({...filials, name: t.target.value})
                                }

                            />
                            <Form.Label>{filials.status === 'NOT_ACTIVE' ? "ACTIVE" : 'NOT ACTIVE'}</Form.Label>
                            <Form.Check
                                type="checkbox"

                                checked={filials.status === 'NOT_ACTIVE'}
                                name="status"
                                value={filials.status === 'NOT_ACTIVE' ? "ACTIVE" : 'NOT_ACTIVE'}

                                onChange={(t) => {
                                    console.log(t.target.value)
                                    setFilials({...filials, status: t.target.value})
                                }}/>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={!filials.id ? save : onUpdate}>
                        {!filials.id ? 'Save Changes' : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ModalFilial;