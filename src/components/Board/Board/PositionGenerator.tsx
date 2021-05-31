import React from 'react';

import EditableBoard from './EditableBoard';
import './PositionGenerator.css';

const PositionGenerator: React.FC = () => {
  return (
    <div className='position-generator'>
      <div className='position-generator-side-column'></div>
      <div className='position-generator-center-column'>
        <EditableBoard />
      </div>
      <div className='position-generator-side-column'></div>
    </div>
  );
};

export default PositionGenerator;
