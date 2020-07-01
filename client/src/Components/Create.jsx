import Preview from "./Preview.jsx";
import Show from "./Show";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";
import "./Sc.css";
const Markdown = require("react-markdown");

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const Create = props => {
    const classes = useStyles();
    const categories = [
        "Announcements",
        "Data-Structures",
        "Algorithms",
        "Tools and Utilities",
        "System Design",
        "Chill ⏸"
    ];
    const [isUser, checkUser] = useState(false);
    const [titl, setT] = useState("");
    const [msg, setMsg] = useState("");
    const [cat, setCat] = useState("");
    const [scs, Setscs] = useState(false);
    const [now, setNow] = useState("");
    const [preview, openPreview] = useState(false);
    let [cont, setCont] = useState("");

    const fetchUser = async () => {
        const resp = await fetch("/auth/checkStat");
        const data = await resp.json();
        checkUser(data.scs);
    };

    React.useEffect(() => {
        fetchUser();
    }, []);

    const handlePreview = () => {
        openPreview(true);
    };

    const changeTitle = e => {
        setT({ ...titl, titl: e.target.value });
    };

    const handleEditorChange = e => {
        setCont({ ...cont, cont: e.target.value });
    };

    const handleChange = event => {
        setCat(event.target.value);
        setNow(event.target.value);
    };

    const fetchNThrow = async e => {
        e.preventDefault();
        const createdOn = props.def ? props.def.createdOn : Date.now();

        const resp = await fetch("/blog/create-post", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: cont,
                title: titl.titl,
                category: cat,
                createdOn: createdOn
            })
        });
        const data = await resp.json();
        setMsg(data.msg);
        Setscs(data.scs);
    };

    if (!isUser) return <Show />;

    if (preview) {
        return <Preview data={cont.cont} isUser={isUser} />;
    }

    return (
        <>
            <Navbar name="Create Post" createPost={isUser} />
            <a href="#" onClick={handlePreview}>
                Preview
            </a>
            <form id="frm" method="POST">
                {scs && <h3 className="global-flash-success">{msg}</h3>}
                {!scs && <h3 className="global-flash-failure">{msg}</h3>}
                <br />
                <textarea
                    id="tinp"
                    type="text"
                    name="title"
                    placeholder="New Post Title here."
                    onChange={changeTitle}
                    maxlength="256"
                ></textarea>
                <br />
                <FormControl className={classes.formControl}>
                    <Select
                        defaultValue={"Select Category"}
                        value={now}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="" selected>
                            {props.def ? props.def.category : "Select One"}
                        </MenuItem>
                        {categories.map((el, ind) => {
                            return <MenuItem value={el}>{el}</MenuItem>;
                        })}
                    </Select>
                    <FormHelperText>Select Category</FormHelperText>
                </FormControl>

                <br />
                <br />

                <textarea
                    id="tinp"
                    className="tarea"
                    rows="70"
                    cols="30"
                    tag="textarea"
                    onChange={handleEditorChange}
                    placeholder="Post content here."
                >
                    {props.def ? props.def.content : ""}
                </textarea>
            </form>
            <div id="finalPost">
                <button onClick={fetchNThrow}>Publish</button>
            </div>
        </>
    );
};

export default Create;
