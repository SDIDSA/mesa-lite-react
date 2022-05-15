import { useState } from 'react';
import './App.css';
import Auth from './auth/Auth';
import cookies from './cookies';
import Session from './session/Session';

const api = "http://localhost:4000";

function App() {
    const [session, setSession] = useState(cookies.get("token"));
    const [theme, setTheme] = useState("dark");

    function setToken(token) {
        cookies.set("token", token)
        setSession(token);
    }

    return (
        <div className={`app theme-${theme}`}>
            {session !== "" ?
                <Session
                    setTheme={setTheme}
                    token={session}
                    setToken={setToken}
                    api={api} /> :
                <Auth
                    setToken={setToken}
                    api={api} />}
        </div>
    );
}

export default App;