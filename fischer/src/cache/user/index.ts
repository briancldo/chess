import * as setters from './set';
import * as getters from './get';
import * as exists from './exists';
import * as remove from './remove';
import * as stats from './stats';

const userCache = {
  ...setters,
  ...getters,
  ...exists,
  ...remove,
  ...stats,
};
export default userCache;
