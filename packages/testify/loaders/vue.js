const compiler = require('vue-template-compiler');
const fs = require('fs');
const path = require('path');
const requireFromString = require('require-from-string');

const compilers = {}

compilers.ts = (script) => {
  const ts = require('typescript');
  const { compilerOptions } = require(path.resolve('tsconfig.json'));
  return ts.transpile(script.content, compilerOptions);
}

module.exports = function requireVue(currentDir, filePath) {
  const vuePath = require.resolve(filePath, {paths: [currentDir]});
  const src = fs.readFileSync(vuePath).toString();
  const {script, template} = compiler.parseComponent(src);
  if (compilers[script.lang]) {
    const src = compilers[script.lang](script);
    const m = requireFromString(src);
    if (m.default.options) {
      m.default.options.render = compiler.compileToFunctions(template.content).render;
    } else {
      m.default.render = compiler.compileToFunctions(template.content).render;
    }
    return m
  } else {
    throw new Error(`Error compiling vue file, no compiler registered for lang type: ${script.lang}`)
  }
}