import React from 'react';
import { ReactComponent as GithubSvg } from './GithubLogo.svg';

import Button from './Button';

export default function GithubRepoButton() {
  return (
    <a href='https://github.com/briancldo/chess' target='_tab'>
      <Button className='github-repo-button'>
        <GithubSvg />
        <span>{'\t'}GitHub</span>
      </Button>
    </a>
  );
}
