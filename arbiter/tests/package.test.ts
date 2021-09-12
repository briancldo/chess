import { getPackageJson } from './__utils__/codebases';

import codebases from '../codebases.json';

for (const codebase of codebases) {
  describe(`${codebase} - package.json`, () => {
    const packageJson = getPackageJson(codebase);

    test('no range operators in dependencies', () => {
      for (const deps of [
        packageJson.dependencies,
        packageJson.devDependencies,
      ])
        for (const version of Object.values(deps)) {
          expect(version).not.toMatch(/\^|~|\*|x/);
        }
    });
  });
}
