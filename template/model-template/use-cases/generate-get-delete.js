const { capitalizeFirstLetter } = require("../../../helper");
const { pluralWord } = require("../../../helper");

function generateDeleteCase(entityName) {
  return `
import { ${capitalizeFirstLetter(entityName)} } from '../../domains/types'
import { I${capitalizeFirstLetter(
    entityName
  )}Repository } from '../../infrastructure'

export class Delete${capitalizeFirstLetter(entityName)}UseCase {
    constructor(private ${entityName}Repository: I${capitalizeFirstLetter(
    entityName
  )}Repository) {}

    async execute(id: string): Promise<void | string> {
        const ${entityName}Verif = await this.${entityName}Repository.get${capitalizeFirstLetter(
    entityName
  )}(id)
        if (!${entityName}Verif) {
          return \`No ${entityName} found with the ID: \${id}\`
         }
        return this.${entityName}Repository.delete${capitalizeFirstLetter(
    entityName
  )}(id)
    }
}
    `;
}

module.exports = {
  generateDeleteCase,
};
