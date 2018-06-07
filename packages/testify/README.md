# testify
A simple, opinionated setup for testing browser-based Typescript projects.

<!-- TOC depthFrom:2 -->

- [What it does](#what-it-does)
- [How it does it](#how-it-does-it)
- [Using it in your projects](#using-it-in-your-projects)
  - [Installation](#installation)
  - [Run script(s)](#run-scripts)
    - [Single test run](#single-test-run)
    - [Watch mode (re-run tests when files are changed)](#watch-mode-re-run-tests-when-files-are-changed)
    - [Single test run w/coverage](#single-test-run-wcoverage)
- [Customizing the test environment](#customizing-the-test-environment)

<!-- /TOC -->

### What it does
Initializes a test envirnonment with the following:
- [mocha](https://github.com/mochajs/mocha) for running tests
- [sinon](https://github.com/sinonjs/sinon) for mocking/stubbing functions
- chai for assertions w/
  - [sinon-chai](https://github.com/domenic/sinon-chai)
  - [chai-dom](https://github.com/nathanboktae/chai-dom)
- [jsdom](https://github.com/jsdom/jsdom) for a browser-esque environment

### How it does it
Provides a basic cli for running tests borrowing many of the ideas from [@tomazzaman](https://github.com/tomazzaman)'s excellent article “[How to get fast unit tests with(out) Webpack](https://medium.com/@TomazZaman/how-to-get-fast-unit-tests-with-out-webpack-793c408a076f)”

### Using it in your projects
#### Installation 
```
yarn add @snaptopixel/testify
```

#### Run script(s)
##### Single test run  
> `-t` is shorthand for `--test-glob`
```js
{
  "test": "testify -t tests/**/*.spec.ts"
}
```
##### Watch mode (re-run tests when files are changed)
> `-s` is shorthand for `--src-glob`
```js
{
  "test:watch": "testify -t packages/**/*.spec.ts -s packages/**/*.ts -w"
}
```
##### Single test run w/coverage
> Install [nyc](https://github.com/istanbuljs/nyc) and simply add it before `testify`, check nyc's README on how to configure the output
```js
{
  "test": "nyc testify -t tests/**/*.spec.ts"
}
```

### Customizing the test environment
You can pass an arbitrary number of .js files using the `-r` argument like so:
```js
{
  "test": "testify -t tests/**/*.spec.ts -r some-file.js some-other-file.js"
}
```
These scripts will be required and executed in the node environment once jsdom has been initialized.  

This is useful if your scripts depend on global variables, for example:

```js
// In required js file
window.SomeGlobal = {
  someMethod: sinon.spy()
}

// In test file 'test.spec.ts'
describe('globals', () => {
  it('can access global', () => {
    window.SomeGlobal.someMethod('hey')
    expect(window.SomeGlobal.someMethod).calledWith('hey')
  })
})
```