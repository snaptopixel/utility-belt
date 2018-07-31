module.exports = function initTests (chai) {
  // Expose a global property
  window.myJSGlobal = true
  // Create a silly plugin to make sure chai works
  chai.use(function BarPlugin ({Assertion}, utils) {
    Assertion.addProperty('bar', function () {
      this.assert(
        this._obj === 'bar',
        'expected #{this} to be bar',
        'expected #{this} to not be bar'
      )
    })
  })
}
