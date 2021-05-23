import React from 'react';

import GameOver from './content/GameOver';
import config from '../../../config/config';
import './Sidebar.css';

const colors = config.get('square.colors')['default'];
const sidebarStyle = {
  backgroundColor: colors.lightComplement,
};

const Sidebar: React.FC = () => {
  return (
    <div className='board-sidebar' style={sidebarStyle}>
      <GameOver />
    </div>
  );
};

export default Sidebar;
