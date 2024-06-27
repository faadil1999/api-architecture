const { capitalizeFirstLetter } = require("../../helper");
const { pluralWord } = require("../../helper");

function generateRouteModel(entityName) {
  const entityNameCapitalized = capitalizeFirstLetter(entityName);
  return `
    import { Router } from 'express'
    import { ${entityNameCapitalized}Controller } form './controller'

    export function ${entityName}Routes(controller: ${entityNameCapitalized}Controller): Router {
    const router = Router()
    router.get('/', controller.get${pluralWord(
      entityNameCapitalized
    )}.bind(controller))
    router.post('/', controller.add${entityNameCapitalized}.bind(controller))
    router.get('/:id', controller.get${entityNameCapitalized}.bind(controller))
    router.delete('/:id', controller.delete${entityNameCapitalized}.bind(controller))
    return router
    }
    `;
}

module.exports = {
  generateRouteModel,
};
