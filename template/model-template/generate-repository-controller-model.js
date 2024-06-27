const { capitalizeFirstLetter } = require("../../helper.js");
const { pluralWord } = require("../../helper.js");

function generateRepositoryControllerModel(entityName) {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);
  return `
import { ${entityNameCapitalized}, ${entityNameCapitalized}Create } from '../domains/types'
export * from '../domains/errors';

export type ${entityNameCapitalized}Raw = ${entityNameCapitalized}
export type ${entityNameCapitalized}CreateRaw = ${entityNameCapitalized}

export interface I${entityNameCapitalized}Repository {
    getAll${pluralWord(
      entityNameCapitalized
    )}(): Promise<${entityNameCapitalized}Raw[]>
    add${entityNameCapitalized}(${entityName}: ${entityNameCapitalized}Create): Promise<${entityNameCapitalized}Raw>
    get${entityNameCapitalized}(id: string): Promise<${entityNameCapitalized}Raw | null>
    delete${entityNameCapitalized}(id: string): Promise<void>
}
    `;
}

module.exports = {
  generateRepositoryControllerModel,
};
