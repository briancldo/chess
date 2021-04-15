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

export { getFiles, getRanks };
