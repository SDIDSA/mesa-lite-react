import { useEffect, useState } from 'react';
import './Auth.css';
import FallingStars from '../falling-stars/FallingStars';
import Footer from '../Footer';
import Logo from '../icons/Logo';
import Mesa from '../icons/Mesa';
import Login from './Login';
import Register from './Register';
import Button from '../components/Button';

function Auth(props) {
    const [at, setAt] = useState("login");

    const [email, setEmail] = useState("zinou.teyar@gmail.com");
    const [password, setPassword] = useState("a1b2.a1b2");

    const [ehint, setEhint] = useState("");
    const [phint, setPhint] = useState("");

    const [isLogging, setLoggin] = useState(true);
    const [isLogged, setLogged] = useState(true);

    useEffect(() => {
        setLogged(false);
        setTimeout(() => {
            setLoggin(false);
        }, 1000)
    }, [])

    let resetErrorsLogin, resetErrorsRegister;

    function setResetErrorsLogin(func) {
        resetErrorsLogin = func;
    }

    function setResetErrorsRegister(func) {
        resetErrorsRegister = func;
    }

    function openLogin() {
        setAt("login");
        setTimeout(() => {
            resetErrorsRegister();
            document.getElementById("log-email").focus();
        }, 200);
    }

    function openRegister() {
        setAt("register");
        setTimeout(() => {
            resetErrorsLogin();
            document.getElementById("reg-username").focus();
        }, 200);
    }

    function logging(token) {
        setTimeout(() => {
            setLoggin(true);
            setTimeout(() => {
                setLogged(true);
                setTimeout(() => {
                    props.setToken(token);
                    setLoggin(false);
                    setLogged(false);
                }, 300);
            }, 2000);
        }, 500);
    }

    return (
        <div className={`auth ${at}${isLogging ? " logging" : ""}${isLogged ? " logged" : ""}`}>
            <span className='before' />
            <FallingStars />
            <div className='top'>
                <div className='left'>
                    <Logo />
                    <Mesa />
                </div>
                <div className='right'>
                    <Button
                        invert
                        disable={at === "register"}
                        width="100px"
                        label="Register"
                        onClick={openRegister} />
                    <Button
                        disable={at === "login"}
                        width="100px"
                        label="Login"
                        onClick={openLogin} />
                </div>
            </div>

            <div className='content'>
                <Login api={props.api}
                    isLogging={isLogging}
                    logging={logging}
                    setResetErrors={setResetErrorsLogin}
                    login={props.login}
                    email={{
                        get: email,
                        set: setEmail,
                        getHint: ehint,
                        setHint: setEhint
                    }} password={{
                        get: password,
                        set: setPassword,
                        getHint: phint,
                        setHint: setPhint
                    }} />
                <Register
                    setResetErrors={setResetErrorsRegister}
                    api={props.api}
                    setLoginEmail={setEmail}
                    openLogin={openLogin} />
            </div>

            <Footer />
        </div>
    );
}

export default Auth;