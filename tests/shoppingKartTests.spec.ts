import { test, expect } from '../fixtures/base';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const username = process.env.username
const password = process.env.password

test("Check if user is able to add item to the shopping cart.", async ({ loginPage,dashboardPage }) => {
  await loginPage.goto()
  await loginPage.confirmLoginPage()
  await loginPage.login(username!, password!)
  await dashboardPage.confirmDashboardPage()
  await dashboardPage.addItem('ADIDAS ORIGINAL')
});

test("Check if user is able to add an item to the shopping cart and checkout.", async ({ loginPage,dashboardPage,cartPage,navigationBar }) => {
  await loginPage.goto()
  await loginPage.confirmLoginPage()
  await loginPage.login(username!, password!)
  await dashboardPage.confirmDashboardPage()
  await dashboardPage.addItem('ADIDAS ORIGINAL')
  await navigationBar.navigateToCart();
  await cartPage.confirmMyCart();  
  await cartPage.checkout("ADIDAS ORIGINAL");

});