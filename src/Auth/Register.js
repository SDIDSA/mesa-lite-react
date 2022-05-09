import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

function Register(props) {
    const [username, setUsername] = useState("");
    const [birthdate, setBirthdate] = useState("2000-01-01");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [uhint, setUhint] = useState("");
    const [bhint, setBhint] = useState("");
    const [ehint, setEhint] = useState("");
    const [phint, setPhint] = useState("");

    let inputs = [
        {
            key: "username",
            value: username,
            hint: setUhint,
        }, {
            key: "birthdate",
            value: birthdate,
            hint: setBhint,
        }, {
            key: "email",
            value: email,
            hint: setEhint,
        }, {
            key: "password",
            value: password,
            hint: setPhint,
        }
    ]
    return (
        <div className="auth-page register">
            <div className="root">
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
                    fullWidth
                    label="Register"
                    onClick={(e) => {
                        let required = false;
                        inputs.forEach(input => {
                            if (input.value === "") {
                                input.hint("This field is required")
                                required = true;
                            } else {
                                input.hint("")
                            }
                        })
                        if (required)
                            return
                        axios.post(props.api + "/account/signup", {
                            username, birthdate, email, password
                        }).then(res => {
                            if(res.data.err) {
                                res.data.err.forEach(err => {
                                    inputs.forEach(input => {
                                        if(input.key === err.key) {
                                            input.hint(err.value);
                                        }
                                    });
                                })
                            }else {
                                props.openLogin();
                            }
                        })
                    }} />
            </div>
        </div>
    );
}

export default Register;