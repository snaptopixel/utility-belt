# testify
A simple, opinionated setup for testing front-end Typescript projects.

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
#### Install via npm or yarn  
```
yarn add @snaptopixel/testify
```

#### Configure script(s) in package.json
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
> Install [nyc](https://github.com/istanbuljs/nyc) and simply add it before `testify`, check nyc's README on how it's configured
```js
{
  "test": "nyc testify -t tests/**/*.spec.ts"
}
```

### Customizing the test environment
In order to accomplish this, you can simply pass an arbitrary number of .js files using the `-r` argument like so:
```js
{
  "test": "testify -t tests/**/*.spec.ts -r some-file.js some-other-file.js"
}
```
These scripts will be required and executed in the node environment once jsdom has been initialized.  

This is useful if your scripts depend on global variables, an example could be:

```js
// In required js file
window.SomeGlobal = {
  someMethod: sinon.spy()
}

// test file 'test.spec.ts'
describe('globals', () => {
  it('can access global', () => {
    window.SomeGlobal.someMethod('hey')
    expect(window.SomeGlobal.someMethod).calledWith('hey')
  })
})
```