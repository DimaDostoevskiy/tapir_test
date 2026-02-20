// eslint.config.js
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default [
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.nuxt/**', '**/.output/**']
    },

    // Глобальные настройки
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.vue'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },

    // JavaScript правила
    js.configs.recommended,

    // Vue.js правила
    ...vue.configs['flat/recommended'],

    // TypeScript правила
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parser: parser
        },
        plugins: {
            '@typescript-eslint': typescript
        },
        rules: {
            ...typescript.configs.recommended.rules,
            'no-undef': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',

        }
    },

    // Vue-specific правила (ОБНОВЛЕННЫЕ)
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: parser,
                extraFileExtensions: ['.vue']
            }
        },
        rules: {
            // Основные правила Vue
            'no-undef': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/no-unused-vars': 'error',

            // Правила порядка (работающие в новых версиях)
            'vue/block-order': ['error', {
                order: ['template', 'script', 'style']
            }],

            'vue/attributes-order': ['off', {
                order: [
                    'GLOBAL',            // id, class
                    'LIST_RENDERING',    // v-for
                    'CONDITIONALS',      // v-if, v-else-if, v-else
                    'UNIQUE',            // key, ref
                    'SLOT',              // v-slot
                    'OTHER_ATTR',        // все обычные атрибуты
                    'EVENTS',            // @click, v-on
                    'TWO_WAY_BINDING'    // v-model - всегда последний
                ]
            }],

            "vue/attribute-hyphenation": ["warn", "always", {
                "ignore": [],
                "ignoreTags": []
            }],

            // Другие полезные правила
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always'
                }
            }],

            'vue/no-v-html': 'off',

            'vue/first-attribute-linebreak': ['error', {
                singleline: 'ignore', // Игнорировать в однострочных
                multiline: 'ignore'   // Игнорировать в многострочных
            }],

            'vue/max-attributes-per-line': 'off', // Упрощаем форматирование
            'vue/singleline-html-element-content-newline': 'off',
            'vue/multiline-html-element-content-newline': 'off'
        }
    },

    // Общие правила
    {
        rules: {
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'prefer-const': 'error',
            'no-var': 'error'
        }
    }
];
