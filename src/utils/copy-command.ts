import { Key } from 'selenium-webdriver';

/**
 * @see https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
 */
export default function copyCommand() {
  const { platform } = process;
  const command = platform === 'darwin' ? Key.COMMAND + 'v' : Key.CONTROL + 'v';
  return command;
}
