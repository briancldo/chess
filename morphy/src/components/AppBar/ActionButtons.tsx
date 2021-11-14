import React from 'react';
import useUserStore from '../../store/user';

import LoginSection from '../Login/LoginSection';
import ChallengeButton from '../misc/ChallengeButton';
import PingButton from '../misc/PingButton';
import config from '../../config/config';

import './AppActionButtons.css';

const { environment } = config;

const ActionButtons: React.FC = () => {
  const { isLoggedIn } = useUserStore();

  return (
    <div className='app-action-buttons'>
      {environment !== 'production' && <PingButton />}
      {isLoggedIn && <ChallengeButton />}
      <LoginSection />
    </div>
  );
};

export default ActionButtons;
