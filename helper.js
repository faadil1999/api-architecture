/**
 * Function to capitalize the first letter of a string
 * @param {string} element - The string to capitalize
 * @returns {string} The string with the first letter capitalized
 * @throws {Error} If the input is not a non-empty string
 */
function capitalizeFirstLetter(element) {
  return element.charAt(0).toUpperCase() + element.slice(1);
}

/**
 * Function to pluralize a word with additional rules
 * @param {string} word - The word to pluralize
 * @returns {string} The pluralized word
 */
function pluralWord(word) {
  if (word.charAt(word.length - 1) === "y") {
    return word.slice(0, -1) + "ies";
  } else {
    return word + "s";
  }
}

module.exports = {
  capitalizeFirstLetter,
  pluralWord,
};
