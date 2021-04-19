export async function awaitAllPromises(asyncFunctions) {
  // eslint-disable-next-line compat/compat
  return Promise.all(asyncFunctions.map((func) => func()));
}
