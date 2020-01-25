const express = require('express');
const router = express.Router();
const Blog = require('../Models/Blog');

router.delete('/delete-post', async (req, res) => {
  const {postID} = req.body;
  if (req.session.user) {
    try {
      const rex = await Blog.deleteOne({_id: postID});

      return res.json({scs: true, msg: 'Post deleted.'});
    } catch (er) {
      return res.json({scs: false, msg: 'Error occured.'});
    }
  } else {
    return res.json({scs: false, msg: 'No Admin found.'});
  }
});

router.post('/get-post', async (req, res) => {
  const {postID} = req.body;
  try {
    const post = await Blog.findOne({_id: postID});
    return res.json({scs: true, postContent: post});
  } catch (er) {
    console.log(er);
    return res.json({scs: false, msg: 'Some error occured.'});
  }
});

router.post('/create-post', async (req, res) => {
  const {title, category} = req.body;
  const content = req.body.content.cont;
  let em;

  if (!content || !title || !category)
    return res.json({scs: false, msg: 'Fill all fields'});

  if (req.session.user) em = req.session.user.email;
  else return res.json({scs: false, msg: 'Not Logged-In'});

  try {
    const blg = new Blog({
      title,
      content,
      category,
      createdBy: em,
      createdOn: Date.now(),
    });

    blg.save();
    return res.json({scs: true, msg: 'Uploaded Post!'});
  } catch (er) {
    console.log(er);
    return res.json({scs: false, msg: 'Some error occured.'});
  }
});

router.get('/show-posts', async (req, res) => {
  const posts = await Blog.find({createdBy: 'mano.sriram0@gmail.com'}).sort({
    createdOn: -1,
  });
  return res.json({posts});
});

module.exports = router;
