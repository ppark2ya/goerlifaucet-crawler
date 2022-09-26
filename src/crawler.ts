import {
  Builder,
  Browser,
  By,
  until,
  Key,
  WebDriver,
} from 'selenium-webdriver';
import copy from './copy-to-clipboard';
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

async function findElementTimeout(
  driver: WebDriver,
  cssSelector: string,
  delay?: number,
) {
  const findElement = await driver.wait(
    until.elementLocated(By.css(cssSelector)),
    delay || 3000,
  );
  return findElement;
}

async function crawler() {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(
      new chrome.Options()
        // .headless()
        .addArguments(
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

    const inputId = await findElementTimeout(
      driver,
      '#gatsby-focus-wrapper form label input[type=email]',
    );
    const userId = process.env.USER_ID;
    copy(userId);
    /**
     * @see https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
     */
    const { platform } = process;
    const copyCommand =
      platform === 'darwin' ? Key.COMMAND + 'v' : Key.CONTROL + 'v';
    inputId.sendKeys(copyCommand);

    const inputPwd = await findElementTimeout(
      driver,
      '#gatsby-focus-wrapper form label input[type=password]',
    );
    const userPwd = process.env.USER_PASSWORD;
    inputPwd.sendKeys(userPwd, Key.ENTER);

    const faucetAddressFormClassName =
      '.alchemy-app-content-container .alchemy-faucet-request-component .alchemy-faucet-request-component-embeded';

    const addressInput = await findElementTimeout(
      driver,
      `${faucetAddressFormClassName} input.alchemy-faucet-panel-input-text`,
      5000,
    );
    const address = process.env.RECEIVE_ADDRESS;
    copy(address);
    await addressInput.sendKeys(copyCommand);

    const faucetBtn = await findElementTimeout(
      driver,
      `${faucetAddressFormClassName} button.alchemy-faucet-button`,
      5000,
    );
    await faucetBtn.click();
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      driver.quit();
    }, 60000);
  }
}

export default crawler;
