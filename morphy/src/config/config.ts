import objectGet from 'lodash/get';
import { DevError } from '../utils/errors';

import defaults from './defaults.json';
import developmentConfig from './development.json';
import productionConfig from './production.json';

const env = process.env.NODE_ENV;

const envConfigMapping: {
  [env in 'development' | 'production' | 'test']?: Record<string, unknown>;
} = {
  development: developmentConfig,
  production: productionConfig,
};
const envConfig = envConfigMapping[env];

function get(path: string) {
  const value = objectGet(envConfig, path) ?? objectGet(defaults, path);
  if (value) return value;

  throw new DevError(`No such config path: ${path}`);
}

export default { get };
