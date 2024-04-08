import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class DniService {
  async getDni(inputValue: string) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      //16302511
      await page.goto('https://eldni.com/pe/buscar-datos-por-dni', {
        timeout: 0,
      });

      await page.type('#dni', inputValue);

      await page.click('#btn-buscar-datos-por-dni');

      await page.waitForSelector('.form-group');

      const result = await page.evaluate(() => {
        const nombre = document.querySelector('#nombres').attributes[2].value;
        const apellido1 =
          document.querySelector('#apellidop').attributes[2].value;
        const apellido2 =
          document.querySelector('#apellidom').attributes[2].value;
        const fullname = `${nombre} ${apellido1} ${apellido2}`;
        return fullname;
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
