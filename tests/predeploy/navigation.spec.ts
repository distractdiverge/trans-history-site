import { test, expect } from '@playwright/test';

test.describe('Pre-deploy Navigation Tests @predeploy', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Trans History/);
  });

  test('navigation menu works', async ({ page }) => {
    await page.goto('/');
    
    // Check if navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check if main navigation links work
    const homeLink = page.locator('header nav ul li a[href="/"]');
    await expect(homeLink).toBeVisible();
    
    const timelineLink = page.locator('header nav ul li a[href="/timeline/"]');
    await expect(timelineLink).toBeVisible();
  });

  test('figures page loads', async ({ page }) => {
    await page.goto('/timeline/');
    await expect(page.locator('h1')).toContainText(/Timeline/i);
  });

  test('individual figure pages load', async ({ page }) => {
    await page.goto('/');
    
    // Find the first figure link and click it
    const firstFigureLink = page.locator('.figure-card a').first();
    const href = await firstFigureLink.getAttribute('href');
    
    if (href) {
      await page.goto(href);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('responsive design works', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
  });
});
