import React from 'react';
import './FilialTable.css'
import {deleteFilialById, getFilialById} from "../../utl/fetchFromAPI";
import {toast} from "react-toastify";

const FilialTable = ({filialTable, setUpdate, setShow,setShutdown}) => {

    console.log(filialTable)


    const onDelete = (id) => {
        console.log(id)
        deleteFilialById(id)
            .then((item) => {
                console.log(item)
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
        console.log(item)
        setUpdate(item)
        setShow(true)

    }
    return (
        <div className="container mte-5 px-2">

            <div className="mb-2 d-flex justify-content-between align-items-center">

                <div className="position-relative">
                    <span className="position-absolute search"><i className="fa fa-search"></i></span>
                    <input className="form-control w-100" placeholder="Search by order#, name..."/>
                </div>



            </div>
            <div className="table-responsive">
                <table className="table table-responsive table-borderless">

                    <thead>
                    <tr className="bg-light">

                        <th scope="col" width="5%">№</th>
                        <th scope="col" width="10%">name</th>
                        <th scope="col" width="10%">Status</th>
                        <th scope="col" className="text-end" width="10%"><span>Revenue</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filialTable.map((item, id) => {
                        return (
                            <tr>
                                <td>{id + 1}</td>
                                <td>{item.name}</td>
                                <td><i
                                    className={item.status === 'ACTIVE' ? "fa fa-check-circle-o green" : "fa fa-times-circle-o red"}></i>
                                </td>
                                <td className="text-end"><span className="fw-bolder"></span>
                                    <i className="fa fa-trash" style={{margin: '10px'}}
                                       aria-hidden="true" onClick={() => onDelete(item.id)}></i>
                                    <i className="fa fa-pencil" aria-hidden="true"
                                       onClick={() => onUpdate(item)}></i>

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

export default FilialTable;