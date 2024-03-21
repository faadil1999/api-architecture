const fs = require('fs');
const path = require('path');
const { generateConfigContent } = require('./template/generate-config-template.js');

// Function to create a file
function createFile(fileName, content = '') {
  fs.writeFileSync(fileName, content);
  console.log(`Fichier créé : ${fileName}`);
}

// Function to create a folder
function createDirectory(directoryName) {
  fs.mkdirSync(directoryName);
  console.log(`Dossier créé : ${directoryName}`);
}

// Api structure
const structure = {
  'src': {
    'contexts':{
        
    },
    'infrastructure':{
        'database': {
            'repositories': {}
        },
        'http': {

        },
        'index.ts': '//for exporting potentials models',
        'routes.ts': '//routes for all needed',
        'schema.prisma': '//prisma orm for easly manage database',
        'server.ts': '//for express js',
    },
    'config.ts': generateConfigContent(),
    'main.ts': '// main',
    '.env.example': 'DATABASE_URL=file:../../../db.development.sqlite'
  }
};

// File structure to create
function createFilesRecursively(currentPath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const newPath = path.join(currentPath, key);
    if (typeof value === 'string') {
      createFile(newPath, value);
    } else {
      createDirectory(newPath);
      createFilesRecursively(newPath, value);
    }
  }
}

// Start of structure creation
createFilesRecursively('.', structure);