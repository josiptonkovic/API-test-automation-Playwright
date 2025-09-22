import { test, expect, APIResponse } from '@playwright/test';
import pets from '../../../test-data/pets.json';
import { createPet, getPet } from '../helpers/api-requests';

test.describe('Test Endpoint GET /pet/{PetID}', () => {

  let response: APIResponse;
  let body: any;
  const testPet = pets[0];

  test.beforeAll(async ({ request }) => {
    await createPet(request, testPet);
    response = await getPet(request, testPet.id);
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

test.describe('Test Endpoint GET /pet/{PetID} validations', () => {

  let response: APIResponse;
  let body: any;

  test.beforeAll(async ({ request }) => {
    response = await request.get('https://petstore.swagger.io/v2/pet/1894345534', {
      headers: {
        'Accept': 'application/json',
        'api_key': 'testApiKey',
      },
    });
    body = await response.json();
  });

  test('should return 404 status', async () => {
    expect(response.status()).toBe(404);
  });

  test('should have a code property', async () => {
    expect(body).toHaveProperty('code');
    expect(typeof body.code).toBe('number');
    expect(body.code).toBe(1);
  });

  test('should have a type property', async () => {
    expect(body).toHaveProperty('type');
    expect(typeof body.type).toBe('string');
    expect(body.type).toBe('error');
  });

  test('should have a message property', async () => {
    expect(body).toHaveProperty('message');
    expect(typeof body.message).toBe('string');
    expect(body.message).toBe('Pet not found');
  });

});
