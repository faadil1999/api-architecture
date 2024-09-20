const fs = require("fs");
const path = require("path");

// ANSI code for red color for errors and warnings
const redColor = '\x1b[31m';  // Red for errors
const greenColor = '\x1b[32m';  // Green for success
const resetColor = '\x1b[0m';  // Reset to default color
const yellowColor = '\x1b[33m'; // Yellow for warnings (used instead of orange)
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

  // Verify if index.ts exist
  if (fs.existsSync(filePath)) {
    // Read the existing content of file
    const fileContent = fs.readFileSync(filePath, "utf-8");

    //Add the exportation new line to the existing content
    const newContent = `${fileContent}\n${exportStatement}`;

    // Write the new content inside the file
    fs.writeFileSync(filePath, newContent, "utf-8");

    console.log(`Le fichier ${filePath} a été mis à jour avec succès.`);
  } else {
    console.log(`Le fichier ${filePath} n'existe pas.`);
  }
}
/**
 * This function is for adding the external dependencies inside the route.ts
 *
 * @param string directory
 * @param string newValue
 * @param string stringToAdd
 * @param string entityName
 * 
 * @return void
 * 
 */
function replaceExternalDependencies(directory, newValue, stringToAdd, entityName) {
  const filePath = path.join(directory, 'routes.ts');
  if (fs.existsSync(filePath)) {
    console.log('inside replace external');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Erreur de lecture du fichier: ${err}`);
        return;
      }      
      // Regular expression to find "ExternalDependencies = null"
      const regexExternal = /ExternalDependencies\s*=\s*null/g;
      // Replace with the new value
      let result = data.replace(regexExternal, `ExternalDependencies = ${newValue}`);

      // Regular expression to find "import { Config } from '../config';"
      const regexImport = /import { Config } from ['"]\.\.\/config['"];(\r?\n)/;
      // Add the new string just below the import
      result = result.replace(regexImport, `import { Config } from '../config';$1${stringToAdd}$1`);

      // Regular expression to find "return [" and add the new route to the array
      const regexReturn = /return\s*\[\s*(\r?\n)/;
      const newRoute = `Router().use('/${pluralWord(entityName)}', ${entityName}Injector(externalDependencies)),$1`;
      result = result.replace(regexReturn, `return [
    ${newRoute}`);

      // Write the updated content to the file
      fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing to file: ${err}`);
          return;
        }
        console.log('Replacement successfully completed!');
      });
    });
  } else {
    console.log(`Le fichier ${filePath} n'existe pas.`);
  }
}

/**
 * Function to add a model in the schema.prisma file
 * 
 * @param string prismaPath 
 * @param string modelName 
 * @returns 
 */
function addPrismaModel(prismaPath, modelName) {
  // Construct the path to the Prisma file
  const filePath = path.join(prismaPath, 'schema.prisma');
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error(`The file ${filePath} does not exist.`);
    return;
  }

  // Read the Prisma file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }
    
    // The model to add
    const newModel = `
model ${capitalizeFirstLetter(modelName)} {
  id    String @id @default(uuid())
  // Add your fields here
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}\n`;

    // Append the new model to the end of the file
    const updatedData = data + newModel;

    // Write the modified content back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to file: ${err}`);
        return;
      }
      console.log(`Model '${modelName}' added successfully to ${filePath}`);
    });
  });
}


/**
 * Function for showing console SUCCESS
 * 
 * @param string message 
 */
function succesMessageConsole(message)
{
  console.log(`${greenColor}${message}${resetColor}`);
}
/**
 * Function for showing console ERROR
 * 
 * @param string message 
 */
function errorMessageConsole(message)
{
  console.log(`${redColor}${message}${resetColor}`);
}
/**
 * Function for showing console WARNING
 * 
 * @param string message 
 */
function warningMessageConsole(message)
{
  console.log(`${yellowColor}${message}${resetColor}`);
}


module.exports = {
  capitalizeFirstLetter,
  pluralWord,
  modifyIndexTs,
  replaceExternalDependencies,
  addPrismaModel,
  succesMessageConsole,
  errorMessageConsole,
  warningMessageConsole,
};
