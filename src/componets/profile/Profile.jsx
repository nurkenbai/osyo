import React, {useEffect, useState} from 'react';
import ProfileTable from "../table/ProfileTable";
import ModalProfile from "../modal/ModalProfile";
import Loading from "../loading";
import './Profile.css'
import {getProfile} from "../../utl/fetchFromAPI";
import {toast} from "react-toastify";

const Profile = ({optionals, optionalList}) => {
    const [show, setShow] = useState(false);
    const [shutdown, setShutdown] = useState();
    const [profiles, setProfiles] = useState();

    const [optional, setOptional] = useState(optionals);
    const [update, setUpdate] = useState();
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);


    useEffect(() => {
        getProfile({role: optional,})
            .then((item) => {

                console.log(item)
                setProfiles(item.date)
            }).catch((error) => {

            toast.error('Server ERROR')
        });


    }, [optional, shutdown]);

    if (!profiles) return <Loading/>


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
                    <ProfileTable profileTable={profiles} setUpdate={setUpdate} optionalList={optionalList}
                                  optional={optional}
                                  setOptional={setOptional} optionals={optionals} setShow={setShow}
                                  setShutdown={setShutdown}/>

                </div>
            </div>
            <ModalProfile show={show} setShow={setShow} setUpdate={setUpdate} update={update}
                          setShutdown={setShutdown} current={optionals}/>
        </main>
    );
};

export default Profile;