//database infrastructure template

function generateRelationalDatabaseTemplate(configImportPath) {
    return `
import { PrismaClient } from '@prisma/client';
import { Config } from '${configImportPath}';

export class RelationalDatabase {
  client: PrismaClient;

  constructor(config: Config) {
    this.client = new PrismaClient({ datasources: { db: { url: config.database.url } } });
  }

  async getHealth() {
    await this.client.$queryRaw\`SELECT VERSION()\`;
  }
}
`;
}

module.exports = {
    generateRelationalDatabaseTemplate
  }