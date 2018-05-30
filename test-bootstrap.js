require('jsdom-global')()

global.chai = require('chai')
global.sinon = require('sinon')
global.expect = chai.expect

chai.use(require('sinon-chai'))
chai.use(require('chai-dom'))