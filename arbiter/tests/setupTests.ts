beforeEach(() => {
  expect.hasAssertions();
});

afterEach(() => {
  jest.clearAllMocks();
});

import codebases from '../codebases.json';
import { actualCodebases } from './__utils__/codebases';

test('checks codebases list', async () => {
  expect(actualCodebases.sort()).toEqual(codebases.sort());
});
