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
        ignoreDefaultArgs: ['--disable-extensions'],
        ignoreHTTPSErrors: true,
      });
      const page = await browser.newPage();

      page.setDefaultNavigationTimeout(0);

      await page.goto('https://eldni.com/pe/buscar-datos-por-dni', {
        timeout: 0,
        // waitUntil: 'networkidle2',
      });

      console.log('Página cargada correctamente');

      await page.type(
        '#buscar-datos-por-dni>.form-group.input-clear>.form-input',
        inputValue,
      );

      console.log('Campo de búsqueda completado');

      await page.click('#btn-buscar-datos-por-dni');

      console.log('Botón de búsqueda clickeado');

      await page.waitForSelector('.form-group');

      console.log('Selector encontrado');

      const result = await page.evaluate(() => {
        const nombreCompleto =
          document.querySelector('#completos').attributes[2].value;
        return nombreCompleto;
      });
      console.log('Resultado obtenido:', result);
      await browser.close();
      return result;
    } catch (error) {
      console.log('Error en getDni:', error);
      return null;
    }
  }
}
