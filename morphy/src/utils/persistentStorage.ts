import { APP_NAME } from './constants/app.constants';

type Key = 'is-connected';
type PrimitiveValue = string | number | boolean;
type Value = PrimitiveValue | PrimitiveValue[] | Record<string, PrimitiveValue>;

function persistentStorageGet(key: 'is-connected'): boolean;
function persistentStorageGet(key: Key): Value {
  const item = localStorage.getItem(`${APP_NAME}-${key}`);
  if (item == null) throw new Error(`No saved ${key}`);

  if (key === 'is-connected') return JSON.parse(item) as boolean;
  return item as never;
}

function persistentStorageSet(key: Key, value: Value) {
  return localStorage.setItem(`${APP_NAME}-${key}`, JSON.stringify(value));
}

const persistentStorage = {
  get: persistentStorageGet,
  set: persistentStorageSet,
};

export default persistentStorage;
