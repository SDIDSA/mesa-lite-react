import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [ehint, setEhint] = useState("");
    const [phint, setPhint] = useState("");
    return (
        <div className="auth-page login">
            <div className="root">
                <div className="top">
                    <span className="head">Welcome to Mesa</span>
                    <span className="sub-head">Login to your mesa account</span>
                </div>
                <div className="inputs">
                    <Input
                        hint={ehint}
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />

                    <Input
                        hint={phint}
                        id="pass"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>

                <Button
                    label="Login"
                    fullWidth
                    onClick={(e) => {
                        axios.post(props.api + "/account/login", { email, password }).then(res => {
                            console.log(res.data);
                        })
                    }} />
            </div>
        </div>
    );
}

export default Login;