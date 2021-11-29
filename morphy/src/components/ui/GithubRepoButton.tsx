import React from 'react';
import { ReactComponent as GithubSvg } from './GithubLogo.svg';

import Button from './Button';

export default function GithubRepoButton() {
  return (
    <Button onClick={() => alert('asd')} className='github-repo-button'>
      <GithubSvg />
      <span style={{ alignSelf: 'center' }}>{'\t'}GitHub</span>
    </Button>
  );
}
