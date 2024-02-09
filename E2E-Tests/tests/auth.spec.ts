import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.getByLabel('Email').fill('test1@gmail.com');
  await page.getByLabel('Password').fill('test123');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Login Successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('shoust allow the user to register', async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(`${UI_URL}register`);

  await expect(
    page.getByRole('heading', { name: 'Create an Account' })
  ).toBeVisible();

  await page.getByLabel('First Name').fill('e2eFirst');
  await page.getByLabel('Last Name').fill('e2eLast');
  await page.getByLabel('Email').fill(testEmail);
  await page.locator('[name=password]').fill('e2eTest123');
  await page.locator('[name=confirmPassword]').fill('e2eTest123');

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Registration Successful')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
