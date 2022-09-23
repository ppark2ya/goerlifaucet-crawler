import { Builder, Browser, By, until, Key } from 'selenium-webdriver';
import copy from './copy-to-clipboard';
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

async function crawler() {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(
      new chrome.Options().addArguments(
        '--incognito',
        '--disable-gpu',
        'window-size=1920x1080',
        'lang=ko_KR',
      ),
    )
    .build();
  try {
    await driver.get('https://goerlifaucet.com/');
    const loginBtn = await driver.findElement(
      By.css('.alchemy-faucet-login-nav-col button'),
    );
    await loginBtn.click();

    const inputId = await driver.wait(
      until.elementLocated(
        By.css('#gatsby-focus-wrapper form label input[type=email]'),
      ),
      3000,
    );
    const userId = process.env.USER_ID;
    copy(userId);
    const { platform } = process;
    const copyCommand =
      platform === 'darwin' ? Key.COMMAND + 'v' : Key.CONTROL + 'v';
    inputId.sendKeys(copyCommand);

    const inputPwd = await driver.wait(
      until.elementLocated(
        By.css('#gatsby-focus-wrapper form label input[type=password]'),
      ),
      3000,
    );
    const userPwd = process.env.USER_PASSWORD;
    inputPwd.sendKeys(userPwd, Key.ENTER);

    const faucetAddressFormClassName =
      '.alchemy-app-content-container .alchemy-faucet-request-component .alchemy-faucet-request-component-embeded';

    const addressInput = await driver.wait(
      until.elementLocated(
        By.css(
          `${faucetAddressFormClassName} input.alchemy-faucet-panel-input-text`,
        ),
      ),
      3000,
    );
    const address = process.env.RECEIVE_ADDRESS;
    copy(address);
    await addressInput.sendKeys(copyCommand);

    const faucetBtn = await driver.findElement(
      By.css(`${faucetAddressFormClassName} button.alchemy-faucet-button`),
    );
    await faucetBtn.click();
  } finally {
    setTimeout(() => {
      driver.quit();
    }, 30000);
  }
}

export default crawler;
