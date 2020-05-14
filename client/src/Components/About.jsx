import React from 'react';
import './Sc2.css';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';

const About = () => {
  const [isUser, checkUser] = React.useState(false);
  const fetchUser = async () => {
    const resp = await fetch('/auth/checkStat');
    const data = await resp.json();
    checkUser(data.scs);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
    <Helmet>
        <title>About: Mano Sriram</title>
        <meta name="description" content="About" />
    </Helmet>
      <Navbar createPost={isUser} />
      <div id="container">
        <p>
          Hello, My name is Mano Sriram and I'm an CS Undergraduate currently
          living in Vizag, India. I am passionate about Programming and I love
          solving problems that makes people's lives better.
        </p>
        <p>
          I started this blog to help people by sharing my thoughts on Tech
          (mostly) and Non-Tech topics. Also, to use this platform to share
          problem-sets that I faced.
        </p>
      <p>
        This site was built by me for <strong>US</strong>. You can view it's source code <a href="https://github.com/manosriram/Blog">HERE</a>.
      </p>
        <p>
          You can contact me via{' '}
          <a href="mailto:mano.sriram0@gmail.com">Email</a> ,{' '}
          <a href="https://www.linkedin.com/in/mano-sriram-866569166/">
            LinkedIN
          </a>{' '}
          or <a href="https://www.quora.com/profile/Mano-Sriram-3">Quora</a>.
        </p>
        <p>
          <a href="https://blogbucket.s3.ap-northeast-2.amazonaws.com/Resume.pdf">Resume</a>
        </p>
      </div>
    </>
  );
};

export default About;
