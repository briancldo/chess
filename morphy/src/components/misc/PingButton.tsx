import React from 'react';

import { ping } from '../../backend/ws/utils';
import Button from '../ui/Button';

const PingButton: React.FC = () => {
  return <Button onClick={ping}>Ping</Button>;
};

export default PingButton;
