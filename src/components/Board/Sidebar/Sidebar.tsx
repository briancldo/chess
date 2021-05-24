import React from 'react';

import GameOver from './content/GameOver';
import config from '../../../config/config';
import { SidebarProps } from './Sidebar.types';
import './Sidebar.css';

const colors = config.get('square.colors')['default'];
const sidebarStyle = {
  backgroundColor: colors.lightComplement,
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className='board-sidebar' style={sidebarStyle}>
      <GameOver handlers={props.handlers} />
    </div>
  );
};

export default Sidebar;

export const SidebarSpacer: React.FC = () => {
  return <div className='board-sidebar-spacer' />;
};
