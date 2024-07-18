const { capitalizeFirstLetter } = require("../../helper.js");
const { pluralWord } = require("../../helper.js");

function generateRepositoryControllerModel(entityName) {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);
  return `
import { ${entityNameCapitalized}, ${entityNameCapitalized}Create,  ${entityNameCapitalized}Update } from '../domains/types'
export * from '../domains/errors';

export type ${entityNameCapitalized}Raw = ${entityNameCapitalized}
export type ${entityNameCapitalized}CreateRaw = ${entityNameCapitalized}Create
export type ${entityNameCapitalized}UpdateRaw = ${entityNameCapitalized}Update

export interface I${entityNameCapitalized}Repository {
    getAll${pluralWord(
      entityNameCapitalized
    )}(): Promise<${entityNameCapitalized}Raw[]>
    add${entityNameCapitalized}(${entityName}: ${entityNameCapitalized}Create): Promise<${entityNameCapitalized}Raw>
    get${entityNameCapitalized}(id: string): Promise<${entityNameCapitalized}Raw | null>
    update${entityNameCapitalized}(${entityName}: ${entityNameCapitalized}Update): Promise<${entityNameCapitalized}Raw>
    delete${entityNameCapitalized}(id: string): Promise<void>
}
    `;
}

module.exports = {
  generateRepositoryControllerModel,
};
