import { Page, Locator,expect } from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';
import { Dashboard } from "./dashboard";
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const baseUrl = process.env.baseUrl;

export class Login {

    private readonly page: Page;
    private readonly txtUsername : Locator;
    private readonly txtPassword : Locator;
    private readonly btnLogin : Locator;
    private readonly errorMsgInvalidUsername : Locator
    private readonly errorMsgInvalidPassword : Locator
    
    constructor(page: Page){
        this.page = page;
        this.txtUsername = page.getByPlaceholder("email@example.com")
        this.txtPassword = page.getByPlaceholder("enter your passsword")
        this.btnLogin = page.getByRole("button",{name: "Login"})
        this.errorMsgInvalidUsername = page.getByText('*Enter Valid Email', { exact: true })
        this.errorMsgInvalidPassword = page.getByText('Incorrect email or password.', { exact: true })
    }

    async login(username: string, password: string){
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
    async goto() {
        if (!baseUrl) {
            throw new Error('The baseUrl environment variable is not set.');
        }
        await this.page.goto(baseUrl);   
    }
    async removeAll(){
        await this.page.close();
    }
    async confirmLoginPage(){
        await expect(this.txtUsername).toBeVisible();
    }
    async checkErrorInvalidUsername(){
        await expect(this.errorMsgInvalidUsername).toBeVisible();
    }
    async checkErrorInvalidPassword(){
        await expect(this.errorMsgInvalidPassword).toBeVisible();
    }


}
