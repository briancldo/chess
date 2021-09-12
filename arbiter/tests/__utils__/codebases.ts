import fs from 'fs';
import path from 'path';

import { PackageJson } from './codebases.types';

const rootDir = '..';
const nonCodebaseFolders = [
  '.git',
  '.github',
  '.netlify',
  '.vscode',
  'dummy',
  'node_modules',
];

export const actualCodebases = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .filter((dir) => !nonCodebaseFolders.includes(dir.name))
  .map((dir) => dir.name);

export function getPackageJson(codebase: string): PackageJson {
  return require(path.join('../../../', codebase, 'package.json'));
}

function getAllPackageJsons() {
  const packageJsons: Record<string, PackageJson> = {};

  for (const codebase of actualCodebases) {
    packageJsons[codebase] = getPackageJson(codebase);
  }

  return packageJsons;
}
export const allPackageJsons = getAllPackageJsons();
