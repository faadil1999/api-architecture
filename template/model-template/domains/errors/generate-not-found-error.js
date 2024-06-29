const { capitalizeFirstLetter } = require("../../../../helper");
const { pluralWord } = require("../../../../helper");

function generateNotFoundError(entityName) {
  return `
import { DomainError } from './domain.error'

export class ${capitalizeFirstLetter(
    entityName
  )}NotFoundError extends DomainError {
    constructor(public id:string) {
    super ('${capitalizeFirstLetter(entityName)} '+id+' not found')
    }
}
    `;
}
module.exports = {
  generateNotFoundError,
};
