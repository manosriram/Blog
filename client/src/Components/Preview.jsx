import Create from "./Create";
import Navbar from "./Navbar";
import "./Sc2.css";
import React from "react";
const Markdown = require("react-markdown");

const Preview = props => {
    const [B, setB] = React.useState(false);
    const [content, setContent] = React.useState({});

    const openUpdate = () => {
        setB(true);
        setContent({
            content: props.data
        });
    };

    if (B) return <Create def={content} />;
    return (
        <div id="container">
            <div id="editorContent">
                <Markdown value={props.data} />
            </div>
            <a id="tle" onClick={() => openUpdate()}>
                Back
            </a>
        </div>
    );
};

export default Preview;
