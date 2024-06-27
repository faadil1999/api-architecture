const { capitalizeFirstLetter } = require("../../helper");

function generateMapperContent(entityName) {
  return `import { ${capitalizeFirstLetter(entityName)} } from '@prisma/client';
import { ${capitalizeFirstLetter(
    entityName
  )}Raw } from '../../../../contexts/${entityName}';

export function to${capitalizeFirstLetter(
    entityName
  )}Raw(${entityName.toLowerCase()}: ${capitalizeFirstLetter(
    entityName
  )}): ${capitalizeFirstLetter(entityName)}Raw {
  return {
    id: ${entityName.toLowerCase()}.id,
    //title: ${entityName.toLowerCase()}.name,
    // description: ${entityName.toLowerCase()}.description,
  };
}`;
}
module.exports = {
  generateMapperContent,
};
