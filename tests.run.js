// Insipired by https://medium.com/@TomazZaman/how-to-get-fast-unit-tests-with-out-webpack-793c408a076f

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
const watch = process.argv[2]

require('ts-node/register')
require('source-map-support/register')

jsdom()

global.chai = chai
global.sinon = sinon
global.expect = chai.expect

chai.use(sinonChai)
chai.use(chaiDom)

let fileList = [];

function runSuite() {
  console.clear()
  Object.keys( require.cache ).forEach( key => delete require.cache[ key ] );
  const m = new mocha();
  fileList.forEach( filepath => m.addFile( filepath ) );
  m.run(failures => {
    process.exitCode = failures ? -1 : 0;
  });
}

if (watch) {
    chokidar.watch( 'packages/**/*.spec.ts', { persistent: true } )
      .on( 'add', path => fileList.push( path ) )
      .on( 'change', path => runSuite() )
      .on( 'ready', () => runSuite() )

    chokidar.watch( 'packages/**/*.ts', { persistent: true } )
      .on( 'change', path => runSuite() )
} else {
  glob("packages/**/*.spec.ts", (er, files) => {
    fileList = files
    runSuite()
  })
}