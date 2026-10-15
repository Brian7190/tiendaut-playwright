import { test, expect } from '@playwright/test';

test('Iniciar sesión con campos vacíos muestra un mensaje de error', async ({ page }) => {
  // Abrir la página de inicio de sesión
  await page.goto('/login.html');

  // Intentar iniciar sesión sin ingresar datos
  await page.getByRole('button', { name: 'Entrar' }).click();

  // Verificar que aparezca el mensaje de error
  await expect(page.getByRole('alert')).toBeVisible();

  // Verificar que el usuario permanezca en el login
  await expect(page).toHaveURL(/login\.html/);
});