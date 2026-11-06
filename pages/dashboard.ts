import { expect, Page, Locator } from "@playwright/test";

import { TopNavBar } from "../components/navigationBar";

export class Dashboard{
    private readonly headerText: Locator
    private readonly cardsCollection: Locator
    private readonly page: Page;
    
    constructor(page: Page){
        this.page = page
        this.headerText = page.locator('p:has-text("Automation Practice")')
        this.cardsCollection = page.locator('div.card-body')
    }
    async confirmDashboardPage(){
        await expect(this.headerText).toBeVisible();
        await expect(this.page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
        await expect(this.page).toHaveTitle("Let's Shop");
    }
    async removeAll(){
        await this.page.close();
    }
    async addItem(itemName: string){
        const navBar = new TopNavBar(this.page);
        const productCard = this.cardsCollection.filter({
            has: this.page.getByText(itemName, { exact: true }),
        });

        await productCard.getByRole('button', { name: 'Add To Cart' }).click();
        await navBar.addedCart();
    }
    
}