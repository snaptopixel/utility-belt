const assert = require('assert');
const Module = require('module');

/**
 * Monkey-patching the Function prototype so we can have require.ensure working.
 * Easier achieved than hacking the Module for targeting the "require" specifically.
 */
Function.prototype.ensure = ( arr, func ) => func();

/**
 * Monkey-patching native require, because Webpack supports requiring files, other
 * than JavaScript. But Node doesn't recognize them, so they should be ignored.
 * IMPORTANT: don't use arrow functions because they change the scope of 'this'!
 */
Module.prototype.require = function( path ) {
  const types = /\.(s?css|sass|less|svg|html|png|jpe?g|gif)$/;
  if ( path.search( types ) !== -1 ) return {};

  // Mimics Webpack's "alias" feature
  if ( path === 'config' ) {
    path = resolve( './src/js/secrets/test.js' );
  }

  assert( typeof path === 'string', 'path must be a string' );
  assert( path, 'missing path' );

  return Module._load( path, this );
};