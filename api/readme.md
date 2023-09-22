# TypeScript Express API Bootstrap (Users crud)

Backend application that allows you to create, read, update and delete a list of contacts. Each contact will have: First name, Last name, Email, and phone number. All the fields are mandatory and there can't be two contacts with the same email. You should be able to see the history of edits on those contacts

## Features

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)

## Running the app

```
# install dependencies
npm install

# run in dev mode on port 3003
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 3000
npm run start
```

## Testing

### Jest with supertest

```
npm run test
```

## Linting

```
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```
