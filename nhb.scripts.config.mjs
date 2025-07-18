// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

export default defineScriptConfig({
    format: {
        args: ['--write'],
        files: ['src'],
        ignorePath: '.prettierignore',
    },
    commit: {
        runFormatter: true,
    },
    lint: { folders: ['src'], patterns: ['**/*.ts', '**/*.tsx'] },
    fix: { folders: ['src'], patterns: ['**/*.ts', '**/*.tsx'] },
    count: {
        defaultPath: 'src',
        excludePaths: ['node_modules', 'dist', 'build']
    }
});
