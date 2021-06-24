import React from 'react';

import GameOver from './content/GameOver';
import GameActive from './content/GameActive';
import config from '../../../config/config';
import { SidebarProps, SidebarSpacerProps, SidebarType } from './Sidebar.types';
import './Sidebar.css';

const colors = config.get('square.colors')['default'];
const sidebarStyle = {
  backgroundColor: colors.lightComplement,
};
const sidebarsByType: { [type in SidebarType]: React.FC<SidebarProps> } = {
  'game-over': GameOver as React.FC<SidebarProps>,
  'game-active': GameActive as React.FC<SidebarProps>, // TODO: update to GameActive
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { type } = props;
  const SidebarContent = sidebarsByType[type];

  return (
    <div className='board-sidebar' style={sidebarStyle}>
      <SidebarContent {...props} />
    </div>
  );
};

export default Sidebar;

export const SidebarSpacer: React.FC<SidebarSpacerProps> = (props) => {
  const { active } = props;

  if (!active) return null;
  return <div className='board-sidebar-spacer' />;
};
