/* eslint-disable */
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const autoExternal = require('rollup-plugin-auto-external');
const babel = require('rollup-plugin-babel');
// const uglify = require('rollup-plugin-uglify');
const babelrc = require('./babel.config.js');

const babelConfigs = {
    ...babelrc,
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts']
};

const inputOptions = {
    input: 'src/index.js',
    plugins: [
        resolve({main: true, module: true, extensions: ['.js', '.json', '.ts']}),
        commonjs({include: 'node_modules/**'}),
        autoExternal({dependencies: false}),
        babel({babelrc: false, ...babelConfigs}),
        // uglify()
    ],
    external: ['lodash', 'react', 'react-dom']
};

const build = async () => {
    const bundle = await rollup.rollup(inputOptions);
    bundle.write({format: 'cjs', file: 'cjs/index.js', sourcemap: true});
    bundle.write({format: 'es', file: 'es/index.js', sourcemap: true});
};

build();
