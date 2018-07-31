import { IRequireApi } from './packages/testify'

declare global {
  interface Window {
    myGlobal: boolean,
    myJSGlobal: boolean // from the js bootstrap
  }
  export namespace Chai {
    interface Assertion {
      foo: Assertion
      bar: Assertion // from the js bootstrap
    }
  }
}

export default function initTests (api: IRequireApi) {
  console.log('INIT TEST', api)
  // Expose a global property
  window.myGlobal = true
  // Make an alias
  api.addAlias('~', './packages/testify/tests')
  // Create a silly plugin to make sure chai works
  api.chai.use(function FooPlugin ({ Assertion }) {
    Assertion.addProperty('foo', function () {
      this.assert(
        this._obj === 'foo',
        'expected #{this} to be foo',
        'expected #{this} to not be foo'
      )
    })
  })
}
