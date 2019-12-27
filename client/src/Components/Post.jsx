import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import "./Sc2.css";
const md = require("marked");
const DOMPurify = require("dompurify");
const Markdown = require("react-markdown");

const Post = props => {
    let {postid} = useParams();
    const [content, setContent] = useState({});
    const [realContent, setRContent] = useState("");

    const loadContent = () => {
        return;
        console.log(content);
        const div = document.querySelector("#content");
        const newDiv = document.createElement("div"); 
        newDiv.innerHTML = md(content.content);
        div.insertAdjacentHTML(newDiv);
    };

    const fetchPost = async () => {
        const resp = await fetch("/blog/get-post", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postID: postid})
        });
        const postContent = await resp.json();

        setRContent(DOMPurify.sanitize(postContent.postContent.content));
        setContent(postContent.postContent);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <>
        <Navbar showPosts={true} about={true} Git={true} />
        <div id="container">
        <Markdown source={realContent.toString('html')} escapeHtml={false}/>
        </div>
        </>
    )
};

export default Post;
