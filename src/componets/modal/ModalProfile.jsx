import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {getFilial, profileSave, profileUpdate} from "../../utl/fetchFromAPI";
import Loading from "../loading";
import {toast} from "react-toastify";
import md5 from "md5";


const ModalProfile = ({show, setShow, optionals, update, setUpdate, setShutdown}) => {
    const [filial, setFilial] = useState([]);
    const [choose, setСhoose] = useState('Tanlang');
    const [profile, setProfile] = useState({
        username: '',
        fullName: '',
        password: '',
        phone: '',
        role: optionals,
        filialId: ''

    })
    useEffect(() => {
        if (update) {

            setProfile(update);
        }
    }, [update])

    useEffect(() => {
        if (localStorage.getItem(md5('role')) === md5('ROLE_SUPER_ADMIN')) {
            getFilial().then((item) => {

                setFilial(item.date)
            }).catch((error) => {
                toast.error(error)
            })
        }

    }, [])

    const handleClose = () => {


        setShow(false)
    };


    function save() {


        console.log(profile)
        profileSave(profile).then((item) => {
            console.log(profile)
            if (!item.isError) {
                toast.success(item.message)
                setShutdown(true)
            } else {
                toast.warning(item.message)
            }
        }).catch((error) => {
            toast.error("Server ERROR")
        })

        setShutdown(true)
        setShow(false);
    }

    function onUpdate() {


        profileUpdate(profile, profile.id).then((item) => {
            if (!item.isError) {

                toast.success(item.message)

            } else {
                toast.warning(item.message)
            }
        }).catch((error) => {
            toast.error("Server ERROR")
        })
        setShutdown(true)
        setShow(false);
    }


    useEffect(() => {
        if (profile.filialId) {

            filial.map((item) => {
                if (item.id === profile.filialId) {
                    setСhoose(item.name)
                }
            })

        }
    })
    if (!filial) return <Loading/>

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile {!profile.id ? 'add' : 'update'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control id="username"
                                          type="text"
                                          placeholder="Enter username..."

                                          autoFocus
                                          value={profile.username}
                                          onChange={(e) => setProfile({...profile, username: e.target.value})}

                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                id="fullName"
                                type="text"
                                placeholder="Enter full name..."
                                autoFocus
                                value={profile.fullName}
                                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                id="phone"
                                type="text"
                                placeholder="Enter phone..."
                                autoFocus
                                value={profile.phone}
                                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                id="password"
                                type="password"
                                placeholder="Enter password..."
                                autoFocus
                                value={profile.password}
                                onChange={(e) => setProfile({...profile, password: e.target.value})}
                            />
                        </Form.Group>
                        {optionals !== "ROLE_MANAGER" ? <Form.Group className="mb-2">
                            <Form.Label>Organization filial</Form.Label>
                            <select onChange={(e) => {

                                setProfile({...profile, filialId: e.target.value})
                            }} className="form-select" aria-label="Default select example">

                                <option>{choose}</option>
                                {filial.map((item, id) => {
                                    if (profile.filialId !== item.id) {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    }

                                })}
                            </select>
                        </Form.Group> : null}


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={!profile.id ? save : onUpdate}>
                        {!profile.id ? 'Save Changes' : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ModalProfile;