const { capitalizeFirstLetter } = require("../../../../helper");
const { pluralWord } = require("../../../../helper");

function generateDomainError() {
  return `export class DomainError extends Error {
    constructor(readonly message:string) {
        super()
    }
}
    `;
}

module.exports = {
  generateDomainError,
};
