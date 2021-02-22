import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';
const externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-scripts': 'ReactScripts',
};


export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    plugins: [
        external(),
        scss(),
        babel({
            exclude: 'node_modules/**'
        }),
        del({ targets: ['dist/*'] }),
    ],
    external: Object.keys(externals),
};