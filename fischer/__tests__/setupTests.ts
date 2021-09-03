import userCache from '../src/cache/user';

beforeEach(() => {
  expect.hasAssertions();
});

afterEach(() => {
  jest.clearAllMocks();
  userCache.clear();
});
