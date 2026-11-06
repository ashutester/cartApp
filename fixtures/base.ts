import { test as base } from '@playwright/test'
import { Login } from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { TopNavBar } from '../components/navigationBar';
import { myCart } from '../pages/cart';


// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: Login
  dashboardPage: Dashboard
  navigationBar: TopNavBar
  cartPage: myCart
};

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new Login(page)
    await loginPage.goto()

    // Use the fixture value in the test.
    await use(loginPage)

    // Clean up the fixture.
    await loginPage.removeAll()
  },
  dashboardPage: async({page},use)=>{
    const dashboardpage = new Dashboard(page)
    await use(dashboardpage)
    await dashboardpage.removeAll();
  },
  navigationBar: async({page}, use)=>{
    const navBar = new TopNavBar(page);
    await use(navBar);

  },
  cartPage: async({page}, use)=>{
    const cartPage = new myCart(page);
    await use(cartPage);

  },  
});
export { expect } from '@playwright/test'



