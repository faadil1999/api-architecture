const fs = require("fs");
const path = require("path");

// Retrieve the folder name from command line arguments
const folderName = process.argv[2];

// Function to create the module
function createModule(folderName) {
  // Path to the src/contexts folder
  const contextsFolderPath = path.join(__dirname, "src", "contexts");
  // Path to the folder to create
  const folderPath = path.join(contextsFolderPath, folderName);

  // Check if the folder already exists
  if (fs.existsSync(folderPath)) {
    console.error(`The folder "${folderName}" already exists in src/contexts.`);
    process.exit(1);
  }

  // Create the folder
  fs.mkdirSync(folderPath);

  // Path to the TypeScript file to create
  const tsFilePath = path.join(folderPath, `index.ts`);

  // Content of the JavaScript file
  const tsFileContent = `console.log('Script in ${folderName}.js');`;

  // Create the TypeScript file
  fs.writeFileSync(tsFilePath, tsFileContent);

  /***************************** Inside Domains folder *************************** */
  // Path to the domains folder inside the created folder
  const domainsFolderPath = path.join(folderPath, "domains");

  // Create the domains folder
  fs.mkdirSync(domainsFolderPath);

  // Path to the types folder inside the domains folder
  const typesFolderPath = path.join(domainsFolderPath, "types");
  fs.mkdirSync(typesFolderPath);

  // Path to the errors folder inside the domains folder
  const errorsFolderPath = path.join(domainsFolderPath, "errors");
  fs.mkdirSync(errorsFolderPath);

  // Path to the TypeScript file inside domains/errors
  const tsErrorNotFoundFile = path.join(
    errorsFolderPath,
    `${folderName}-not-found.ts`
  );
  fs.writeFileSync(tsErrorNotFoundFile, `console.log('Error in ${folderName}-not-found.ts');`);

  /******************************Inside Infrastucture folder************************* */
  // Path to the infrastructure folder inside the created folder
  const infrastructureFolderPath = path.join(folderPath, "infrastructure");
  fs.mkdirSync(infrastructureFolderPath);

  // Path to the controller folder inside the Infrastructure folder
  const controllerFolderPath = path.join(
    infrastructureFolderPath,
    "controller"
  );
  fs.mkdirSync(controllerFolderPath);

  /*******Inside Controller (Start)**** */
  // Path to the TypeScript file (controller) inside controller
  const modelControllerFile = path.join(
    controllerFolderPath,
    `${folderName}.controller.ts`
  );
  fs.writeFileSync(modelControllerFile, `console.log('Controller in ${folderName}.controller.ts');`);

  // Path to the TypeScript file inside controller
  const indexFile = path.join(controllerFolderPath, `index.ts`);
  fs.writeFileSync(indexFile, `console.log('Index in controller');`);
  /*******Inside Controller (end)**** */

  // Path to the TypeScript injector file
  const injectorFile = path.join(
    infrastructureFolderPath,
    `${folderName}.injector.ts`
  );    
  fs.writeFileSync(injectorFile, `console.log('Injector in ${folderName}.injector.ts');`);

  // Path to the TypeScript route file 
  const routeFile = path.join(
    infrastructureFolderPath,
    `${folderName}.routes.ts`
  );
  fs.writeFileSync(routeFile, `console.log('Route in ${folderName}.routes.ts');`);

  // Path to the TypeScript repository file
  const repositoryFile = path.join(
    infrastructureFolderPath,
    `i-${folderName}-repository.ts`
  );
  fs.writeFileSync(repositoryFile, `console.log('Repository in i-${folderName}-repository.ts');`);

  // Path to the TypeScript index file for exporting injector and repository
  const indexFileRepository = path.join(
    infrastructureFolderPath,
    `index.ts`
  );
  fs.writeFileSync(indexFileRepository, `console.log('Index in infrastructure');`);

  /******************************Inside Use cases*********************************** */
  // Path to the use cases folder inside the created folder
  const useCasesFolderPath = path.join(folderPath, "use-cases");
  fs.mkdirSync(useCasesFolderPath);

  console.log(`Folder "${folderName}" created successfully in src/contexts.`);
  console.log(`Folder "domains" and its subfolders created inside.`);
  console.log(`Folder "infrastructure" and its subfolders created inside.`);
  console.log(`Folder "use-cases" created inside.`);
}

// Call the function to create the module
createModule(folderName);