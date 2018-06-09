#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiDom = require('chai-dom')
const jsdom = require('jsdom-global')
const mocha = require('mocha')
const chokidar = require('chokidar')
const glob = require('glob')
const yargs = require('yargs')
const minimatch = require('minimatch')

yargs.array('require')
yargs.alias('w', 'watch')
yargs.alias('t', 'test-glob')
yargs.alias('s', 'src-glob')
yargs.alias('r', 'require')

const argv = yargs.argv

require('ts-node/register')
require('source-map-support/register')
require('./mock.webpack')

const isWatching = argv.watch

jsdom()

global.chai = chai
global.sinon = sinon
global.expect = chai.expect

chai.use(sinonChai)
chai.use(chaiDom)

if (argv.r) {
  argv.r.forEach(s => require(path.resolve(s)))
}

let fileList

function runSuite() {
  // Clear console
  console.log('\x1Bc')
  // Clear node's require cache so we get fresh dependencies
  Object.keys( require.cache ).forEach( key => delete require.cache[ key ] )
  // Create a new test runner
  const m = new mocha()
  // Filter out anything that may have sneaked in, we want only tests
  const tests = fileList.filter(path => minimatch(path, argv.t))
  tests.forEach(filepath => m.addFile(filepath))
  if (isWatching) {
    // In watch mode, we don't want to kill the process if an error is thrown
    // but we do want to make sure it's logged
    try {
      m.run()
    } catch(e) {
      console.log(e.stack)
    }
  } else {
    // Otherwise, make sure we exit if a test fails
    m.run(failures => {
      process.exitCode = failures ? -1 : 0
    })
  }
}

if (isWatching) {
  fileList = []
  chokidar.watch( argv.t, { persistent: true} )
    .on('add', path => fileList.push( path ))
    .on('change', runSuite)
    .on('ready', runSuite)

  chokidar.watch( argv.s, { persistent: true, ignored: argv.t } )
    .on('change', runSuite)
} else {
  glob(argv.t, (er, files) => {
    fileList = files
    runSuite()
  })
}