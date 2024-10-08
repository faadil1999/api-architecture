const { capitalizeFirstLetter } = require("../../../../helper");
const { pluralWord } = require("../../../../helper");

function generateType(entityName) {
  return `
import { type Prisma } from '@prisma/client'

export type ${capitalizeFirstLetter(entityName)} = {
    id: string
    //All the rest
}

export type ${capitalizeFirstLetter(
    entityName
  )}Create = Omit<${capitalizeFirstLetter(entityName)}, 'id'>

export type ${capitalizeFirstLetter(
    entityName
  )}Update = Omit<${capitalizeFirstLetter(entityName)}, '${entityName}'>  
    `;
}

module.exports = { generateType };
