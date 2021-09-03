import React from 'react';
import config from '../../config/config';

const DebugInfo: React.FC = () => {
  const { environment } = config;

  return (
    <>
      {environment !== 'production' && (
        <p id='env' hidden>
          {environment}
        </p>
      )}
    </>
  );
};

export default DebugInfo;
