import * as setters from './set';
import * as getters from './get';
import * as exists from './exists';
import * as remove from './remove';
import * as stats from './stats';

export default {
  ...setters,
  ...getters,
  ...exists,
  ...remove,
  ...stats,
};
