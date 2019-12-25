import React, {useState} from 'react';
import Navbar from "./Navbar";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Sc.css";

const Create = () => {
    const [ed, setEd] = useState("");
    const [titl, setT] = useState("");
    const [msg, setMsg] = useState("");
    const [cat, setCat] = useState("");
    const [scs, Setscs] = useState(false);

    const changeTitle = e => {
        setT({...titl, titl: e.target.value});
    };

    const changeCat = e => {
        setCat({...cat, cat: e.target.value});
    };

    const fetchNThrow = async e => {
        e.preventDefault();
        const resp = await fetch("/blog/create-post", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content: ed.ed, title:titl.titl, category: cat.cat})
        });
        const data = await resp.json();
        setMsg(data.msg);
        Setscs(data.scs);
        console.log(scs);
    };

    return (
        <>
        <Navbar name="Create Post" createPost={false} showPosts={true} />
        <form id="frm" method="POST">
        {scs && <h3 className="global-flash-success">{msg}</h3>}
        {!scs && <h3 className="global-flash-failure">{msg}</h3>}
        <input id="title" type="text" name="title" placeholder="Title" onChange={changeTitle}/>
        <br />
        <TextField id="standard-basic" label="Category" onChange={changeCat} name="cat" />
        <br/>
        <br/>
        <CKEditor
        name="edit"
        editor={ ClassicEditor }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            setEd({...ed, ed: data});
        }}
        />
        <br />
        <Button variant="contained" color="primary" onClick={fetchNThrow}>
        Post
        </Button>
        </form>
        </>
    )
};

export default Create;
