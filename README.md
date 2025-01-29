# Overview

WIP on a survey form builder. Uses Vue 3 Composition API.

Features:

* Survey page designer (WIP)
* Preview of the rendered survey (TODO)
* Uses Immer for immutable data structure and change tracking
* Full undo / redo ability (Planned)

[Demo](https://survey-components.pages.dev/demo)

Many features still not implemented! And some parts of code need refactoring.

[Original Figma Prototype](https://www.figma.com/proto/m1GaHNxbNVBLruJckd0jfF/shadcn-%2F-ui-components---Updated-July-24'-(Community)?node-id=2066-4858&t=wWjEoLp5h6KdnWPf-0&scaling=scale-down&content-scaling=fixed&page-id=2053%3A1669&starting-point-node-id=2066%3A4858)

----

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
