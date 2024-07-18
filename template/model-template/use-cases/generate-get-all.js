const { capitalizeFirstLetter } = require("../../../helper");
const { pluralWord } = require("../../../helper");

function generateGetAllCase(entityName) {
  return `
import { ${capitalizeFirstLetter(entityName)} } from '../../domains/types'
import { I${capitalizeFirstLetter(
    entityName
  )}Repository } from '../../infrastructure'

  export class Get${pluralWord(capitalizeFirstLetter(entityName))}UseCase {
      constructor(private ${capitalizeFirstLetter(
        entityName
      )}Repository: I${capitalizeFirstLetter(entityName)}Repository)
        {

        }
      async execute(): Promise<${capitalizeFirstLetter(entityName)}[]> {
         return this.${capitalizeFirstLetter(
           entityName
         )}Repository.getAll${pluralWord(capitalizeFirstLetter(entityName))}()
      }
    }

    `;
}

module.exports = {
  generateGetAllCase,
};
