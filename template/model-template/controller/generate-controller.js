const { capitalizeFirstLetter } = require("../../../helper");
const { pluralWord } = require("../../../helper");

function generateController(entityName) {
  return `
import { Request, Response } from 'express';
import {Add${capitalizeFirstLetter(
    entityName
  )}UseCase, Delete${capitalizeFirstLetter(
    entityName
  )}UseCase, Get${capitalizeFirstLetter(entityName)}UseCase, Get${pluralWord(
    capitalizeFirstLetter(entityName)
  )}UseCase } from '../../use-cases';
import { internal, notFound } from '../../../../infrastructure/http';
  
/**
 * You can add your schema here, for validation
 * 
 * Eg:
 * 
  const userCreateSchema = {
  id: "/User",
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    description: {
      type: "string"
    },
  },
  required: ["name", "email", "description"]
} 
*/

export class ${capitalizeFirstLetter(entityName)}Controller {
    constructor(
    private readonly get${capitalizeFirstLetter(
      pluralWord(entityName)
    )}UseCase: Get${capitalizeFirstLetter(pluralWord(entityName))}UseCase,
    private readonly add${capitalizeFirstLetter(
      entityName
    )}UseCase: Add${capitalizeFirstLetter(entityName)}UseCase,
    private readonly get${capitalizeFirstLetter(
      entityName
    )}UseCase: Get${capitalizeFirstLetter(entityName)}UseCase,
    private readonly delete${capitalizeFirstLetter(
      entityName
    )}UseCase: Delete${capitalizeFirstLetter(entityName)}UseCase,

  ) { }

  //Get all elements
  async get${capitalizeFirstLetter(
    pluralWord(entityName)
  )}(req: Request, res: Response) {
    const ${pluralWord(entityName)} = await this.get${capitalizeFirstLetter(
    pluralWord(entityName)
  )}UseCase.execute()
    res.status(200).json(${pluralWord(entityName)})
  }

  //Add element
  async add${capitalizeFirstLetter(
    pluralWord(entityName)
  )}(req: Request, res: Response) {
    // Add validation

    const ${entityName} = await this.add${capitalizeFirstLetter(
    entityName
  )}UseCase.execute(req.body)
    res.status(201).json(${entityName})
  }

  //Get one element
  async get${capitalizeFirstLetter(entityName)}(req: Request, res: Response) {

    const ${entityName} = await this.get${capitalizeFirstLetter(
    entityName
  )}UseCase.execute(req.params.id)
    res.status(200).json(${entityName})
  }

  //Delete element
  async delete${capitalizeFirstLetter(
    entityName
  )}(req: Request, res: Response) {
    const ${entityName} = await this.delete${capitalizeFirstLetter(
    entityName
  )}UseCase.execute(req.params.id)
    res.status(200).json(${entityName})
  }
}

    `;
}

module.exports = { generateController };
