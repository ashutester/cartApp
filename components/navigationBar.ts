import {Page, Locator} from "@playwright/test"
import {expect, test } from "../fixtures/base"
import { Login } from "../pages/login";


export class TopNavBar{
    
    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly ordersLink: Locator;
    private readonly cartLink: Locator;
    private readonly SignOutLink: Locator;

    constructor(page: Page){

        this.page = page;
        this.homeLink = page.getByRole('button', { name: 'HOME' })
        this.ordersLink = page.getByRole('button', { name: 'ORDERS' })
        this.cartLink = page.getByRole('navigation').getByRole('button', { name: /Cart/ })
        this.SignOutLink = page.getByRole('button', { name: 'Sign Out' })
    }

    async navigateToOrders(){
        await this.ordersLink.click();
    }

    async navigateToCart(){
        await this.cartLink.click();
    }

    async signOut(loginPage: Login){
        await this.SignOutLink.click();
        loginPage.confirmLoginPage();
    }

    async addedCart(){
        await expect(
            this.page.getByRole('navigation').getByRole('button', { name: /Cart\s+1/ })
        ).toBeVisible();
    }

}