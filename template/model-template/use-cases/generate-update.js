const { capitalizeFirstLetter } = require("../../../helper");
const { pluralWord } = require("../../../helper");

function generateUpdateCase(entityName) {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);
  return `import { ${entityNameCapitalized}, ${entityNameCapitalized}Update } from '../../domains/types'
  import { I${entityNameCapitalized}Repository } from '../../infrastructure'

  export class Update${entityNameCapitalized}UseCase {
    constructor(private ${entityName}Repository: I${entityNameCapitalized}Repository) {}

    async execute(id: string, ${entityName}: Omit<${entityNameCapitalized}Update, 'id'>): Promise<${entityNameCapitalized} | string> {
        const ${entityName}Verif = await this.${entityName}Repository.get${capitalizeFirstLetter(
    entityName
  )}(id)
        if (!${entityName}Verif) {
          return \`No ${entityName} found with the ID: \${id}\`
         }
        return this.${entityName}Repository.update${entityNameCapitalized}( {...${entityName}, id })
    }
  }
    `;
}

module.exports = { generateUpdateCase };
