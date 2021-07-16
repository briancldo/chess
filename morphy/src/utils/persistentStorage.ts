import { APP_NAME } from './constants/app.constants';

type Key = 'session-active';
type PrimitiveValue = string | number | boolean;
type Value = PrimitiveValue | PrimitiveValue[] | Record<string, PrimitiveValue>;

type StorageDefaults = { [key in Key]: Value };
const defaults: StorageDefaults = {
  'session-active': false,
};

function persistentStorageGet(key: 'session-active'): boolean;
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
