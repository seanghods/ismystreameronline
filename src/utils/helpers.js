export function removeUndefinedValues(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value !== undefined) // eslint-disable-line no-unused-vars
    .reduce((newObj, [key, value]) => ({ ...newObj, [key]: value }), {});
}
