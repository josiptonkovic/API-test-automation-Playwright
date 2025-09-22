import { test, expect, APIResponse } from '@playwright/test';

test.describe('Test Endpoint GET /pet/{PetID}', () => {

  let response: APIResponse;
  let body: any;

  test.beforeAll(async ({ request }) => {
    response = await request.get('https://petstore.swagger.io/v2/pet/15', {
      headers: {
        'Accept': 'application/json',
        'api_key': 'testApiKey',
      },
    });
    body = await response.json();
  });

  test('should return 200 status', async () => {
    expect(response.status()).toBe(200);
  });

  test('should have ID property', async () => {
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
  });

  test('should have a name property', async () => {
    expect(body).toHaveProperty('name');
    expect(typeof body.name).toBe('string');
  });

  test('should have a category property', async () => {
    expect(body).toHaveProperty('category');
    expect(typeof body.category).toBe('object');
    expect(body.category).toHaveProperty('id');
    expect(typeof body.category.id).toBe('number');
    expect(body.category).toHaveProperty('name');
    expect(typeof body.category.name).toBe('string');
  });

  test('should have a photoUrls property', async () => {
    expect(body).toHaveProperty('photoUrls');
    expect(typeof body.photoUrls).toBe('object');
  });

  test('should have a tags property', async () => {
    expect(body).toHaveProperty('tags');
    expect(typeof body.tags).toBe('object');

    for (const tag of body.tags) {
      expect(typeof tag).toBe('object');
      expect(tag).not.toBeNull();
      expect(tag).toHaveProperty('id');
      expect(typeof tag.id).toBe('number');
      expect(tag).toHaveProperty('name');
      expect(typeof tag.name).toBe('string');
    }

  });

  test('should have a status property', async () => {
    expect(body).toHaveProperty('status');
    expect(typeof body.status).toBe('string');
  });

});