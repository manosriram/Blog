const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blog");

router.post('/create-post', async (req, res) => {
    const {content, title, category} = req.body;
    let em;

    if (!content || !title || !category)
        return res.json({scs: false, msg: "Fill all fields"});

    if (req.session.user)
        em = req.session.user.email;
    else
        return res.json({scs: false, msg: "Not Logged-In"});

    try {
        const blg = new Blog({
            title,
            content,
            category,
            createdBy: em
        });

        blg.save();
        return res.json({scs: true, msg: "Uploaded Post!"});
    } catch (er) {
        console.log(er);
        return res.json({scs: false, msg: "Some error occured."});
    }
});

router.get('/show-posts', async (req, res) => {
        const posts = await Blog.find({createdBy: "mano.sriram0@gmail.com"});
        console.log(posts);
        return res.json({posts});
});

module.exports = router;
