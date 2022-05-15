import { useEffect, useState } from "react";
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import Logo from "../icons/Logo";
import Mesa from "../icons/Mesa";

function SessionTop(props) {
    const [menu, setMenu] = useState(false);

    const [dark, setDark] = useState(true);

    const [logginOut, setLoggingOut] = useState(false);

    useEffect(() => {
        let listener = (ev) => {
            if (!document.querySelector(".top > .right").contains(ev.target)) {
                setMenu(false);
            }
        }
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener);
    }, [])

    useEffect(() => {
        props.setTheme(dark ? "dark" : "light");
    }, [dark])

    return (
        <div className="top">
            <div className='left'>
                <Logo />
                <Mesa />
            </div>
            <div className={`right${menu ? " open" : ""}`}>
                <img
                    alt={`${props.user.username}'s profile picture`}
                    className="pfp"
                    src={props.user.avatar}
                    onClick={() => {
                        setMenu(!menu);
                    }} />
                <div className="menu">
                    <div className="menu-items">
                        <div className="menu-item">
                            <span className="label">Profile</span>
                        </div>
                        <div className="menu-item" onClick={() => setDark(!dark)}>
                            <span className="label">Dark Theme</span>
                            <Toggle
                                checked={dark}
                            />
                        </div>
                    </div>
                    <Button
                        loading={logginOut}
                        fullWidth
                        label="Log out"
                        onClick={() => {
                            setLoggingOut(true);
                            setTimeout(() => {
                                props.post("/session/logout", {}).then(res => {
                                    console.log(res.data);
                                    props.logout();
                                }).catch(err => {
                                    console.log(err);
                                })
                            }, 1000);
                        }} />
                </div>
            </div>
        </div>
    );
}

export default SessionTop;