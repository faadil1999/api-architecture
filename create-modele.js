const fs = require("fs");
const path = require("path");
const { pluralWord } = require("./helper.js");
const {
  generateMapperContent,
} = require("./template/model-template/generate-mapper.js");
const {
  generateModelRepositoryCode,
} = require("./template/model-template/generate-repository-model.js");

const {
  generateGetAllCase,
} = require("./template/model-template/use-cases/generate-get-all.js");

const {
  generateGetOneCase,
} = require("./template/model-template/use-cases/generate-get-one.js");

const {
  generateDeleteCase,
} = require("./template/model-template/use-cases/generate-get-delete.js");

const {
  generateAddOne,
} = require("./template/model-template/use-cases/generate-add-one.js");

const {
  generateType,
} = require("./template/model-template/domains/type/generate-type-model.js");

const {
  generateController,
} = require("./template/model-template/controller/generate-controller.js");

// Function to create or pre-fill a TypeScript file
function createOrPreFillFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.error(`The file "${filePath}" already exists.`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(`File "${filePath}" created successfully.`);
}

// Retrieve the folder name from command line arguments
const folderName = process.argv[2];
const entityName = folderName;
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
  const indexFileDomaine = path.join(domainsFolderPath, "index.ts");
  fs.writeFileSync(
    indexFileDomaine,
    `export * from './errors';
export * from './types';
    `
  );

  // Path to the types folder inside the domains folder
  const typesFolderPath = path.join(domainsFolderPath, "types");
  fs.mkdirSync(typesFolderPath);
  const modelType = path.join(typesFolderPath, `${entityName}.ts`);
  fs.writeFileSync(modelType, generateType(entityName));

  const indexType = path.join(typesFolderPath, "index.ts");
  fs.writeFileSync(indexType, `export * from './${entityName}'`);

  // Path to the errors folder inside the domains folder
  const errorsFolderPath = path.join(domainsFolderPath, "errors");
  fs.mkdirSync(errorsFolderPath);

  // Path to the TypeScript file inside domains/errors
  const tsErrorNotFoundFile = path.join(
    errorsFolderPath,
    `${folderName}-not-found.ts`
  );
  fs.writeFileSync(
    tsErrorNotFoundFile,
    `console.log('Error in ${folderName}-not-found.ts');`
  );

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
  fs.writeFileSync(modelControllerFile, generateController(entityName));

  // Path to the TypeScript file inside controller
  const indexFile = path.join(controllerFolderPath, `index.ts`);
  fs.writeFileSync(indexFile, `export * from './${entityName}.controller'`);
  /*******Inside Controller (end)**** */

  // Path to the TypeScript injector file
  const injectorFile = path.join(
    infrastructureFolderPath,
    `${folderName}.injector.ts`
  );
  fs.writeFileSync(
    injectorFile,
    `console.log('Injector in ${folderName}.injector.ts');`
  );

  // Path to the TypeScript route file
  const routeFile = path.join(
    infrastructureFolderPath,
    `${folderName}.routes.ts`
  );
  fs.writeFileSync(
    routeFile,
    `console.log('Route in ${folderName}.routes.ts');`
  );

  // Path to the TypeScript repository file
  const repositoryFile = path.join(
    infrastructureFolderPath,
    `i-${folderName}-repository.ts`
  );
  fs.writeFileSync(
    repositoryFile,
    `console.log('Repository in i-${folderName}-repository.ts');`
  );

  // Path to the TypeScript index file for exporting injector and repository
  const indexFileRepository = path.join(infrastructureFolderPath, `index.ts`);
  fs.writeFileSync(
    indexFileRepository,
    `console.log('Index in infrastructure');`
  );

  /******************************Inside Use cases*********************************** */
  // Path to the use cases folder inside the created folder
  const useCasesFolderPath = path.join(folderPath, "use-cases");
  fs.mkdirSync(useCasesFolderPath);

  /****************************use cases***************** */
  /****Get All** */
  const useCaseGetAll = path.join(
    useCasesFolderPath,
    `get-${pluralWord(folderName)}`
  );
  fs.mkdirSync(useCaseGetAll);
  /***Files inside** */
  const caseGetAllFile = path.join(
    useCaseGetAll,
    `get-${pluralWord(folderName)}.use-case.ts`
  );
  fs.writeFileSync(caseGetAllFile, generateGetAllCase(entityName));
  const indexGelAllFile = path.join(useCaseGetAll, "index.ts");
  fs.writeFileSync(
    indexGelAllFile,
    `export * from './get-${pluralWord(entityName)}.use-case'`
  );

  /****Get one** */
  const useCaseGetOne = path.join(useCasesFolderPath, `get-${folderName}`);
  fs.mkdirSync(useCaseGetOne);

  /***Files inside** */
  const caseGetOneFile = path.join(
    useCaseGetOne,
    `get-${folderName}.use-case.ts`
  );
  fs.writeFileSync(caseGetOneFile, generateGetOneCase(entityName));

  const indexGetOneFile = path.join(useCaseGetOne, "index.ts");
  fs.writeFileSync(
    indexGetOneFile,
    `export * from './get-${entityName}.use-case'`
  );

  /****Delete ***/
  const useCaseDelete = path.join(useCasesFolderPath, `delete-${folderName}`);
  fs.mkdirSync(useCaseDelete);
  /***Files inside* */
  const caseDeleteFile = path.join(
    useCaseDelete,
    `delete-${folderName}.use-case.ts`
  );
  fs.writeFileSync(caseDeleteFile, generateDeleteCase(entityName));

  const indexDeleteFile = path.join(useCaseDelete, "index.ts");
  fs.writeFileSync(
    indexDeleteFile,
    `export * from './delete-${entityName}.use-case`
  );

  /****Add one*** */
  const useCaseAddOne = path.join(useCasesFolderPath, `add-${entityName}`);
  fs.mkdirSync(useCaseAddOne);
  /***Files inside** */
  const caseAddOneFile = path.join(
    useCaseAddOne,
    `add-${entityName}.use-case.ts`
  );
  fs.writeFileSync(caseAddOneFile, generateAddOne(entityName));

  const indexAddOneFile = path.join(useCaseAddOne, "index.ts");
  fs.writeFileSync(
    indexAddOneFile,
    `export * from './add-${entityName}.use-case'`
  );

  /******************************Infrastructure that is inside database folder********* */
  const infrastructureDatabaseFolderPath = path.join(
    __dirname,
    "src/infrastructure/database/repositories",
    `${folderName}`
  );
  fs.mkdirSync(infrastructureDatabaseFolderPath);

  /****************************** Files Infrastructure(database)********************* */
  // Path to the TypeScript mapper file
  const mapperFileRepository = path.join(
    infrastructureDatabaseFolderPath,
    `${folderName}.mapper.ts`
  );

  createOrPreFillFile(mapperFileRepository, generateMapperContent(folderName));

  // Path to the TypeScript mapper file
  const repositoryFileRepository = path.join(
    infrastructureDatabaseFolderPath,
    `${folderName}.repository.ts`
  );
  fs.writeFileSync(
    repositoryFileRepository,
    generateModelRepositoryCode(folderName)
  );

  // Path to the TypeScript index file for exporting injector and repository
  const indexInfrastructureRepository = path.join(
    infrastructureDatabaseFolderPath,
    `index.ts`
  );
  fs.writeFileSync(
    indexInfrastructureRepository,
    `export * from './${folderName}.repository'`
  );

  console.log(`Folder "${folderName}" created successfully in src/contexts.`);
  console.log(`Folder "domains" and its subfolders created inside.`);
  console.log(`Folder "infrastructure" and its subfolders created inside.`);
  console.log(`Folder "use-cases" created inside.`);
}

// Call the function to create the module
createModule(folderName);
