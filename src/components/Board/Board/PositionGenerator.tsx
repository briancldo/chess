import React, { useState } from 'react';

import { Board } from '../../../utils/board/board.types';
import {
  createBoard,
  createConciseFromPosition,
} from '../../../utils/board/editor/boardEditor';
import { useRedirect } from '../../../pages/utils/navigation';
import Button from '../../ui/Button';

import EditableBoard from './EditableBoard';
import './PositionGenerator.css';
import { GameLocationState } from '../../../pages/utils/routes';

const emptyBoard = createBoard({ position: {} });
const PositionGenerator: React.FC = () => {
  const [board, setBoard] = useState(emptyBoard);
  const navigateToGame = useRedirect('game');

  function startGameWithBoard() {
    const side = prompt('Side? w/b')?.toLowerCase();
    if (side === 'w' || side === 'b')
      navigateToGame({}, {
        board: createBoard({
          position: createConciseFromPosition(board.position),
          state: { turn: side },
        }),
      } as GameLocationState);
  }

  return (
    <div className='position-generator'>
      <div className='position-generator-left-column'>
        {process.env.NODE_ENV === 'development' && (
          <GeneratorSection board={board} />
        )}
      </div>
      <div className='position-generator-center-column'>
        <EditableBoard {...{ board, setBoard }} />
      </div>
      <div className='position-generator-right-column'>
        <Button onClick={startGameWithBoard}>Play from position</Button>
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
