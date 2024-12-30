import React from 'react';

import './Blog.css';

const About = () => {
  return (
    <div className="blog-text">
      {/* <h1>Abo</h1> */}
      <p>
        Well heck...
        <br />
        <br />
        Took you long enough to find this site and say hi!
        <br />
        <br />
        No, no, come in. I'm still in the process of getting the place all set up so forgive me if
        there ain't much to do just yet.
        <br />
        <br />
        Over on the sidebar is my collection of random side projects I've been toying around with.
        Also got there a few bits of writings that I scribbled down when feeling serious. Click
        around and see if anything takes your fancy. More detail is given in the README docs for
        each section.
        <br />
        <br />
        I'm not one for shameless self promotion, so if want to know more about me see my{' '}
        <a href="https://github.com/calamont">GitHub</a>,{' '}
        <a href="https://www.linkedin.com/in/callum-lamont">LinkedIn</a>, or{' '}
        <a href="https://www.google.com/search?q=callum+lamont">Google search results</a>.<br />
        <br />
        Have a merry day ✌️
        <br />
        Cal
      </p>
    </div>
  );
};

export default About;
