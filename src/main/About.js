import React from 'react';
import { Link } from 'react-router-dom';

import './Blog.css';

const META_DESCRIPTION = `
Who is Callum Lamont? I am software engineer from Australia.
I have a PhD in biomedical engineering, but now build backends for systems that 
have nothing to do with biomedical engineering.
`;
const META_KEYWORDS =
  'Callum Lamont, Callum, calamont, cal_lamont, Melbourne, Australia, software, engineer';

const About = () => {
  return (
    <div className="blog-text">
      <meta name="keywords" property="og:keywords" content={META_KEYWORDS} />
      <meta name="description" property="og:description" content={META_DESCRIPTION} />
      <p>
        Hey 👋 I'm Callum, A software engineer from Melbourne, Australia.
        <br />
        <br />
        First, a quick bio. After my undergrad I moved to London for a PhD in Biomedical
        Engineering. This was a great experience, but I decided academia was not for me. So I
        transitioned to a job in machine learning at a startup. Now I am a backend software engineer
        and genuinely love learning about databases, clean code, vim, and how to not let stand ups
        blow out to 40 minutes every morning.
        <br />
        <br />I also love playing guitar, learning spanish, and cooking. Hit me up if you're ever in
        Melbourne!
      </p>
      <h2>Things I've written</h2>
      <h4>Software and tech</h4>
      <ul>
        <li>
          <Link to="/blog">My personal blog</Link>
        </li>
        <li>
          <a href="https://technology.complyadvantage.com/four-concepts-to-get-started-with-elasticsearch/">
            4 concepts to get started with Elasticsearch
          </a>
        </li>
        <li>
          <a href="https://dev.to/calamont/how-to-setup-vim-for-kotlin-development-4eoc">
            How to Setup Vim for Kotlin Development
          </a>
        </li>
      </ul>
      <h4>Academia</h4>
      <ul>
        <li>
          <a href="https://iopscience.iop.org/article/10.1088/1741-2552/abf0d6">
            Silicone encapsulation of thin-film SiOx, SiOxNy and SiC for modern electronic medical
            implants: A comparative long-term ageing study
          </a>
        </li>
        <li>
          <a href="https://discovery.ucl.ac.uk/id/eprint/10100135/">
            Non-Hermetic Protection of Thin-Film Metallisation Layers Intended for Implanted
            Electronic Medical Devices
          </a>
        </li>
        <li>
          <a href="https://ieeexplore.ieee.org/document/8717034">
            A Bayesian Demonstration of Reliability for Encapsulated Implanted Electronics
          </a>
        </li>
        <li>
          <a href="https://www.researchgate.net/publication/272405631_Tuning_the_viscosity_of_halogen_free_bulk_heterojunction_inks_for_inkjet_printed_organic_solar_cells">
            Tuning the viscosity of halogen free bulk heterojunction inks for inkjet printed organic
            solar cells
          </a>
        </li>
      </ul>
      <h2>Contact</h2>
      <ul>
        <li>
          <a href="https://github.com/calamont">GitHub</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/callum-lamont">LinkedIn</a>
        </li>
      </ul>
    </div>
  );
};

export default About;
