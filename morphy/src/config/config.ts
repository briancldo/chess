import objectGet from 'lodash/get';

import defaults from './defaults.json';
import { DevError } from '../utils/errors';

function get(path: string) {
  const value = objectGet(defaults, path);
  if (value === undefined) throw new DevError(`No such config path: ${path}`);

  return value;
}

export default { get };
