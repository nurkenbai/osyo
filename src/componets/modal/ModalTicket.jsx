import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {AirplaneType} from "../../utl/Componet";
import './ModalTicket.css';
import {getTicketByCliendId} from "../../utl/fetchFromAPI";
import {toast} from "react-toastify";

const ModalTicket = ({show, setShow, update, setUpdate, setClient, setShowTicket, client}) => {

    const [flightList, setFlightList] = useState([{name: ''}])
    const [flightLists, setFlightLists] = useState([{name: ''}])
    const [status, setStatus] = useState(0)
    const [optionsUpdate, setOptionsUpdate] = useState({value: '', name: 'Tanlang'});
    const [updates, setUpdates] = useState();
    const [ticket, setTicket] = useState({
        name: '',
        airPlane: '',
        seat: '',
        fromCountry: '',
        toCountry: '',
        airplaneType: 'BUSINESS',
        endTime: '',
        flightTime: '',
        flightList: flightList

    })

    useEffect(() => {

        if (client.id) {
            getTicketByCliendId(client.id).then((item) => {

                if (!item.isError) {

                    setTicket(item?.date)
                } else {
                    toast.warning(item?.message)
                }
            }).catch((item) => {
                toast.error("Server error")
            })
        }

    }, [client.id])


    const handleClose = () => {



        setShowTicket(false)
    };


    function save() {


        setClient({...client, ticket: ticket})


        setShow(true)
        setShowTicket(false)
    }

    function addList() {
        let count = 0;
        flightList.map((item) => {
            if (!item.name) {

                count = 1
            }
        })
        if (count === 0) {
            setOptionsUpdate({value: '', name: 'Tanlang'})
            setUpdates(undefined)
            setFlightList([...flightList, {name: ''}])

            setFlightLists([...flightList, {name: ''}])
            setStatus(flightList.length)
        }
    }

    const add = (e, ids) => {

        const {id, value} = e.target;

        const list = [...flightList];
        const lists = [...flightLists];
        list[ids]['name'] = value;
        setFlightList(list)
        lists[ids]['id'] = ids;
        lists[ids]['name'] = value;
        setFlightLists(lists)
        console.log("HESALOm")
        console.log(flightLists)
        console.log(flightList)
        setTicket({...ticket, flightList: flightList})
    }

    function onUpdate() {

        setClient({...client, ticket: ticket})

        setShow(true)
        setShowTicket(false)
    }


    function setOpen(e) {

        flightLists.map((item, index) => {
            if (item.name === e.target.value) {

                setUpdates(item);
            }

        })


    }

    const [options, setOptions] = useState({value: '', name: 'Tanlang'});
    useEffect(() => {
        AirplaneType.map((item) => {
            if (ticket.airplaneType === item.value) {
                setOptions(item)
            }

        }, [options])
    })


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket {!ticket.id ? 'add' : 'update'}</Modal.Title>
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
                                                  required="required"
                                                  autoFocus
                                                  value={ticket.name}
                                                  onChange={(e) => setTicket({...ticket, name: e.target.value})}

                                    />
                                </Form.Group>
                            </div>
                            <div style={{padding: '0 0 0 15%'}}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Air Plane</Form.Label>
                                    <Form.Control
                                        id="airPlane"
                                        type="text"
                                        placeholder="Enter  Air Plane..."
                                        required="required"
                                        autoFocus
                                        value={ticket.airPlane}
                                        onChange={(e) => setTicket({...ticket, airPlane: e.target.value})}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-2">
                            <Form.Label>Seat</Form.Label>
                            <Form.Control
                                id="seat"
                                type="text"
                                placeholder="Enter seat..."
                                required="required"
                                autoFocus
                                value={ticket.seat}
                                onChange={(e) => setTicket({...ticket, seat: e.target.value})}
                            />
                        </Form.Group>
                        <div style={{display: 'flex'}}>
                            <div>
                                <Form.Group className="mb-2">


                                    <Form.Label>From Country</Form.Label>
                                    <Form.Control
                                        id="fromCountry"
                                        type="text"
                                        placeholder="Enter from Country..."
                                        required="required"
                                        autoFocus
                                        value={ticket.fromCountry}
                                        onChange={(e) => setTicket({...ticket, fromCountry: e.target.value})}
                                    />

                                </Form.Group>
                            </div>
                            <div style={{padding: '0 0 0 15%'}}>
                                <Form.Group className="mb-2">
                                    <Form.Label>To Country</Form.Label>
                                    <Form.Control
                                        id="ToCountry"
                                        type="text"
                                        placeholder="Enter to Country..."
                                        required="required"
                                        autoFocus
                                        value={ticket.toCountry}
                                        onChange={(e) => setTicket({...ticket, toCountry: e.target.value})}
                                    />

                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-2">
                            <Form.Label>AirplaneType</Form.Label>

                            <select onChange={(e) => {
                                setTicket({...ticket, airplaneType: e.target.value})
                            }} className="form-select" aria-label="Default select example">
                                <option value={options?.value}>{options?.name}</option>
                                {AirplaneType.map((item) => {
                                    if (options.value !== item.value) {
                                        return (<option value={item.value}>{item.name}</option>)
                                    }

                                })}


                            </select>
                        </Form.Group>
                        <Form.Group className="mb-2">

                            <div style={{display: 'flex'}}>

                                <div>
                                    <Form.Label>AirplaneType</Form.Label>

                                    <div style={{width: '200px'}}>
                                        <select className="form-select" aria-label="Default select example"
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                    setOpen(e)
                                                    setOptionsUpdate({...optionsUpdate, name: e.target.value})
                                                    setTicket({...ticket, airplaneType: e.target.value})
                                                }}>
                                            <option>{optionsUpdate.name}</option>
                                            {flightList.map((item) => {
                                                if (item.name !== optionsUpdate.name) {
                                                    return (<option value={item.name}>{item.name}</option>)
                                                }

                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="plus">
                                    <div>
                                        <i onClick={() => {
                                            if (updates) {
                                                console.log("dsaasd")
                                                setUpdates(undefined);
                                                setOptionsUpdate({value: '', name: 'Tanlang'})
                                            } else {
                                                console.log("asdasd")
                                                addList()
                                            }
                                        }}
                                           className={!updates ? "fa fa-circle-plus text-green" : "fa-solid fa-circle-check text-red"}

                                           style={{fontSize: '30px'}}></i>
                                    </div>
                                </div>
                                <div style={{padding: '0 5px 10px 5px'}} className="col-6">
                                    {flightLists.map((item, index) => {

                                        if (index === status && !updates) {
                                            return (
                                                <>
                                                    <Form.Label>{flightList.length} To Country</Form.Label>
                                                    <Form.Control
                                                        id="name"
                                                        type="text"
                                                        required="required"
                                                        placeholder="Enter to Country..."
                                                        autoFocus
                                                        value={item.name}
                                                        onChange={(e) => add(e, index)}
                                                    />

                                                </>

                                            )
                                        } else if (index === updates?.id) {
                                            return (
                                                <>
                                                    <Form.Label>{updates?.id + 1} To Country</Form.Label>

                                                    <Form.Control
                                                        id="name"
                                                        type="text"
                                                        required="required"
                                                        placeholder="Enter to Country..."
                                                        autoFocus
                                                        value={updates?.name}
                                                        onChange={(e) => add(e, updates?.id)}
                                                    />


                                                </>
                                            )

                                        }

                                    })}

                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <div style={{display: 'flex'}}>
                                <div>
                                    <Form.Label>Flight time</Form.Label>
                                    <Form.Control
                                        id="flightTime"
                                        type="datetime-local"
                                        placeholder="Enter to Country..."
                                        autoFocus
                                        value={ticket.flightTime}
                                        onChange={(e) => setTicket({...ticket, flightTime: e.target.value})}
                                    />
                                </div>
                                <div style={{padding: '0 0 5px 15%'}}>
                                    <Form.Label>End time</Form.Label>
                                    <Form.Control
                                        id="endTime"
                                        type="datetime-local"
                                        placeholder="Enter to Country..."
                                        autoFocus
                                        value={ticket.endTime}
                                        onChange={(e) => setTicket({...ticket, endTime: e.target.value})}
                                    />

                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={!ticket.id ? save : onUpdate}>
                        {!ticket.id ? 'Save Changes' : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ModalTicket;