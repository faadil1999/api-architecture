function generateMainTemplate(configImportPath = './config', relationalDatabaseImportPath = './infrastructure/database/database', externalDependenciesImportPath = './infrastructure/routes', serverImportPath = './infrastructure/server') {
    return `
import { config } from '${configImportPath}';
import { RelationalDatabase } from '${relationalDatabaseImportPath}';
import { ExternalDependencies } from '${externalDependenciesImportPath}';
import { Server } from '${serverImportPath}';

const port = process.env.PORT || '3002'; // Default port 3002

// Update port configuration
config.server.port = parseInt(port, 10);

(async () => {
  process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
  });

  const database = new RelationalDatabase(config);
  const externalDependencies: ExternalDependencies = {
    database
  };

  const server: Server = new Server(config);
  await server.init(externalDependencies);

  await server.start();
})();
`;
}

module.exports = {
    generateMainTemplate
  }