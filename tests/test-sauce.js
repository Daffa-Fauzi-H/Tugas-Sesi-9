const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Google Search Test', function(){
    let driver;

    it('Visit sauceDemo dan cek page title', async function () {
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        assert.strictEqual(title, 'Swag Labs')

        let inputUsername  = await driver.findElement(By.xpath('//input[@id="user-name"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'));
        let buttonLogin = await driver.findElement(By.xpath('//*[@id="login-button"]'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();


        let buttonCart = await driver.wait(
            until.elementLocated(by.xpath('//div[@id="shopping_cart_container"]/a')),
            10000
        );
        //await driver.wait(until.elementIsVisible(buttonCart), 5000, 'shopping cart harus tampil')
        await buttonCart.isDisplayed()

        let textAppLogo = await driver.findElement(by.xpath('//div[@id="header_container"]/div/div[2]/div'))
        let logoText = await textAppLogo.getText()
        assert.strictEqual(logoText, 'Swag Labs')

        await driver.sleep(3000);
        await driver.quit();
    });

    
});