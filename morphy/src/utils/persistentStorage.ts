import { APP_NAME } from './constants/app.constants';

type Key = ''; // add keys here
type PrimitiveValue = string | number | boolean;
type Value = PrimitiveValue | PrimitiveValue[] | Record<string, PrimitiveValue>;

type StorageDefaults = { [key in Key]?: Value };
const defaults: StorageDefaults = {};

// this function must have an overload for each key to specify the value's type
function persistentStorageGet(key: Key): Value {
  const itemStringified = localStorage.getItem(`${APP_NAME}-${key}`);
  const item = itemStringified ? JSON.parse(itemStringified) : defaults[key];
  if (item == null) throw new Error(`No saved ${key}`);

  return item;
}

function persistentStorageSet(key: Key, value: Value) {
  return localStorage.setItem(`${APP_NAME}-${key}`, JSON.stringify(value));
}

const persistentStorage = {
  get: persistentStorageGet,
  set: persistentStorageSet,
};

export default persistentStorage;
