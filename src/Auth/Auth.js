import { useState } from 'react';
import './Auth.css';
import FallingStars from './FallingStars';
import Footer from './Footer';
import Logo from '../icons/Logo';
import Mesa from '../icons/Mesa';
import Login from './Login';
import Register from './Register';

function Auth(props) {
    const [at, setAt] = useState("login");

    function openLogin() {
        setAt("login");
    }

    function openRegister() {
        setAt("register");
    }

    return (
        <div className={`auth ${at}`}>
            <FallingStars />
            <div className='top'>
                <div className='left'>
                    <Logo />
                    <Mesa />
                </div>
                <div className='right'>
                    <div className={`button invert${at === "login" ? "" : " disable"}`} onClick={openRegister}>
                        Register
                    </div>
                    <div className={`button${at === "register" ? "" : " disable"}`} onClick={openLogin}>
                        Login
                    </div>
                </div>
            </div>

            <div className='content'>
                <Login api={props.api}/>
                <Register api={props.api} openLogin={openLogin}/>
            </div>

            <Footer />
        </div>
    );
}

export default Auth;