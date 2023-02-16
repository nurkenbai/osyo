import React from 'react';
import './ProfileTable.css'
import {deleteProfileById} from "../../utl/fetchFromAPI";
import DeleteIcon from "../DeleteIcon";
import {toast} from "react-toastify";

const ProfileTable = ({
                          profileTable,
                          setUpdate,
                          setOptional,
                          setShow,
                          setShutdown,
                          optionalList,
                          optionals,
                          optional
                      }) => {


    const onDelete = (id) => {
        deleteProfileById(id)
            .then((item) => {
                if (item) {
                    toast.success("Successful")
                    setShutdown(true)
                } else {
                    toast.warning("Not Successful")
                    setShutdown(true)

                }
            })
            .catch((eror) => {
                toast.error("Server error")

            })

    }
    const onUpdate = (item) => {

        setUpdate(item);
        setShutdown(true)

    }
    return (
        <div className="container mte-5 px-2">

            <div className="mb-2 d-flex justify-content-between align-items-center">
                <div className="position-relative">
                    <span className="position-absolute search"><i className="fa fa-search"></i></span>
                    <input className="form-control w-100" placeholder="Search by order#, name..."/>
                </div>

                <div className="px-2">
                    <select className="select" onChange={(e) => setOptional(e.target.value)} name="cars" id="cars">
                        {optionalList.map((item) => {
                            return (<option value={item.key}>{item.name}</option>)
                        })}


                    < /select>
                </div>

            </div>
            <div className="table-responsive">
                <table className="table table-responsive table-borderless">

                    <thead>
                    <tr className="bg-light">

                        <th scope="col" width="5%">№</th>
                        <th scope="col" width="10%">username</th>
                        <th scope="col" width="10%">Full Name</th>
                        <th scope="col" width="10%">Phone</th>
                        <th scope="col" width="10%">Organization filial</th>
                        <th scope="col" width="10%">Role</th>
                        <th scope="col" className="text-end" width="10%"><span>Revenue</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {profileTable.map((item, id) => {
                        return (
                            <tr>
                                <td>{id + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.fullName}
                                </td>
                                <td>{item.phone} </td>
                                <td>{item.filialName} </td>
                                <td>
                                    {item.role === 'ROLE_ADMIN' ? "Admin" : "Manager"}
                                </td>
                                <td className="text-end"><span className="fw-bolder"></span>
                                    {optionals === optional ?
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

export default ProfileTable;