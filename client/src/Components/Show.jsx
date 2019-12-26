import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import "./Sc.css";
import React, {useState} from 'react';
import Navbar from "./Navbar";
const md = require("marked");
const dt = require("datejs");
const userStat = require("./GetStat");
const moment = require("moment");
const _ = require("lodash");

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Show = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [cat, setCat] = useState([]);
    const [age, setAge] = useState("");
    const [now, setNow] = useState("Select filter");
    let hash = {};
    const filterPosts = val => {};

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
        data.map(el => {
            setCat(...cat, el.category);
        });
    };

    React.useEffect(() => {
        fetchData();

    }, []);

    var momentDate, jsD;
    return (
        <>
        <Navbar name="Show Posts" createPost={true} showPosts={false} logged={true}/>
        <div id="inCont">
        <div id="contn">
        <FormControl className={classes.formControl}>
        <Select defaultValue={"Select Filter"} value={now} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
        <MenuItem value="All">All</MenuItem>
        {allPosts.map((el, ind) => {
                return <MenuItem value={el.category}>{el.category}</MenuItem>
        })}
        </Select>
        <FormHelperText>Select Filter.</FormHelperText>
        </FormControl>
        </div>

        <br />
        {posts.map((el, ind) => {
            if (!(ind & 1)) {
                return(
                    <>
                    <div id="one">
                    <a href={"mano"} id="tle">{el.title}</a>
                    <span>[{el.category}]</span>
                    <br />
                    <br />
                    </div>
                    </>
                );
            } else {
                return(
                    <>
                    <div id="two">
                    <a href={"mano"} id="tle">{el.title}</a>
                    <span>[{el.category}]</span>
                    <br />
                    <br />
                    </div>
                    </>
                );
            }
        })
        }
        </div>
        </>
    )
};

export default Show;
