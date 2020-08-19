const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blog");
const Draft = require("../Models/Draft");

let cachedData = null,
    cachedTime = null;
const time = 30 * 1000; // 30 Seconds.

router.put("/update-post/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, draft } = req.body;
        const content = req.body.content.cont;

        const updates = {
            title,
            category,
            content
        };
        if (draft === true)
            await Draft.findOneAndUpdate({ _id: id }, updates, { new: true });
        else await Blog.findOneAndUpdate({ _id: id }, updates, { new: true });

        return res.status(200).json({ scs: true, msg: "Post Updated!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ scs: false, msg: "Some error Occured." });
    }
});

router.delete("/delete-draft", async (req, res, next) => {
    const { postID } = req.body;
    if (req.session.user) {
        try {
            await Draft.deleteOne({ _id: postID });

            return res.status(200).json({ scs: true, msg: "Post deleted." });
        } catch (er) {
            return res.status(404).json({ scs: false, msg: "Error occured." });
        }
    } else {
        return res.status(403).json({ scs: false, msg: "No Admin found." });
    }
});

router.post("/get-draft", async (req, res, next) => {
    const { postID } = req.body;
    try {
        const draft = await Draft.findOne({ _id: postID });
        return res.status(200).json({ scs: true, postContent: draft });
    } catch (er) {
        console.log(er);
        return res.status(500).json({ scs: false, msg: "Some error occured." });
    }
});

router.get("/move-draft/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const draft = await Draft.findOne({ _id: id });
        if (!draft) {
            return res
                .status(404)
                .json({ scs: false, message: "Draft Not Found" });
        }
        const newBlog = {
            title: draft.title,
            content: draft.content,
            category: draft.category,
            createdBy: process.env.createdBy
        };

        const postBlog = new Blog(newBlog);
        await postBlog.save();
        cachedData = null;
        // await Draft.deleteOne({ _id: id });

        return res.status(201).json({
            scs: true,
            message: "Draft moved."
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, message: "Some error occured" });
    }
});

router.get("/show-drafts", async (req, res) => {
    const drafts = await Draft.find({
        createdBy: "mano.sriram0@gmail.com"
    }).sort({
        createdOn: -1
    });

    return res.status(200).json({ drafts });
});

router.post("/draft-post", async (req, res) => {
    const { title, category } = req.body;
    const content = req.body.content.cont;

    if (!content || !title || !category)
        return res.status(406).json({ scs: false, msg: "Fill all fields" });

    if (!req.session.user)
        res.status(401).json({ scs: false, msg: "Not Logged-In" });

    try {
        const draft = new Draft({
            title,
            content,
            category
        });

        await draft.save();
        cachedData = null;
        return res.status(200).json({ scs: true, msg: "Post Drafted." });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ scs: false, msg: "Some error occured." });
    }
});

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
        return res.status(500).json({ scs: false, msg: "Some error occured." });
    }
});

router.post("/create-post", async (req, res, next) => {
    const { title, category } = req.body;
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
        return res.status(500).json({ scs: false, msg: "Some error occured." });
    }
});

router.get("/show-posts", async (req, res, next) => {
    try {
        const posts = await Blog.find({
            createdBy: "mano.sriram0@gmail.com"
        }).sort({
            createdOn: -1
        });
        cachedData = posts;
        cachedTime = Date.now();
        return res.status(200).json({ posts });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ scs: false, msg: "Some error occured." });
    }
});

module.exports = router;
