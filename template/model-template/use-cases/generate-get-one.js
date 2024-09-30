const { capitalizeFirstLetter } = require("../../../helper");
const { pluralWord } = require("../../../helper");

function generateGetOneCase(entityName) {
  return `
import { ${capitalizeFirstLetter(entityName)} } from '../../domains'
import { I${capitalizeFirstLetter(
    entityName
  )}Repository } from '../../infrastructure'

export class Get${capitalizeFirstLetter(
    entityName
  )}UseCase { constructor(private ${entityName}Repository: I${capitalizeFirstLetter(
    entityName
  )}Repository) { }

          async execute(id: string): Promise<${capitalizeFirstLetter(
            entityName
          )} | string> {
                const ${entityName} = await this.${entityName}Repository.get${capitalizeFirstLetter(
    entityName
  )}(id)
                if (!${entityName}) {
                    return \`No ${entityName} found with the ID: \${id}\`
                }
                else{
                    return ${entityName}
                }
            }
        }
    `;
}

module.exports = {
  generateGetOneCase,
};
