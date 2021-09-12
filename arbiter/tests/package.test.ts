// eslint-disable-next-line node/no-missing-import
import zip from 'lodash/zip';

import { getPackageJson, allPackageJsons } from './__utils__/codebases';
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

describe('consistent package versions across codebases', () => {
  test('socket.io', () => {
    expect(() => assertConsistentVersions('socket.io')).not.toThrow();
  });

  test('socket.io-client', () => {
    expect(() => assertConsistentVersions('socket.io-client')).not.toThrow();
  });
});

function assertConsistentVersions(packageName: string) {
  const versions = [];
  const relevantCodebases = [];

  for (const codebase of codebases) {
    const packageJson = allPackageJsons[codebase];
    if (!packageJson) throw new Error(`No package.json for ${codebase}`);

    const version =
      packageJson.dependencies[packageName] ||
      packageJson.devDependencies[packageName];
    if (version) {
      versions.push(version);
      relevantCodebases.push(codebase);
    }
  }

  if (new Set(versions).size !== 1) {
    throw new Error(
      `Inconsistent ${packageName} versions: ${JSON.stringify(
        zip(relevantCodebases, versions),
        null,
        2
      )}`
    );
  }
  return true;
}
