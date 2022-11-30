import React, {useState} from 'react';
import "./Sidebar.css"
import logo from "../../assets/osyo.png"
import {categoriesSuperAdmin} from "../../utl/Componet";
import Loading from "../loading";

const Sidebar = ({sidebarOpen, closeSidebar, categoryList}) => {
    const [category, setCategory] = useState([]);


    if (!category) return <Loading/>


    let selectCategory = window.location.pathname;
    return (
        <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img className="sidebar__logo" src={logo} alt="logo"/>
                    <h1>OSYO</h1>
                </div>
                <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}></i>
            </div>


            {categoryList?.map((item,id) => {
                return (
                    <div
                        className={selectCategory === item?.key ? "sidebar__link active_menu_link" : "sidebar__link"}>
                        <i className={item?.icon}></i>
                        <a href={item?.key}>{item?.name}</a>
                    </div>
                )
            })}


        </div>
    )
        ;
};

export default Sidebar;