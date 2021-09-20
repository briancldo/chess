import userCache from '../src/cache/user';
import matchCache from '../src/cache/match';

beforeEach(() => {
  expect.hasAssertions();
});

afterEach(() => {
  jest.clearAllMocks();
  userCache.clear();
  matchCache.clear();
});
