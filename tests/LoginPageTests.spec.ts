import { test, expect } from '../fixtures/base';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const username = process.env.username
const password = process.env.password
const invalidU = process.env.invalidUsername;
const invalidP = process.env.invalidPassword;
const inUnameForm = process.env.invalidUnameForm;

test('Login Successful', async ({ loginPage, page,dashboardPage }) => {
  await loginPage.goto()
  await loginPage.confirmLoginPage();
  await loginPage.login(username!, password!)
  await dashboardPage.confirmDashboardPage();
});

test('Login unsuccessful with username in incorrect format and Password.', async ({ loginPage, page,dashboardPage }) => {
  await loginPage.goto()
  await loginPage.confirmLoginPage();
  await loginPage.login(inUnameForm!,invalidP!)
  await loginPage.checkErrorInvalidPassword();
  await loginPage.confirmLoginPage();
});

test('Login unsuccessful with incorrect username and Password.', async ({ loginPage, page,dashboardPage }) => {
  await loginPage.goto()
  await loginPage.confirmLoginPage();
  await loginPage.login(invalidU!,invalidP!)
  await loginPage.checkErrorInvalidUsername();
  await loginPage.confirmLoginPage();
});






