import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from "react";
import {Login, SingUp} from "./componets"
import 'bootstrap/dist/css/bootstrap.min.css'
import './componets/main/Main.css'
import SuperAdmin from "./componets/SuperAdmin";
import md5 from "md5";
import Admin from "./componets/Admin";
import {ToastContainer} from "react-toastify";
import Client from "./componets/client/Client";
import Manager from "./componets/Manager";

const App = () => {

    const chekig = localStorage.getItem(md5('token'))
    const role = localStorage.getItem(md5('role'))
    console.log(chekig)
    if (!chekig) {
        return (
            <><Router>
                <div className="app-main">
                    <div className="background">
                        <div className="shape"></div>
                        <div className="shape"></div>
                    </div>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route path="/sign-in" element={<Login/>}/>
                        <Route path="/sign-up" element={<SingUp/>}/>
                    </Routes>
                </div>


            </Router>
                <ToastContainer/>
            </>
        )
    }
    if (role === md5('ROLE_SUPER_ADMIN')) {
        return (<>     <SuperAdmin/><ToastContainer/></>)
    } else if (role === md5('ROLE_ADMIN')) {
        return (<>    <Admin/> <ToastContainer/></>)
    } else if (role === md5('ROLE_MANAGER')) {
        return (<><Manager/> <ToastContainer/></>)
    }


}

export default App;
