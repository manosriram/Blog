import "./Sc.css";
import React, {useState} from 'react';
import Navbar from "./Navbar";
const md = require("marked");

const Show = () => {
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        const resp = await fetch("/blog/show-posts");
        let data = await resp.json();
        data = data.posts;
        setPosts(data);

        const dc = document.getElementById("inCont");

        data.map((el, ind) => {
        const div = document.createElement("div");
        div.id = ind;
        div.className = "innerContent";
            
        div.insertAdjacentHTML("beforeend", el.title);
        div.insertAdjacentHTML("beforeend", "<br />");
        div.insertAdjacentHTML("beforeend", el.content);
        div.insertAdjacentHTML("beforeend", "<br />");

        dc.appendChild(div);
        });

    };

    React.useEffect(() => {
        fetchData();

    }, []);

    return (
        <>
        <Navbar name="Show Posts" createPost={true} showPosts={false} logged={true}/>
        <h3>Show.jsx</h3>
        <div id="cont">
        <div id="inCont">
        {posts.map((el, ind) => {
            return(
                <>
                <div id="content">
                </div>
                </>
            );
        })
        }
        </div>
        </div>
        </>
    )
};

export default Show;
