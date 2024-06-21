const { capitalizeFirstLetter } = require("../../helper.js");

function generateModelRepositoryCode(
  entityName,
  entityCreateRaw,
  entityRaw,
  entityUpdate
) {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);

  return ` 
    import { ${entityName}, ${entityNameCapitalized}Update, I${entityNameCapitalized}Repository,  ${entityNameCapitalized}NotFoundError, ${entityNameCapitalized}Raw, } from '../../../../contexts/recipe/domains/types';
    import { RelationalDatabase } from '../../database';
    import { to${entityNameCapitalized}Raw } from './${entityName}.mapper';
    import { Prisma } from '@prisma/client';
    
export class ${entityNameCapitalized}Repository implements I${entityNameCapitalized}Repository {
  constructor(private readonly database: RelationalDatabase) { }

  async add${entityNameCapitalized}(${entityCreateRaw}: ${entityNameCapitalized}CreateRaw): Promise<${entityNameCapitalized}Raw> {
    // Add a new ${entityName}
    const new${entityNameCapitalized} = await this.database.client.${entityName}.create({
      data: ${entityCreateRaw},
      include: {
         // if needed
      }
    });
    return to${entityNameCapitalized}Raw(new${entityNameCapitalized});
  }

  async getAll${entityNameCapitalized}s(): Promise<${entityNameCapitalized}Raw[]> {
    // Get all ${entityName}s
    const ${entityName}s = await this.database.client.${entityName}.findMany({
      include: {
         // if needed
      }
    });
    return ${entityName}s.map(to${entityNameCapitalized}Raw);
  }

  async get${entityNameCapitalized}(id: string): Promise<${entityName} | null> {
    // Get a single ${entityName} by ID
    const ${entityName} = await this.database.client.${entityName}.findUnique({ where: { id } });
    return ${entityName} ? to${entityNameCapitalized}Raw(${entityName}) : null;
  }

  async delete${entityNameCapitalized}(id: string): Promise<void> {
    // Delete a ${entityName} by ID
    try {
      await this.database.client.${entityName}.delete({ where: { id } });
    } catch (error) {
      // Handle errors
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2025') {
        throw error;
      }
    }
  }

  async update${entityNameCapitalized}(${entityUpdate}: ${entityNameCapitalized}Update): Promise<${entityName}Raw> {
    // Update a ${entityName} by ID
    const ${entityName}Updated = await this.database.client.${entityName}.update({
      where: { id: ${entityUpdate}.id },
      data: ${entityUpdate},
      //include: //if needed
    });
    return to${entityNameCapitalized}Raw(${entityName}Updated);
  }
}`;
}

module.exports = {
  generateModelRepositoryCode,
};
