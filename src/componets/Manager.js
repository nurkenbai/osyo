import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar, Sidebar} from "./index";
import {categoriesManager} from "../utl/Componet";
import error500 from "./error/500";
import Client from "./client/Client";
import Error500 from "./error/500";

const Manager = () => {
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
                    <Route exact path="/" element={<Client role="ROLE_MANAGER"/>}/>

                    <Route path="/error" element={<Error500/>}/>
                </Routes>
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}
                         categoryList={categoriesManager}/>

            </BrowserRouter>
        </div>
    );
};

export default Manager;