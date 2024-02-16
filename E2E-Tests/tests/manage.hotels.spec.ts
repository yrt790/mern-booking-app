import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.getByLabel('Email').fill('test1@gmail.com');
  await page.getByLabel('Password').fill('test123');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Login Successful')).toBeVisible();
});

test('should allow user to add a hotel', async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.getByLabel('Name').fill('Sample Hotel');
  await page.getByLabel('City').fill('Sample City');
  await page.getByLabel('Country').fill('Sample Country');
  await page
    .getByLabel('Description')
    .fill('This is a test for adding a new hotel');

  await page.getByLabel('Price Per Night').fill('150');

  await page.selectOption('select[name="starRating"]', '5');

  await page.getByText('Cabin').click();

  await page.getByLabel('Free WiFi').check();
  await page.getByLabel('Parking').check();

  await page.getByLabel('Adults').fill('3');
  await page.getByLabel('Children').fill('2');

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', '1.jpg'),
    path.join(__dirname, 'files', '2.jpg'),
    path.join(__dirname, 'files', '3.jpg'),
  ]);

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Hotel Saved!')).toBeVisible();
});

test('should display hotels ', async ({ page }) => {
  await page.goto(`${UI_URL}my-hotel`);

  await expect(page.getByText('Hotel Test')).toBeVisible();
  await expect(
    page.getByText('This is a description for the Test Hotel')
  ).toBeVisible();

  await expect(page.getByText('Test City, Test Country')).toBeVisible();
  await expect(page.getByText('Budget')).toBeVisible();
  await expect(page.getByText('$100 per night')).toBeVisible();
  await expect(page.getByText('2 Adults, 1 Children')).toBeVisible();
  await expect(page.getByText('3 Star Rating')).toBeVisible();

  await expect(page.locator(':nth-match(:text("View Details"),1)')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});


test("should update hotel details", async({page}) => {
  await page.goto(`${UI_URL}edit-hotel/65ccdfcb6a29903c7ced70b9`);

  await page.waitForSelector('input', {state: "attached"})
  await expect(page.getByLabel("Name")).toHaveValue("Hotel Test")
})