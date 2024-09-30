const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const {
  generateConfigContent,
} = require("./template/generate-config-template.js");
const {
  generateRelationalDatabaseTemplate,
} = require("./template/generate-database-infrastructure-template.js");
const {
  generateHttpResponseTemplate,
} = require("./template/generate-response.template");
const {
  generateServerTemplate,
} = require("./template/generate-server.template.js");
const {
  generateRoutesTemplate,
} = require("./template/generate-route-template.js");
const {
  generateMainTemplate,
} = require("./template/generate-main-template.js");
const {
  generatePrismaSchemaTemplate,
} = require("./template/generate-prisma-template.js");

// Function to create a file
function createFile(fileName, content = "") {
  fs.writeFileSync(fileName, content);
  console.log(`File : ${fileName} created`);
}

// Function to create a folder
function createDirectory(directoryName) {
  fs.mkdirSync(directoryName);
  console.log(`Folder : ${directoryName} created`);
}

// Api structure
const structure = {
  src: {
    contexts: {},
    infrastructure: {
      database: {
        repositories: {
          "index.ts":'',
        },
        "database.ts": generateRelationalDatabaseTemplate("../../config"),
        "index.ts": `export * from './repositories';
        export * from "./database";`,
        "schema.prisma": generatePrismaSchemaTemplate(),
      },
      http: {
        "index.ts": "export * from './response'",
        "response.ts": generateHttpResponseTemplate(),
      },
      "index.ts": "export * from './database'",
      "routes.ts": generateRoutesTemplate(),
      "server.ts": generateServerTemplate(),
    },
    "config.ts": generateConfigContent(),
    "main.ts": generateMainTemplate(),
  },
  ".env.example": "DATABASE_URL=file:../../../db.development.sqlite",
};

// File structure to create
function createFilesRecursively(currentPath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const newPath = path.join(currentPath, key);
    if (typeof value === "string") {
      createFile(newPath, value);
    } else {
      createDirectory(newPath);
      createFilesRecursively(newPath, value);
    }
  }
}

// Start of structure creation
createFilesRecursively(".", structure);

// Install prisma as a development dependency
exec("npm install prisma --save-dev", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing Prisma: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});

// Install cross_env as a development dependency
exec("npm install cross-env --save-dev", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing cross-env: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});

const red = "\x1b[31m";
const reset = "\x1b[0m";

console.log(`${red}
  █████       ▒▄▄▄       ██▀███  ▄████▄   ██░ ██  ██▓
▓██   ▒       ▒████▄    ▓██ ▒ ██▒██▀ ▀█  ▓██░ ██▒▓██▒
▒████ ░       ▒██  ▀█▄  ▓██ ░▄█ ▒▓█    ▄ ▒██▀▀██░▒██▒
░▓█▒  ░ ▄▄▄▄  ░██▄▄▄▄██ ▒██▀▀█▄ ▒▓▓▄ ▄██▒░▓█ ░██ ░██░
░▒█░           ▓█   ▓██▒░██▓ ▒██▒ ▓███▀ ░░▓█▒░██▓░██░
 ▒ ░           ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ░▒ ▒  ░ ▒ ░░▒░▒░▓  
 ░              ▒   ▒▒ ░  ░▒ ░ ▒░ ░  ▒    ▒ ░▒░ ░ ▒ ░
 ░ ░            ░   ▒     ░░   ░░         ░  ░░ ░ ▒ ░
                 ░  ░   ░    ░ ░       ░  ░  ░ ░  
                                 ░
${reset}`);
