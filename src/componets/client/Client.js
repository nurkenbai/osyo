import React, {useEffect, useState} from 'react';
import {getClient} from "../../utl/fetchFromAPI";
import Loading from "../loading";
import ClientTable from "../table/ClientTable";
import ModalClient from "../modal/ModalClient";
import {toast} from "react-toastify";
import ModalTicket from "../modal/ModalTicket";
import ClientPagination from "../paginations/ClientPagination";
import ModalInfo from "../modal/ModalInfo"
import {useNavigate, useNavigation} from "react-router-dom";


const Client = ({optionals, filialIds}) => {

    const navigation = useNavigate();
    const [show, setShow] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [shutdown, setShutdown] = useState();
    const [search, setSearch] = useState(null);
    const [filialId, setFilialId] = useState(filialIds);
    const [clients, setClients] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const [client, setClient] = useState({
        id:'',
        name: '',
        surname: '',
        phone: '',
        price: '',
        gender: '',
        attachId: '',
        ticket: ''


    })


    const [updateTicket, setUpdateTicket] = useState();
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);


    useEffect(() => {

        getClient({text: search, filialId: filialId}, currentPage, 10)
            .then((item) => {

                console.log(item)
                setTotalPages(item.date.totalPages)
                setClients(item)
            })
            .catch((error) => {
                toast.error("Server ERROR")
                navigation('/error')
            });

        setShutdown(false)
    }, [shutdown]);

    if (!clients) return <Loading/>


    let selectCategory = window.location.pathname;
    selectCategory = selectCategory.charAt(1).toUpperCase() + selectCategory.substring(2);

    return (
        <main>
            <div className="main__container">
                <h1>{selectCategory}</h1>
                <div className="table-add">
                    <div className="buttons">
                        <button onClick={(openModal)} className="btn btn-primary">ADD</button>
                    </div>
                    <ClientTable clientTable={clients?.date?.dtoList} setUpdate={setClient}
                                 optionals={optionals} setShow={setShow} setShowInfo={setShowInfo}
                                 setShutdown={setShutdown} setSearch={setSearch} search={search} setFilialId={setFilialId}/>
                    <div className="page-item row">
                        <ClientPagination setCurrentPage={setCurrentPage} totalPages={totalPages}/>
                    </div>
                </div>
            </div>
            <ModalClient show={show} setShow={setShow} setClient={setClient} client={client}
                         setShutdown={setShutdown} setShowTicket={setShowTicket}
                         setUpdateTicket={setUpdateTicket}/>

            <ModalTicket show={showTicket} setShow={setShow} setUpdate={setUpdateTicket} update={updateTicket}
                         setClient={setClient} setShowTicket={setShowTicket} client={client}/>
            <ModalInfo show={showInfo} setShow={setShowInfo} setClient={setClient} client={client}/>
        </main>
    );
};

export default Client;