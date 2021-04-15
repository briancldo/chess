import React from 'react';

import config from '../../config/config';
const colorScheme = config.get('square.colors.default');

export default function Square(props) {
  const { light } = props;
  const color = colorScheme[light ? 'light' : 'dark'];

  return (
    <svg width='5vw' height='5vw'>
      <rect width='5vw' height='5vw' style={{ fill: color }} />
    </svg>
  );
}
