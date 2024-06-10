const { capitalizeFirstLetter } = require("../../../helper");
const { pluralWord } = require("../../../helper");

function generateAddOne(entityName) {
  return `
import { ${capitalizeFirstLetter(entityName)}, ${capitalizeFirstLetter(
    entityName
  )}Create } from '../../domains/types'
import { I${capitalizeFirstLetter(
    entityName
  )}Repository } from '../../infrastructure'

export class Add${capitalizeFirstLetter(entityName)}UseCase {
  constructor(private ${entityName}Repository: I${capitalizeFirstLetter(
    entityName
  )}Repository ) {}

  async execute (${entityName}: ${capitalizeFirstLetter(
    entityName
  )}Create): Promise<void> {
    return this.${entityName}Repository.add${capitalizeFirstLetter(
    entityName
  )}(${entityName});
  }
}  

`;
}

module.exports = {
  generateAddOne,
};
