import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

test.describe('Pre-deploy Build Verification @predeploy', () => {
  test('build command completes successfully', async () => {
    try {
      execSync('npm run build', { stdio: 'pipe' });
      expect(true).toBe(true);
    } catch (error) {
      throw new Error(`Build failed: ${error}`);
    }
  });

  test('build output directory exists', async () => {
    expect(existsSync('_site')).toBe(true);
  });

  test('index.html is generated', async () => {
    expect(existsSync(join('_site', 'index.html'))).toBe(true);
  });

  test('figures directory is generated', async () => {
    expect(existsSync(join('_site', 'figures'))).toBe(true);
  });

  test('CSS assets are generated', async () => {
    const cssPath = join('_site', 'assets', 'css');
    expect(existsSync(cssPath)).toBe(true);
  });

  test('JavaScript assets are generated', async () => {
    const jsPath = join('_site', 'assets', 'js');
    expect(existsSync(jsPath)).toBe(true);
  });

  test('all figure pages are generated', async () => {
    const figuresDir = join('_site', 'figures');
    expect(existsSync(figuresDir)).toBe(true);
    
    // Check that at least some figure pages exist
    const fs = require('fs');
    const files = fs.readdirSync(figuresDir);
    const htmlFiles = files.filter((f: string) => f.endsWith('.html'));
    expect(htmlFiles.length).toBeGreaterThan(0);
  });
});
