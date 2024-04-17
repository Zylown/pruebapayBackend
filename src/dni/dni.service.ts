import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class DniService {
  async getDni(inputValue: string) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      });
      const page = await browser.newPage();

      page.setDefaultNavigationTimeout(0);

      await page.goto('https://eldni.com/pe/buscar-datos-por-dni', {
        timeout: 0,
      });

      await page.type(
        '#buscar-datos-por-dni>.form-group.input-clear>.form-input',
        inputValue,
      );

      await page.click('#btn-buscar-datos-por-dni');

      await page.waitForSelector('.form-group');

      const result = await page.evaluate(() => {
        const nombreCompleto =
          document.querySelector('#completos').attributes[2].value;
        return nombreCompleto;
      });
      await browser.close();
      // console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
