import { test, expect } from '@playwright/test';

test('Vaciar carrito deja el contador en 0 sin errores de JavaScript', async ({ page }) => {
  const errores: string[] = [];

  page.on('pageerror', error => {
    errores.push(error.message);
  });

  await page.goto('/catalogo.html');

  // Esperar a que carguen los productos
  await expect(page.getByTestId('producto')).toHaveCount(4);

  // Agregar un producto al carrito
  await page.getByTestId('producto')
    .filter({ hasText: 'Teclado mecánico' })
    .getByRole('button', { name: 'Agregar al carrito' })
    .click();

  // Comprobar que el contador aumentó
  await expect(page.getByTestId('contador-carrito')).toHaveText('1');

  // Vaciar el carrito
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();

  // Verificar que el contador regrese a cero
  await expect(page.getByTestId('contador-carrito')).toHaveText('0');

  // Verificar que no se produjeron errores de JavaScript
  expect(errores).toEqual([]);
});