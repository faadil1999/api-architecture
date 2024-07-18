const { capitalizeFirstLetter } = require("../../helper");
const { pluralWord } = require("../../helper.js");

function generateInjectorModel(entityName) {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);
  return `
import { Router } from 'express'
import { ${entityNameCapitalized}Repository, RelationalDatabase } from '../../../infrastructure/database'
import { Add${entityNameCapitalized}UseCase, Get${entityNameCapitalized}UseCase, Update${entityNameCapitalized}UseCase, Delete${entityNameCapitalized}UseCase, Get${pluralWord(
    entityNameCapitalized
  )}UseCase } from '../use-cases'
import { ${entityName}Routes } from './${entityName}.routes'
import { ${entityNameCapitalized}Controller } from './controller'

export type ${entityNameCapitalized}ExternalDependencies = {
    database: RelationalDatabase
}

export const ${entityName}Injector = (externalDependencies: ${entityNameCapitalized}ExternalDependencies): Router => {
        const ${entityName}Repository = new ${entityNameCapitalized}Repository(externalDependencies.database)

        const get${pluralWord(
          entityNameCapitalized
        )}UseCase = new Get${pluralWord(
    entityNameCapitalized
  )}UseCase(${entityName}Repository)
        const add${entityNameCapitalized}UseCase = new Add${entityNameCapitalized}UseCase(${entityName}Repository)
        const get${entityNameCapitalized}UseCase = new Get${entityNameCapitalized}UseCase(${entityName}Repository)
        const delete${entityNameCapitalized}UseCase = new Delete${entityNameCapitalized}UseCase(${entityName}Repository)
        const update${entityNameCapitalized}UseCase = new Update${entityNameCapitalized}UseCase(${entityName}Repository)

        const ${entityName}Controller = new ${entityNameCapitalized}Controller(
            get${pluralWord(entityNameCapitalized)}UseCase,
            add${entityNameCapitalized}UseCase,
            get${entityNameCapitalized}UseCase,
            update${entityNameCapitalized}UseCase,
            delete${entityNameCapitalized}UseCase
        )

        return ${entityName}Routes(${entityName}Controller);
    }

    `;
}

module.exports = {
  generateInjectorModel,
};
