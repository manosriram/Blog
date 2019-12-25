import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Sc.css";

const Admin = () => {
    const [data, setData] = useState({});

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

    };

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value});
    }

    return (
        <>
        <Navbar name="Admin" />
        <form id="frm" action="" onChange={handleChange} onSubmit={handleSubmit}>
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
        </>
    )
};

export default Admin;
