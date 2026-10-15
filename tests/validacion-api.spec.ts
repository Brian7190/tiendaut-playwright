import { test, expect } from '@playwright/test';

test('La API devuelve productos con nombre y precio mayor que cero', async ({ request }) => {
  // Consultar la API de productos
  const respuesta = await request.get('/api/productos');

  // Verificar que la respuesta sea correcta
  expect(respuesta.ok()).toBeTruthy();

  // Obtener los productos
  const productos = await respuesta.json();

  // Verificar que la respuesta sea un arreglo con productos
  expect(Array.isArray(productos)).toBeTruthy();
  expect(productos.length).toBeGreaterThan(0);

  // Validar cada producto
  for (const producto of productos) {
    expect(typeof producto.nombre).toBe('string');
    expect(producto.nombre.trim().length).toBeGreaterThan(0);

    expect(typeof producto.precio).toBe('number');
    expect(producto.precio).toBeGreaterThan(0);
  }
});