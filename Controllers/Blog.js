const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blog");

let cachedData = null,
    cachedTime = null;
const time = 30 * 1000; // 30 Seconds.

router.delete("/delete-post", async (req, res, next) => {
    const { postID } = req.body;
    if (req.session.user) {
        try {
            const rex = await Blog.deleteOne({ _id: postID });

            return res.status(200).json({ scs: true, msg: "Post deleted." });
        } catch (er) {
            return res.status(404).json({ scs: false, msg: "Error occured." });
        }
    } else {
        return res.status(403).json({ scs: false, msg: "No Admin found." });
    }
});

router.post("/get-post", async (req, res, next) => {
    const { postID } = req.body;
    try {
        const post = await Blog.findOne({ _id: postID });
        return res.status(200).json({ scs: true, postContent: post });
    } catch (er) {
        console.log(er);
        return res.status(404).json({ scs: false, msg: "Some error occured." });
    }
});

router.post("/create-post", async (req, res, next) => {
    const { createdOn, title, category } = req.body;
    const content = req.body.content.cont;
    let em;

    if (!content || !title || !category)
        return res.status(406).json({ scs: false, msg: "Fill all fields" });

    if (req.session.user) em = req.session.user.email;
    else return res.status(401).json({ scs: false, msg: "Not Logged-In" });

    try {
        const blg = new Blog({
            title,
            content,
            category,
            createdBy: em,
            createdOn: createdOn
        });

        blg.save();
        cachedData = null;
        return res.status(200).json({ scs: true, msg: "Uploaded Post!" });
    } catch (er) {
        console.log(er);
        return res.status(404).json({ scs: false, msg: "Some error occured." });
    }
});

router.get("/show-posts", async (req, res, next) => {
    try {
        if (cachedData) {
            return res.status(200).json({ posts: cachedData });
        } else {
            const posts = await Blog.find({
                createdBy: "mano.sriram0@gmail.com"
            }).sort({
                createdOn: -1
            });
            cachedData = posts;
            cachedTime = Date.now();
            return res.status(200).json({ posts });
        }
    } catch (err) {
        console.log(er);
        return res.status(404).json({ scs: false, msg: "Some error occured." });
    }
});

module.exports = router;
