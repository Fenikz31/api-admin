export default {
  /**
   *
   * @param { Array } array
   * @returns Merges array to an object.
   */
  MergeObject(array) {
    return array.reduce((a, b) => ({ ...a, ...b }), {});
  },

  removeDuplicates(array) {
    if (array === undefined) { return 'Missing parameter. It has to be a value of type Array'; }

    if (!Array.isArray(array)) { return 'Wrong parameter. It has to be a value of type Array'; }

    return [...new Set(array)];
  },
};
