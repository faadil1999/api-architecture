const fs = require("fs");
const path = require("path");
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

/**
 * Function only for index files for adding new export if index file exist
 *
 * @param string directory
 * @param string exportStatement
 *
 * @return void
 */
function modifyIndexTs(directory, exportStatement) {
  const filePath = path.join(directory, "index.ts");

  // Vérifier si le fichier index.ts existe
  if (fs.existsSync(filePath)) {
    // Lire le contenu existant du fichier
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Ajouter la nouvelle ligne d'exportation au contenu existant
    const newContent = `${fileContent}\n${exportStatement}`;

    // Écrire le nouveau contenu dans le fichier
    fs.writeFileSync(filePath, newContent, "utf-8");

    console.log(`Le fichier ${filePath} a été mis à jour avec succès.`);
  } else {
    console.log(`Le fichier ${filePath} n'existe pas.`);
  }
}

module.exports = {
  capitalizeFirstLetter,
  pluralWord,
  modifyIndexTs,
};
