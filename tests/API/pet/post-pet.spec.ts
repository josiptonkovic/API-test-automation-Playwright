import { test, expect, APIResponse } from '@playwright/test';
import pets from '../../../test-data/pets.json'
import { createPet } from '../helpers/api-requests';

test.describe('Test Endpoint POST /pet', () => {

  let response: APIResponse;
  const testPet = pets[0];
  let body: any;


  test.beforeAll(async ({ request }) => {
    response = await createPet(request, testPet.id);
    body = await response.json();
  });

  test('should return 200 status', async () => {
    expect(response.status()).toBe(200);
  });

  test('should have correct ID', async () => {
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
    expect(body.id).toBe(testPet.id);
  });

  test('should have correct name', async () => {
    expect(body).toHaveProperty('name');
    expect(typeof body.name).toBe('string');
    expect(body.name).toBe(testPet.name);
  });

  test('should have correct category', async () => {
    expect(body).toHaveProperty('category');
    expect(typeof body.category).toBe('object');
    expect(body.category).toHaveProperty('id');
    expect(body.category.id).toBe(testPet.category.id);
    expect(typeof body.category.id).toBe('number');
    expect(body.category).toHaveProperty('name');
    expect(body.category.name).toBe(testPet.category.name);
    expect(typeof body.category.name).toBe('string');
  });

  test('should have a photoUrls property', async () => {
    expect(body).toHaveProperty('photoUrls');
    expect(typeof body.photoUrls).toBe('object');
    expect(body.photoUrls).toStrictEqual(testPet.photoUrls);
  });

  test('should have correct tags', async () => {
    expect(body).toHaveProperty('tags');
    expect(typeof body.tags).toBe('object');
    expect(body.tags).toEqual(testPet.tags);

    for (const tag of body.tags) {
      expect(typeof tag).toBe('object');
      expect(tag).not.toBeNull();
      expect(tag).toHaveProperty('id');
      expect(typeof tag.id).toBe('number');
      expect(tag).toHaveProperty('name');
      expect(typeof tag.name).toBe('string');
    }

  });

  test('should have correct status', async () => {
    expect(body).toHaveProperty('status');
    expect(typeof body.status).toBe('string');
    expect(body.status).toEqual(testPet.status);
  });

});
