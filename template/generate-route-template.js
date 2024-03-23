function generateRoutesTemplate() {
    return `
import { Router } from 'express';
import { Config } from '../config';
//import needed elements here

//Add external dependencies
export type ExternalDependencies = null;

export const getRoutes: GetRoutes = (externalDependencies: ExternalDependencies): Router[] => {
  // Main routes
  return [
    // Add Route here
    Router().get('/', (req, res) => {
      res.send('Hello World!');
    })
  ];
};

export type GetRoutes = (externalDependencies: ExternalDependencies) => Router[];
`;
}

module.exports = {
    generateRoutesTemplate
  }