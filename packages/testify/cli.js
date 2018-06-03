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

yargs.alias('w', 'watch')
yargs.alias('t', 'test-glob')
yargs.alias('s', 'src-glob')

require('ts-node/register')
require('source-map-support/register')

const isWatching = yargs.argv.watch

jsdom()

global.chai = chai
global.sinon = sinon
global.expect = chai.expect

chai.use(sinonChai)
chai.use(chaiDom)

let fileList

function runSuite() {
  // Clear console
  console.log('\x1Bc')
  // Clear node's require cache so we get fresh dependencies
  Object.keys( require.cache ).forEach( key => delete require.cache[ key ] )
  // Create a new test runner
  const m = new mocha()
  // Filter out anything that may have sneaked in, we want only tests
  const tests = fileList.filter(path => minimatch(path, yargs.argv.t))
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
  chokidar.watch( yargs.argv.t, { persistent: true} )
    .on('add', path => fileList.push( path ))
    .on('change', runSuite)
    .on('ready', runSuite)

  chokidar.watch( yargs.argv.s, { persistent: true, ignored: yargs.argv.t } )
    .on('change', runSuite)
} else {
  glob(yargs.argv.t, (er, files) => {
    fileList = files
    runSuite()
  })
}