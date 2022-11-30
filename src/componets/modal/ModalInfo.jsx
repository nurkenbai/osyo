import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {file, getFilialById, getTicketByCliendId, profileUpdate} from "../../utl/fetchFromAPI";
import Loading from "../loading";
import {toast} from "react-toastify";
import './ModalInfo.css'

const ModalInfo = ({show, setShow, update, setUpdate, setShutdown, setClient, client}) => {
        const [filial, setFilial] = useState([]);
        // return (<p></p>)
        const [ticket, setTicket] = useState()
        useEffect(() => {
            if (update) {

                setClient(update);
            }
        }, [update])


        const handleClose = () => {
            const newProfile = {
                id:'',
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


        }, [options]);

        useEffect(() => {

            console.log(client)
            if (client.id) {
                getFilialById(client?.filialId)
                    .then((item) => {
                        console.log(item)
                        if (!item.isError) {
                            setFilial(item.date)
                        } else {
                            toast.warning(item.message)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        toast.error("Server ERROR")
                    })
                getTicketByCliendId(client.id).then((item) => {
                    console.log(item)
                    if (!item.isError) {

                        setTicket(item?.date)
                    } else {
                        toast.warning(item?.message)
                    }
                }).catch((item) => {
                    console.log(item)
                    toast.error("Server error")
                })

                console.log(filial)
            }

        }, [client]);

        const onChangeFileHandler = event => {
            const data = new FormData();
            data.append('file', event.target.files[0]);
            file(data).then((data) => {
                console.log(data)
                setClient({...client, photoId: data.date[0].id});
            });
        }
        if (!filial) return <Loading/>

        return (
            <>
                <Modal
                    aria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose}>

                    <div style={{padding: '0!important'}} className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <Modal.Header closeButton>
                                <Modal.Title>Info</Modal.Title>
                            </Modal.Header>

                            <div className="modal-body justify-content-center">
                                <div className="col-md-2">

                                    <div className="p-lg-1" style={{display: 'flex', width: '30vw', maxHeight: '70vh'}}>

                                        <div className="profile col-6">

                                            <img src={client?.attachDTO?.url} style={{width: "100%", height: '100%'}}
                                                 className="rounded-circle img-thumbnail"/>

                                            <span
                                                className="d-block mt-3 font-weight-bold">{client?.surname + '.' + client?.name}</span>

                                        </div>

                                        <div className="about-doctor">

                                            <table className="table table-borderless">

                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                            <span className="heading d-block">Gender</span>
                                                            <span
                                                                className="subheadings">{client?.gender}</span>


                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="d-flex flex-column">

                                                            <span className="heading d-block">Phone</span>
                                                            <span
                                                                className="subheadings">{client?.phone}</span>


                                                        </div>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                                        <span
                                                                            className="heading d-block">Organisation</span>
                                                            <span className="subheadings">{filial?.name}</span>


                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                                        <span
                                                                            className="heading d-block">price</span>
                                                            <span className="subheadings">{client?.price}</span>


                                                        </div>
                                                    </td>


                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>

                                </div>
                                <div className="row g-0 col-12 justify-content-center">

                                    <div className=" col-12">

                                        <div className="status p-2 pt-5">

                                            <table className="table table-borderless ">

                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                            <span className="heading d-block">Name</span>
                                                            <span className="subheadings">{ticket?.name}</span>


                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                            <span className="heading d-block">Flight Time</span>
                                                            <span className="subheadings">{ticket?.flightTime}</span>


                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                            <span className="heading d-block">End Time</span>
                                                            <span className="subheadings">{ticket?.endTime}</span>


                                                        </div>
                                                    </td>

                                                </tr>
                                                <tr>

                                                    <td>
                                                        <div className="d-flex flex-column">

                                                            <span className="heading d-block">Seat</span>
                                                            <span className="subheadings">{ticket?.seat}</span>


                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                                    <span
                                                                        className="heading d-block">From Country</span>
                                                            <span className="subheadings">{ticket?.fromCountry}</span>


                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">

                                                                    <span
                                                                        className="heading d-block">toCountry</span>
                                                            <span className="subheadings">{ticket?.toCountry}</span>
                                                        </div>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width:"200px"}}>
                                                        <div className="d-flex flex-column">
                                                            <span className="heading d-block">Airplane Type</span>

                                                            <span className="subheadings">{ticket?.airplaneType}</span>


                                                        </div>
                                                    </td>

                                                    <td colSpan="4">

                                                        <div className="d-flex flex-column">
                                                                    <span
                                                                        className="heading d-block">Air Plane</span>
                                                            <span className="subheadings">{ticket?.airPlane}</span>
                                                        </div>
                                                    </td>


                                                </tr>

                                                <tr>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                            <span className="heading d-block">flightList</span>
                                                            {ticket?.flightList.map((item, index) => {
                                                                return (
                                                                    <div>
                                                                    <span className="d-block subheadings">{item?.name}<i
                                                                        className="fa-solid fa-arrow-down p-2"></i></span>

                                                                    </div>
                                                                )
                                                            })}


                                                        </div>
                                                    </td>


                                                </tr>
                                                </tbody>
                                            </table>


                                        </div>


                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>


                </Modal>
            </>
        )
    }
;

export default ModalInfo;