/* eslint-disable */
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const autoExternal = require('rollup-plugin-auto-external');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const babelrc = {
    presets: [
        [
            'env',
            {
                'targets': {
                    'chrome': '45',
                    'safari': '10'
                },
                'exclude': [
                    'transform-regenerator',
                    'transform-async-to-generator'
                ],
                'modules': false,
                'useBuiltIns': 'entry',
                'debug': false
}
        ],
        'stage-1',
        'react'
    ],
    'plugins': [
        'react-require',
        'external-helpers',
        "transform-decorators-legacy",
        "lodash"
    ]
};

const inputOptions = {
    input: 'src/index.js',
    plugins: [
        resolve({main: true, module: true}),
        commonjs({include: 'node_modules/**'}),
        autoExternal({dependencies: false}),
        babel({exclude: 'node_modules/**', babelrc: false, ...babelrc}),
        uglify()
    ],
    external: ['lodash', 'react', 'react-dom']
};

const build = async () => {
    const bundle = await rollup.rollup(inputOptions);
    bundle.write({format: 'cjs', file: 'cjs/index.js', sourcemap: true});
    bundle.write({format: 'es', file: 'es/index.js', sourcemap: true});
};

build();
