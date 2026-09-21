const { defineConfig } = require('@playwright/test');
const path = require('node:path');
const python = process.env.TEST_PYTHON || path.join(__dirname, 'backend', '.venv',
  process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');

module.exports = defineConfig({
  testDir: './tests/browser',
  use: { baseURL: 'http://127.0.0.1:5511', headless: true },
  webServer: {
    command: '"' + python + '" scripts/serve_frontend.py --port 5511',
    url: 'http://127.0.0.1:5511',
    reuseExistingServer: false
  }
});
