import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main, Navbar, Sidebar} from "./index";
import Profile from "./profile/Profile";
import {categoriesAdmin, optionalsAdmin} from "../utl/Componet";
import Error500 from "./error/500";
import Client from "./client/Client";

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const profile = localStorage.getItem('role')


    const openSidebar = () => {
        setSidebarOpen(true)
    }
    const closeSidebar = () => {
        setSidebarOpen(false)
    }
    return (
        <div className="containers">
            <BrowserRouter>
                <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/profile"
                           element={<Profile optionals={"ROLE_MANAGER"} optionalList={optionalsAdmin}/>}/>
                    <Route path="/client" element={<Client filialIds={null}/>}/>
                    <Route path="/error" element={<Error500/>}/>
                </Routes>
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}
                         categoryList={categoriesAdmin}/>

            </BrowserRouter>
        </div>
    );
};

export default Admin;