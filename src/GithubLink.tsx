import * as React from "react";

import GithubIcon from "./githubIcon.svg";

interface GithubLinkProps {}

export const GithubLink: React.FC<GithubLinkProps> = () => (
  <a href="https://github.com/snelsi/checkwave-react" target="_blank" rel="noreferrer noopener">
    <img src={GithubIcon} alt="Github" />
  </a>
);
