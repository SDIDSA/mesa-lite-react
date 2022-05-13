import axios from "axios";
import { useState } from "react";
import sha1 from "sha1";
import Button from "../components/Button";
import Input from "../components/Input";

function Register(props) {
    const [username, setUsername] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [uhint, setUhint] = useState("");
    const [bhint, setBhint] = useState("");
    const [ehint, setEhint] = useState("");
    const [phint, setPhint] = useState("");

    const [loading, setLoading] = useState(false);
    let inputs = [
        {
            key: "username",
            get: username,
            set: setUsername,
            hint: setUhint,
        }, {
            key: "birthdate",
            get: birthdate,
            set: setBirthdate,
            hint: setBhint,
        }, {
            key: "email",
            get: email,
            set: setEmail,
            hint: setEhint,
        }, {
            key: "password",
            get: password,
            set: setPassword,
            hint: setPhint,
        }
    ]

    function resetErrors() {
        inputs.forEach(input => {
            input.hint("");
        })
    }

    props.setResetErrors(resetErrors);

    return (
        <div className="auth-page register">
            <div className="root">
                <div className="in-root">
                    <div className="top">
                        <span className="head">Create Account</span>
                        <span className="sub-head">Join mesa by creating an account</span>
                    </div>
                    <div className="inputs">
                        <Input
                            hint={uhint}
                            id="reg-username"
                            label="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }} />
                        <Input
                            hint={bhint}
                            id="reg-birthdate"
                            label="Birthdate"
                            type="date"
                            value={birthdate}
                            onChange={(e) => {
                                setBirthdate(e.target.value);
                            }} />
                        <Input
                            hint={ehint}
                            id="reg-email"
                            label="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        <Input
                            hint={phint}
                            id="reg-pass"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                    </div>

                    <Button
                        loading={loading}
                        fullWidth
                        label="Register"
                        onClick={(e) => {
                            let required = false;
                            inputs.forEach(input => {
                                if (input.get === "") {
                                    input.hint("This field is required")
                                    required = true;
                                } else {
                                    input.hint("")
                                }
                            })

                            if (required) {
                                return
                            }

                            if (password.length < 6) {
                                setPhint("must be of at least 6 characters")
                                return
                            }

                            setLoading(true);
                            axios.post(props.api + "/account/signup", {
                                username, birthdate, email, password: sha1(password)
                            }).then(res => {
                                if (res.data.err) {
                                    res.data.err.forEach(err => {
                                        inputs.forEach(input => {
                                            if (input.key === err.key) {
                                                input.hint(err.value);
                                            }
                                        });
                                    })
                                } else {
                                    props.setLoginEmail(email);
                                    inputs.forEach(input => input.set(""))
                                    props.openLogin();
                                }
                                setLoading(false);
                            }).catch(err => {
                                inputs.forEach(input => input.hint(" "));
                                inputs[inputs.length - 1].hint("Server can't be reached")
                                setLoading(false);
                            })
                        }} />
                </div>
            </div>
        </div>
    );
}

export default Register;