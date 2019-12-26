import Show from "./Show";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import Navbar from "./Navbar";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Sc.css";
const userStat = require("./GetStat");

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Create = () => {
    const classes = useStyles();
    const categories = ["Announcements", "Data-Structures", "Algorithms", "Chill ⏸"];
    const [isUser, checkUser] = useState(false);
    const [ed, setEd] = useState("");
    const [titl, setT] = useState("");
    const [msg, setMsg] = useState("");
    const [cat, setCat] = useState("");
    const [scs, Setscs] = useState(false);
    const [now, setNow] = useState("Choose");

    const fetchUser = async () => {
        const resp = await userStat();
        checkUser(resp.scs);
    };

    React.useEffect(() => {
        fetchUser();
    }, []);

    const changeTitle = e => {
        setT({...titl, titl: e.target.value});
    };

    const handleChange = event => {
        setCat(event.target.value);
        setNow(event.target.value);
    };

    const fetchNThrow = async e => {
        e.preventDefault();
        const resp = await fetch("/blog/create-post", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content: ed.ed, title:titl.titl, category: cat})
        });
        const data = await resp.json();
        setMsg(data.msg);
        Setscs(data.scs);
    };

    if (!isUser)
        return <Show />;

    return (
        <>
        <Navbar name="Create Post" createPost={false} showPosts={true} logged={true}/>
        <form id="frm" method="POST">
        {scs && <h3 className="global-flash-success">{msg}</h3>}
        {!scs && <h3 className="global-flash-failure">{msg}</h3>}
        <input id="title" type="text" name="title" placeholder="Title" onChange={changeTitle}/>
        <br />
        <FormControl className={classes.formControl}>

        <Select defaultValue={"Select Category"} value={now} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
        <MenuItem value="" selected>Select One</MenuItem>
        {categories.map((el, ind) => {
            return <MenuItem value={el}>{el}</MenuItem>
        })}
        </Select>
        <FormHelperText>Select Category</FormHelperText>
        </FormControl>

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