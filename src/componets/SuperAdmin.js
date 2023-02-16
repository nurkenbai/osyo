import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main, Navbar, Sidebar} from "./index";
import Profile from "./profile/Profile";
import Filial from "./filial/Filial";
import {categoriesSuperAdmin, optionalsSupeAdmin} from "../utl/Componet";
import Client from "./client/Client";
import Error500 from "./error/500";

const SuperAdmin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);





    const openSidebar = () => {
        setSidebarOpen(true)
    }
    const closeSidebar = () => {
        setSidebarOpen(false)
    }
    console.log("Hello admin")
    return (
        <>
            <div className="containers">
                <BrowserRouter>
                    <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
                    <Routes>
                        <Route exact path="/" element={<Main/>}/>
                        <Route path="/profile"
                               element={<Profile optionals={"ROLE_ADMIN"}
                                                 optionalList={optionalsSupeAdmin}/>}/>
                        <Route path="/filial" element={<Filial/>}/>
                        <Route path="/client" element={<Client/>}/>
                        <Route path="/error" element={<Error500/>}/>
                    </Routes>
                    <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}
                             categoryList={categoriesSuperAdmin}/>

                </BrowserRouter>

            </div>


        </>
    );
};

export default SuperAdmin;