# Port Calls

Port Calls is a package that import vessel schedules from an external data source and display interesting statistics (defined below) about these schedules:

-   The five ports with the most port calls, and the number of port calls for each of these five ports.
-   The five ports with the fewest port calls, and the number of port calls for each of these five ports.
-   For each port, the percentiles of port call durations: 5th, 20th, 50th, 75th and 90th percentiles.

## Installation

To install the package, run the following command:

```bash
$ npm install
```

## Usage

To use the package, run the following command:

```bash
$ npm start
```

This will export the environment variables from the `.env` file and run the `stats.ts` file using `ts-node`.

## Scripts

The following scripts are available in the package:

-   `start`: exports environment variables from `.env` file and runs `stats.ts` file using `ts-node`.
-   `build`: compiles TypeScript files using `tsc`.
-   `build:watch`: compiles TypeScript files using `tsc` in watch mode.
-   `test`: runs Jest tests.
-   `test:coverage`: runs Jest tests with coverage.
-   `lint`: lints TypeScript files using `eslint`.
-   `lint:fix:` lints and fixes TypeScript files using `eslint`.
-   `prepare`: installs Husky Git hooks.

## Dependencies

The package has the following dependencies:

-   `axios`: Promise based HTTP client for the browser and Node.js
-   `chalk`: Terminal string styling done right
-   `cli-table3`: Pretty unicode tables for the CLI with Node.JS
-   `dotenv`: Loads environment variables from `.env` file
-   `progress`: Flexible ascii progress bar for nodejs
-   `simple-statistics`: A JavaScript implementation of descriptive, regression, and inference statistics

## Dev Dependencies

The package has the following dev dependencies:

-   `@types/jest`: TypeScript typings for Jest
-   `@types/node`: TypeScript typings for Node.js
-   `@types/progress`: TypeScript typings for progress
-   `@typescript-eslint/eslint-plugin`: TypeScript ESLint plugin
-   `@typescript-eslint/parser`: TypeScript ESLint parser
-   `eslint`: Linter for JavaScript and TypeScript
-   `eslint-config-prettier`: Turns off all rules that are unnecessary or might conflict with Prettier
-   `husky`: Git hooks made easy
-   `jest`: Delightful JavaScript testing
-   `prettier`: Opinionated code formatter
-   `ts-jest`: Jest preprocessor with TypeScript support
-   `ts-node`: TypeScript execution environment and REPL
-   `typescript`: TypeScript language server
