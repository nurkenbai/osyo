import React, {useEffect, useState} from 'react';
import {getFilial} from "../../utl/fetchFromAPI";
import Loading from "../loading";
import FilialTable from "../table/FilialTable";
import ModalFilial from "../modal/ModalFilial";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Filial = () => {
    const navigation = useNavigate();
    const [show, setShow] = useState(false);
    const [shutdown, setShutdown] = useState(false);

    const [filials, setFilials] = useState();
    const [update, setUpdate] = useState();
    const openModal = () => {

        setShow(true);
    }
    const closeModal = () => setShow(false);
    console.log("HELLO")
    useEffect(() => {
        getFilial()
            .then((item) => {
                if (!item.isError) {
                    setFilials(item.date)
                } else {
                    toast.warning(item.message)
                }
            })
            .catch((error) => {
                toast.error("SERVER ERROR")
                // navigation('/error')
            });
        setShutdown(false)
    }, [shutdown])

    console.log(filials)
    if (!filials) return <Loading/>


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
                    <FilialTable filialTable={filials} setUpdate={setUpdate} setShow={setShow}
                                 setShutdown={setShutdown}/>

                </div>
            </div>
            {show ? <ModalFilial show={show} setShow={setShow} filial={update} setFilial={setUpdate} setShutdown={setShutdown}/>:null}

        </main>
    );
};

export default Filial;