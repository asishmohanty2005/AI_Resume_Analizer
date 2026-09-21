module.exports = [{
  files: ['js/**/*.js', 'tests/**/*.cjs', '*.cjs'],
  languageOptions: { ecmaVersion: 'latest', sourceType: 'script' },
  rules: {
    'no-unreachable': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-constant-condition': 'error',
    'valid-typeof': 'error'
  }
}];
