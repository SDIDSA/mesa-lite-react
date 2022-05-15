import "./session.css"
import axios from "axios";
import { useEffect, useState } from "react";
import SessionTop from './SessionTop'
import FallingStars from "../falling-stars/FallingStars";

function Session(props) {
    const [id, setId] = useState(-1);
    const [token, setToken] = useState(props.token);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState({})

    function logout() {
        setLoading(true);
        setTimeout(() => {
            props.setToken("");
        }, 1000);
    }

    function post(path, data) {
        data.id = data.id ? data.id : id;
        data.token = data.token ? data.token : token;
        return axios.post(props.api + path, data);
    }

    useEffect(() => {
        post("/account/checkToken", {}).then(res => {
            let idd = res.data.id;
            if (idd != -1) {
                setId(idd);
                setLoading(false);
                post("/session/getUser", { id: idd}).then(res => {
                    setUser(res.data);
                }).catch(err => {
                    console.log(err);
                })
            } else {
                logout();
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className={`session${loading ? " loading" : ""}`}>
            <span className="spinner"></span>
            <div className="root">
                <SessionTop
                    post={post}
                    logout={logout}
                    setTheme={props.setTheme}
                    user={user} />
            </div>
        </div>
    )
}

export default Session;