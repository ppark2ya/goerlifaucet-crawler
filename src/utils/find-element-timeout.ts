import { By, until, WebDriver } from 'selenium-webdriver';
require('chromedriver');

async function findElementTimeout(
  driver: WebDriver,
  cssSelector: string,
  delay?: number,
) {
  const findElement = await driver.wait(
    until.elementLocated(By.css(cssSelector)),
    delay || 15000,
  );
  return findElement;
}

export default findElementTimeout;
