import { DevError } from './errors';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function getFiles(count) {
  if (count > alphabet.length)
    throw new DevError(`Max file size is ${alphabet.length}`);

  return alphabet.slice(0, count).split('');
}

function getRanks(count) {
  const ranks = [];
  for (let i = 1; i <= count; i++) ranks.push(i);
  return ranks;
}

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

export { getFiles, getRanks, getStartingPosition };
