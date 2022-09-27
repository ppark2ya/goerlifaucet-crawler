import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Builder, Browser, By, Key } from 'selenium-webdriver';
import copyCommand from 'src/utils/copy-command';
import copy from 'src/utils/copy-to-clipboard';
import findElementTimeout from 'src/utils/find-element-timeout';
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

@Injectable()
export class CrawlerService {
  @Inject(WINSTON_MODULE_NEST_PROVIDER)
  private readonly logger: LoggerService;

  async getGoerliFaucet(userId: string, userPwd: string, address: string) {
    this.logger.debug(`userId: ${userId}`);
    this.logger.debug(`userPwd: ${userPwd}`);
    this.logger.debug(`address: ${address}`);

    const faucetUrl = 'https://goerlifaucet.com/';
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
      await driver.get(faucetUrl);
      this.logger.log('goerli faucet connected!');

      const loginBtn = await driver.findElement(
        By.css('.alchemy-faucet-login-nav-col button'),
      );
      await loginBtn.sendKeys(Key.ENTER);
      this.logger.log('login button clicked!');

      const inputId = await findElementTimeout(
        driver,
        '#gatsby-focus-wrapper form label input[type=email]',
      );
      this.logger.log('find input element success');

      await copy(userId);
      inputId.sendKeys(copyCommand());

      const inputPwd = await findElementTimeout(
        driver,
        '#gatsby-focus-wrapper form label input[type=password]',
      );
      this.logger.log('find password element success');

      inputPwd.sendKeys(userPwd, Key.ENTER);

      const faucetAddressFormClassName =
        '.alchemy-app-content-container .alchemy-faucet-request-component .alchemy-faucet-request-component-embeded';

      const addressInput = await findElementTimeout(
        driver,
        `${faucetAddressFormClassName} input.alchemy-faucet-panel-input-text`,
      );
      this.logger.log('find address input element success');

      await copy(address);
      await addressInput.sendKeys(copyCommand());

      const faucetBtn = await findElementTimeout(
        driver,
        `${faucetAddressFormClassName} button.alchemy-faucet-button`,
      );
      this.logger.log('find faucet button element success');
      await faucetBtn.sendKeys(Key.ENTER);

      this.logger.log('request faucet');
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(async () => {
        await driver.quit();
        this.logger.debug('driver disconnected');
      }, 60000);
    }
  }
}

export default CrawlerService;
