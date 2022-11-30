import React, {useEffect, useState} from 'react';
import './ProfileTable.css'
import {deleteClientById, getFilial} from "../../utl/fetchFromAPI";
import DeleteIcon from "../DeleteIcon";
import md5 from "md5";
import {toast} from "react-toastify";

const ClientTable = ({
                         clientTable,
                         setUpdate,
                         setShow,
                         setShutdown,
                         optionals,
                         setSearch,
                         search,
                         setShowInfo,
                         setFilialId
                     }) => {

    const [filial, setFilial] = useState([]);
    const onDelete = (id) => {
        deleteClientById(id)
            .then((item) => {
                if (item) {
                    toast.success("Successful")
                } else {
                    toast.warning("Not Successful")
                }
            })
            .catch((eror) => {
                toast.error("Server error")
            })
        setShutdown(true)
    }
    const onUpdate = (item) => {

        setUpdate(item);
        setShow(true)

    }
    useEffect(() => {
        if (localStorage.getItem(md5('role')) === md5('ROLE_SUPER_ADMIN')) {
            getFilial().then((item) => {
                console.log(item)
                setFilial(item.date)
            }).catch((error) => {
                toast.error("Server error")
            })
        }

    }, [])
    const open = (e) => {
        setUpdate(e)
        setShowInfo(true)
    };
    return (
        <div className="container mte-5 px-2">

            <div className="mb-2 d-flex justify-content-between align-items-center">
                <div className="position-relative">
                    <span className="position-absolute search"><i className="fa fa-search"></i></span>
                    <input className="form-control w-100" value={search} onChange={(e) => {
                        setShutdown(true)
                        setSearch(e.target.value)
                    }} placeholder="Search by order#, name..."/>
                </div>

                <div className="px-2">
                    <select className="select" onChange={(e) => setFilialId(e.target.value)} name="cars" id="cars">

                        <option value='{item.key}'>Tanlang...</option>
                        {filial.map((item, index) => {
                            return (<option value={item.id}> {item.name}</option>)
                        })


                        }

                    < /select>
                </div>

            </div>
            <div className="table-responsive">
                <table className="table table-responsive table-borderless">

                    <thead>
                    <tr className="bg-light">

                        <th scope="col" width="5%">№</th>
                        <th scope="col" width="10%">name</th>
                        <th scope="col" width="10%">Surname</th>
                        <th scope="col" width="10%">Phone</th>

                        <th scope="col" width="10%">Pris</th>
                        <th scope="col" width="10%">Gender</th>
                        <th scope="col" width="10%">Info</th>

                        <th scope="col" className="text-end" width="10%"><span>Revenue</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientTable.map((item, id) => {
                        return (
                            <tr>
                                <td>{id + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.phone} </td>

                                <td>{item.price}</td>
                                <td>{item.gender}</td>
                                <td><i className="fa fa-info" onClick={() => {
                                    open(item)
                                    console.log("asdas")
                                }} style={{
                                    textAlign: 'center',
                                    borderRadius: '100%',
                                    backgroundColor: '#0c1ee5',
                                    background: '#3ed0d5',
                                    width: '20px',
                                    height: '20px'
                                }}></i>
                                </td>
                                <td className="text-end"><span className="fw-bolder"></span>
                                    {localStorage.getItem(md5('role')) === md5('ROLE_MANAGER') ?
                                        <DeleteIcon onDelete={onDelete} item={item} onUpdate={onUpdate}/> : ''}


                                </td>
                            </tr>
                        )
                    })}


                    </tbody>
                </table>

            </div>
        </div>


    );
};

export default ClientTable;