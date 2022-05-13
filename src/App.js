import { useState } from 'react';
import './App.css';
import Auth from './Auth/Auth';

const api = "http://localhost:4000";

function App() {
    const [session, setSession] = useState(null);
    const [theme, setTheme] = useState("dark");

    function login(session) {
        setSession(session);
    }

    return (
        <div className={`app theme-${theme}`}>
            {session ? <div>in</div> : <Auth login={login} api={api}/>}
        </div>
    );
}

export default App;