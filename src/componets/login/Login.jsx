import React, {useState} from 'react';

import './Login.css'
import {loginAPi, loginAPis} from "../../utl/fetchFromAPI";
import SingUp from "./SingUp";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import md5 from "md5";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigation = useNavigate();
    const [name, setName] = useState({
        username: '',
        password: ''
    })
    const [signUp, setSignUp] = useState(false)

    const loginClick = () => {

        console.log(name.username)
        console.log(name.password)


        loginAPi({
            username: name.username,
            password: name.password
        }).then((item) => {
            console.log(item)
            if (!item?.isError) {
                localStorage.clear()
                localStorage.setItem(md5('role'), md5(item.date?.role))
                localStorage.setItem(md5('token'), item.date?.accessToken)
                toast.success('Successful')
                // window.location.reload();
            } else {
                toast.warning(item.message)
            }
        }).catch((eror) => {
            console.log(eror)
            toast.error('Server ERROR')

        })

        // +998990000000
        // admin


    }

    const signUpClick = () => {

        setSignUp(true)

    }
    if (signUp) {
        return (
            <SingUp/>
        )
    }

    return (

        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            value={name.username}
                            onChange={e => setName({...name, username: e.target.value})}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={name.password}
                            onChange={e => setName({...name, password: e.target.value})}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button  className="btn btn-primary" onClick={loginClick}>
                            Submit
                        </button>
                    </div>

                </div>
            </form>
        </div>

    );
};

export default Login;