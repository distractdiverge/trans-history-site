# Testing Guide

This directory contains Playwright tests for the Trans History Site, designed for both pre-deploy and post-deploy verification.

## Test Structure

### Pre-deploy Tests (`/predeploy/`)
These tests run before deployment to ensure the build is successful and basic functionality works:

- **build.spec.ts**: Verifies the build process completes and generates expected files
- **navigation.spec.ts**: Tests basic navigation and page loading

### Post-deploy Tests (`/postdeploy/`)
These tests run against the live deployed site to verify everything works in production:

- **live-site.spec.ts**: Comprehensive verification of the live site including content, performance, and accessibility

## Getting Started

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Run Tests

#### Local Development
```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run only pre-deploy tests
npm run test:predeploy

# Run only post-deploy tests
npm run test:postdeploy

# Debug mode
npm run test:debug
```

#### CI/CD Environment
```bash
# Set the base URL for post-deploy tests
PLAYWRIGHT_BASE_URL=https://your-site.netlify.app npm run test:postdeploy
```

### 3. Environment Variables

- `PLAYWRIGHT_BASE_URL`: Override the base URL for testing (default: http://localhost:8080)
- `CI`: Set to "true" for CI environments (enables retries, single worker)

## Test Tags

Tests are tagged for selective execution:

- `@predeploy`: Tests that run before deployment
- `@postdeploy`: Tests that run after deployment

## Writing Tests

### Adding New Tests

1. Create test files in the appropriate directory (`predeploy/` or `postdeploy/`)
2. Use descriptive test names and add appropriate tags
3. Follow the existing patterns for consistency

### Test Guidelines

- **Pre-deploy tests**: Focus on build verification and basic functionality
- **Post-deploy tests**: Focus on user experience, content integrity, and performance
- Always include assertions for critical functionality
- Use page objects for complex interactions
- Include accessibility checks where appropriate

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm ci
      - run: npm run test:predeploy
      
  test-deployed:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: PLAYWRIGHT_BASE_URL=${{ needs.deploy.outputs.url }} npm run test:postdeploy
```

### Netlify Integration

Add to your `netlify.toml`:

```toml
[build]
  command = "npm run test:predeploy && npm run build"

[build.environment]
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1"
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `playwright.config.ts`
2. **Tests timeout**: Increase timeout values in config
3. **Missing browser**: Run `npx playwright install`
4. **Build failures**: Check that all dependencies are installed

### Debug Mode

Use the debug mode for step-by-step execution:
```bash
npm run test:debug
```

### View Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```
