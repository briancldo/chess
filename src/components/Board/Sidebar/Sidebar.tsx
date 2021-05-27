import React from 'react';

import GameOver from './content/GameOver';
import config from '../../../config/config';
import { SidebarProps } from './Sidebar.types';
import './Sidebar.css';
import { SidebarDeterminantContext, SidebarType } from './Sidebar.types';

const colors = config.get('square.colors')['default'];
const sidebarStyle = {
  backgroundColor: colors.lightComplement,
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { result, handlers } = props;
  const sidebarContext = { result };
  const SidebarContent = getSidebarType(sidebarContext);

  if (!SidebarContent) return null;
  return (
    <div className='board-sidebar' style={sidebarStyle}>
      <SidebarContent handlers={handlers} context={sidebarContext} />
    </div>
  );
};

export default Sidebar;

export const SidebarSpacer: React.FC<Partial<SidebarProps>> = (props) => {
  const { result } = props;
  const SidebarContent = getSidebarType({ result });

  if (!SidebarContent) return null;
  return <div className='board-sidebar-spacer' />;
};

function getSidebarType(
  context: SidebarDeterminantContext
): SidebarType | null {
  if (context.result) return GameOver;
  return null;
}
