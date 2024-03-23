function generatePrismaSchemaTemplate(databaseProvider = "sqlite") {
    return `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${databaseProvider}"
  url      = env("DATABASE_URL")
}
`;
}

module.exports = {
    generatePrismaSchemaTemplate
  }