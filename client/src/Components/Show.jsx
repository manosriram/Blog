import {useHistory} from "react-router-dom";
import Post from "./Post";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import "./Sc.css";
import React, {useState} from 'react';
import Navbar from "./Navbar";
const dt = require("datejs");
const userStat = require("./GetStat");
const moment = require("moment");

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Show = props => {
    const categories = ["Announcements", "Data-Structures", "Algorithms", "Chill ⏸"];
    let history = useHistory();
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [postID, setPostID] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [cat, setCat] = useState([]);
    const [age, setAge] = useState("");
    const [now, setNow] = useState("Select filter");
    const [spin, isSpinning] = useState(true);

    const openPost = e => {
        setPostID(e);
    };

    const handleChange = event => {
        if (event.target.value === "All") {
            setPosts(allPosts);
            setNow(event.target.value);
            return;
        } else {
            setPosts(allPosts.filter(pt => pt.category === event.target.value));
            setNow(event.target.value);
        }
    };

    const fetchData = async () => {
        const resp = await fetch("/blog/show-posts");
        let data = await resp.json();
        data = data.posts;
        setPosts(data);
        setAllPosts(data);
    };

    React.useEffect(() => {
        fetchData();
        isSpinning(false);
    }, []);

    if (postID) {
        history.push(`/post/${postID}`);
    }

    var momentDate, jsD;
    return (
        <>
        <Navbar name="Show Posts" showPosts={false} Git={true}/>
        <div id="inCont">
        <div id="contn">
        <FormControl className={classes.formControl}>
        <Select defaultValue={"Select Filter"} value={now} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
        <MenuItem value="All">All</MenuItem>
        {categories.map((el, ind) => {
            return <MenuItem value={el}>{el}</MenuItem>
        })}
        </Select>
        <FormHelperText>Filter Category</FormHelperText>
        </FormControl>
        </div>
        {spin && <CircularProgress />}

        <br />
        {posts.map((el, ind) => {
                return(
                    <>
                    <div id="two">
                    <div id="when">
                    <time>{moment(el.createdOn).format("MMMM D, YYYY")}</time>
                    &nbsp;
                    <span>»</span>
                    &nbsp;
                    <a id="tle" onClick={() => openPost(el._id)}>{el.title}</a>
                    <span>[{el.category}]</span>
                    <br />
                    <br />
                    </div>
                    </div>
                    </>
                );
            }
        )}
        </div>
        </>
    )
};

export default Show;
