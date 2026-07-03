module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    // KaTeX/LaTeX formula strings inside <span> contain characters like `<`
    // that the template parser flags; these are intentional math content.
    'vue/no-parsing-error': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn'
  }
}
