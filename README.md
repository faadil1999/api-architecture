# f-archi

![Licence](https://img.shields.io/badge/licence-MIT-green)

`f-archi` est un CLI (Command Line Interface) conçu pour générer des API en respectant les principes de l'architecture SOLID. Ce CLI est actuellement en cours de développement et est uniquement compatible avec SQLite. L'utilisation de l'ORM Prisma est indispensable pour fonctionner avec ce CLI.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Architecture SOLID](#architecture-solid)
- [Fonctionnalités](#fonctionnalités)
- [Contribuer](#contribuer)
- [License](#license)
- [Auteurs](#auteurs)
- [Remerciements](#remerciements)

## Aperçu

`f-archi` permet de créer rapidement des API en respectant les principes de l'architecture SOLID. Le CLI génère une structure de projet conforme à ces principes et facilite la création de modèles avec SQLite en utilisant Prisma.

### Qu'est-ce que SOLID ?

SOLID est un ensemble de principes de conception orientée objet qui vise à rendre le logiciel plus compréhensible, flexible et maintenable. Voici un aperçu de chaque principe :

1. **Single Responsibility Principle (SRP)** : Une classe ou un module ne doit avoir qu'une seule raison de changer, c'est-à-dire qu'elle ne doit avoir qu'une seule responsabilité.
2. **Open/Closed Principle (OCP)** : Les entités logicielles (classes, modules, fonctions, etc.) doivent être ouvertes à l'extension mais fermées à la modification. Cela signifie que vous devez pouvoir ajouter de nouvelles fonctionnalités sans modifier le code existant.
3. **Liskov Substitution Principle (LSP)** : Les objets d'un programme doivent pouvoir être remplacés par des instances de leurs sous-types sans altérer le bon fonctionnement du programme. En d'autres termes, les sous-classes doivent être substituables à leurs classes de base.
4. **Interface Segregation Principle (ISP)** : Les clients ne doivent pas être forcés de dépendre d'interfaces qu'ils n'utilisent pas. Il est préférable de créer des interfaces spécifiques à un client plutôt qu'une interface générale.
5. **Dependency Inversion Principle (DIP)** : Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau, mais les deux doivent dépendre d'abstractions. De plus, les abstractions ne doivent pas dépendre des détails, mais les détails doivent dépendre des abstractions.

En respectant ces principes, `f-archi` aide à créer des applications plus robustes et faciles à maintenir.

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) version 12.0 ou supérieure
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Prisma](https://www.prisma.io/) installé et configuré
- SQLite comme base de données

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/votre_nom/f-archi.git
cd f-archi

# Installer les dépendances
npm run f-archi-generate

# Installer Prisma
npm install @prisma/client
npx prisma init

```
## Utilisation

### Générer un projet vierge

Pour générer un nouveau projet `f-archi`, utilisez la commande suivante :

```bash
f-archi-generate
```
## Créer un modèle

Pour créer un nouveau modèle, utilisez la commande suivante. Notez que le nom du modèle doit être en minuscule :

```bash

f-create:model [nomdumodel]
```
Par exemple :

```bash

f-create:model utilisateur
```
## Générer une migration

Pour générer une nouvelle migration, utilisez la commande suivante :

```bash

f-db:generate
```
## Exécuter une migration

Pour exécuter une migration, utilisez la commande suivante :

```bash

f-db:migrate
