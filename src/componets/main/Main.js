import "./Main.css";
import hello from "../../assets/hello.svg";
import {useEffect, useState} from "react";
import {getMain} from "../../utl/fetchFromAPI";
import Loading from "../loading";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const [count, setCount] = useState();
    const navigation = useNavigate();
    useEffect(() => {
        getMain().then((item) => {
            if (!item.isError) {
                setCount(item.date)
            } else {
                toast.warning(item.message)
            }

        }).catch((error) => {
            console.log(error)
            toast.error("Server ERROR")
            navigation('/error')

        });
    }, [])
    if (!count) return <Loading/>
    return (
        <main>
            <div className="main__container">


                <div className="main__title">
                    <img src={hello} alt="hello"/>
                    <div className="main__greeting">
                        <h1>Hello Codersbite</h1>
                        <p>Welcome to your admin dashboard</p>
                    </div>
                </div>
                <div className="main__cards">
                    <div className="card">
                        <i
                            className="fa fa-user-o fa-2x text-bg"
                            aria-hidden="true"
                        ></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Admin</p>
                            <span className="font-bold text-title">{count.adminCount}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-user-tie fa-2x text-red" aria-hidden="true"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Manager</p>
                            <span className="font-bold text-title">{count.managerCount}</span>
                        </div>
                    </div>

                    <div className="card">
                        <i
                            className="fa fa-users fa-2x text-green"
                            aria-hidden="true"
                        ></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Client</p>
                            <span className="font-bold text-title">{count.clientCount}</span>
                        </div>
                    </div>


                </div>


            </div>
        </main>
    );
};

export default Main;
