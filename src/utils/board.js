import { DevError } from './errors';
import config from '../config/config';

const { numberRanks, numberFiles } = config.get('board.dimensions');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

if (numberFiles > alphabet.length)
  throw new DevError(`Max file size is ${alphabet.length}`);

const files = alphabet.slice(0, numberFiles).split('');
const ranks = [];
for (let i = 1; i <= numberRanks; i++) ranks.push(i);
Object.freeze(files);
Object.freeze(ranks);

function getStartingPosition() {
  return [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [],
    [],
    [],
    [],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ];
}

export { files, ranks, getStartingPosition };
