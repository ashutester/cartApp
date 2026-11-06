import { expect, Page, Locator } from "@playwright/test";

import { TopNavBar } from "../components/navigationBar";

export class myCart{
    private readonly btnCheckout : Locator
    private readonly headerMyCart: Locator
    private readonly page : Page
    private readonly infoWrap : Locator
    
    constructor(page: Page){
        this.page = page;
        this.btnCheckout = page.getByRole('button', { name: 'Checkout' })
        this.headerMyCart = page.getByRole('heading', { name: 'My Cart' })
        this.infoWrap = page.locator('div.infoWrap');
    }

    async confirmMyCart(){
        await expect(this.headerMyCart).toBeVisible();
    }

    async checkout(itemName: string){
        const cartItem = this.infoWrap.filter({
            has: this.page.getByRole('heading', { name: itemName, exact: true }),
        });
        await expect(cartItem).toBeVisible();
        await this.btnCheckout.click();
    }
}