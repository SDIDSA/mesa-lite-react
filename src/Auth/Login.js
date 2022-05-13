import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import sha1 from "sha1";

function Login(props) {

    const [loading, setLoading] = useState(false);

    let inputs = [
        {
            key: "email",
            get: props.email.get,
            hint: props.email.setHint,
        }, {
            key: "password",
            value: props.password.get,
            hint: props.password.setHint,
        },
        {
            key: "email",
            get: props.email.get,
            set: props.email.set,
            hint: props.email.setHint,
        }, {
            key: "password",
            get: props.password.get,
            set: props.password.set,
            hint: props.password.setHint,
        }
    ]

    function resetErrors() {
        inputs.forEach(input => {
            input.hint("");
        })
    }

    props.setResetErrors(resetErrors);

    function logging() {
        let loginRoot = document.getElementById("login-root");
        let height = loginRoot.clientHeight;
        loginRoot.style.maxHeight = height + "px";
        loginRoot.style.height = height + "px";
        setTimeout(() => {
            props.logging(true);
        }, 1);
    }

    return (
        <div className="auth-page login">
            <div id="login-root" className={`root${props.isLogging ? " loading" : ""}`}>
                <div className="in-root">
                    <div className="top">
                        <span className="head">Welcome to Mesa</span>
                        <span className="sub-head">Login to your mesa account</span>
                    </div>
                    <div className="inputs">
                        <Input
                            hint={props.email.getHint}
                            id="log-email"
                            label="Email"
                            value={props.email.get}
                            onChange={(e) => {
                                props.email.set(e.target.value);
                            }} />

                        <Input
                            hint={props.password.getHint}
                            id="pass"
                            label="Password"
                            type="password"
                            value={props.password.get}
                            onChange={(e) => {
                                props.password.set(e.target.value);
                            }} />
                    </div>
                    <a href="">Forgot your password?</a>
                    <Button
                        loading={loading}
                        label="Login"
                        fullWidth
                        onClick={(e) => {
                            let required = false;
                            inputs.forEach(input => {
                                console.log(input)
                                if (input.get === "") {
                                    input.hint("This field is required")
                                    required = true;
                                } else {
                                    input.hint("")
                                }
                            })
                            if (required)
                                return

                            setLoading(true);
                            axios.post(props.api + "/account/login",
                                { email: props.email.get, password: sha1(props.password.get) })
                                .then(res => {
                                    if (res.data.err) {
                                        res.data.err.forEach(err => {
                                            inputs.forEach(input => {
                                                if (input.key === err.key) {
                                                    input.hint(err.value);
                                                }
                                            });
                                        })
                                        setLoading(false);
                                    } else {
                                        logging();
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 2000);
                                    }
                                }).catch(err => {
                                    inputs.forEach(input => input.hint(" "));
                                    inputs[inputs.length - 1].hint("Server can't be reached")
                                    setLoading(false);
                                })
                        }} />
                </div>
                <span className="spinner"></span>
            </div>
        </div>
    );
}

export default Login;