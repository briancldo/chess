import React, { useState } from 'react';

import { Board } from '../../../utils/board/board.types';
import {
  createBoard,
  createConciseFromPosition,
  createFromConcisePosition,
} from '../../../utils/board/boardEditor';

import EditableBoard from './EditableBoard';
import './PositionGenerator.css';

const emptyBoard = createBoard({ position: createFromConcisePosition({}) });
const PositionGenerator: React.FC = () => {
  const [board, setBoard] = useState(emptyBoard);

  return (
    <div className='position-generator'>
      <div className='position-generator-side-column'></div>
      <div className='position-generator-center-column'>
        <EditableBoard {...{ board, setBoard }} />
      </div>
      <div className='position-generator-side-column'>
        <GeneratorSection board={board} />
      </div>
    </div>
  );
};

export default PositionGenerator;

interface GeneratorSectionProps {
  board: Board;
}

const GeneratorSection: React.FC<GeneratorSectionProps> = (props) => {
  const { board } = props;
  const concisePosition = createConciseFromPosition(board.position);

  return (
    <textarea
      className='position-generator-textarea'
      value={JSON.stringify(concisePosition, null, 2)}
      readOnly
    />
  );
};
