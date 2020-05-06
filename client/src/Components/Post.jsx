import { Helmet } from 'react-helmet';
import Create from "./Create";
import './Loader.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory, useLocation} from 'react-router-dom';
import React, {useState, useEffect, useCallback} from 'react';
import Navbar from './Navbar';
import './Sc2.css';
const Markdown = require('react-markdown');
const moment = require('moment');

const Post = props => {
  const [open, setOpen] = React.useState(false);
  const [logStat, setLogStat] = useState(false);

  let location = useLocation();
  let history = useHistory();
  const [postName, setPostName] = useState("");
  const [content, setContent] = useState({});
  const [realContent, setRContent] = useState('');
  const [spin, isSpinning] = useState(false);
  const [postID, setPostID] = useState('');
  const [B, setB] = useState(false);
  const [CN, setCN] = useState("");

  const fetchUser = async () => {
    const resp = await fetch('/auth/checkStat');
    const data = await resp.json();
    setLogStat(data.scs);
  };

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const openUpdate = cont => {
      setB(true);
      setCN(cont);
  };

  const deletePost = async () => {
    const resp = await fetch('/blog/delete-post', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({postID: postID}),
    });
    const rec = await resp.json();
    if (rec.scs) history.push('/');
  };

  const fetchPost = async () => {
    try {
      const resp = await fetch('/blog/get-post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({postID: location.pathname.split('/')[2]}),
      });
      const postContent = await resp.json();

      setRContent(postContent.postContent.content);
      setContent(postContent.postContent);
      isSpinning(false);
    } catch (er) {
      history.push('/');
    }
  };

  const memorizeFetchPost = useCallback(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    try {
      isSpinning(true);
      setPostName(location.pathname.split('/')[3]);
      setPostID(location.pathname.split('/')[2]);
      memorizeFetchPost();
    } catch (er) {
      history.push('/');
    }
  }, []);

  if (B) return <Create def={CN}/>

  if (logStat) {
    return (
      <>
        <Helmet>
            <title>{postName} | Mano Sriram</title>
            <meta name="description" content={postName} />
        </Helmet>
        <Navbar createPost={true} />
        <div id="container">
          {spin ? (
            <div className="loader"></div>
          ) : (
            <>
              <h1 id="contentTitle">{content.title}</h1>{' '}
              <span>
                <a id="tle" onClick={handleClickOpen}>
                  delete
                </a>
              </span>
              {" "}
              <span>
                <a id="tle" onClick={() => openUpdate(content)}>
                  update
                </a>
              </span>
              <br />
              <span>
                {moment(content.createdOn).format('MMMM D, YYYY, hh:mm a')}
              </span>
              <br />
              <br />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {'Are you Sure?'}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    No
                  </Button>
                  <Button onClick={deletePost} color="primary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              <div id="editorContent">
                <Markdown source={realContent.toString()} escapeHtml={false} />
              </div>
            </>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
            <title>{postName} | Mano Sriram</title>
            <meta name="description" content={postName} />
        </Helmet>
        <Navbar />
        <div id="container">
          {spin ? (
            <div className="loader"></div>
          ) : (
            <>
              <h1 id="contentTitle">{content.title}</h1>
              <br />
              <span>
                {moment(content.createdOn).format('MMMM D, YYYY, hh:mm a')}
              </span>
              <br />
              <br />
              <div id="editorContent">
                <Markdown source={realContent.toString()} escapeHtml={false} />
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default Post;
