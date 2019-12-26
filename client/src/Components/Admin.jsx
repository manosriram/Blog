import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Sc.css";
import AdminHome from "./AdminHome";
import CircularProgress from '@material-ui/core/CircularProgress';
import Create from "./Create";

const Admin = () => {
    const [data, setData] = useState({});
    const [home, setHome] = useState(false);
    const [msg, setMsg] = useState("");
    const [loading, isLoading] = useState(true);

    const confirmStatus = async () => {
        const resp = await fetch("/auth/checkStat");
        const resp2 = await resp.json();
        if (resp2.scs)
            setHome(resp2.scs);
    };

    useEffect(() => {
        confirmStatus();
        isLoading(false);
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const resp = await fetch("/auth/enterAdmin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data})
        });
        const resp2 = await resp.json();
        if (resp2.scs == true)
            setHome(resp2.scs);
        else
            setMsg(resp2.msg);
    };

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value});
    }

    if (home) return <Create />

    return (
        <>
        <Navbar name="Admin" Git={true}/>

        {loading && (
            <div id="spin">
                <CircularProgress />
            </div>
        )}

        {!loading && (
        <form id="frm" action="" onChange={handleChange} onSubmit={handleSubmit}>
        {msg && <h3>{msg}</h3>}
        <TextField
        type="email"
        id="outlined-error"
        label="Email Address"
        variant="outlined"
        name="email"
        />
        &nbsp;
        &nbsp;
        &nbsp;
        <TextField
        type="password"
        id="outlined-error"
        label="Password"
        variant="outlined"
        name="password"
        />
        <br />
        <br />
        <br />
        <Button type="submit" variant="contained">Enter</Button>
        </form>
        )}
        </>
    )
};

export default Admin;
