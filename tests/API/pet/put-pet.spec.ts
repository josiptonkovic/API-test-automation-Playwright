import { test, expect, APIResponse } from '@playwright/test';
import pets from '../../../test-data/pets.json';
import { createPet, updatePet } from '../helpers/api-requests';

test.describe('Test Endpoint PUT /pet', () => {

  let response: APIResponse;
  let body: any;
  const testPet = pets[0];
  const editedPet = pets[1];

  test.beforeAll(async ({ request }) => {
    await createPet(request, testPet);
    response = await updatePet(request, editedPet);
    body = await response.json();
  });

  test('should return 200 status', async () => {
    expect(response.status()).toBe(200);
  });

  test('should edit the correct ID', async () => {
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
    expect(body.id).toBe(editedPet.id);
  });

  test('should edit the correct name', async () => {
    expect(body).toHaveProperty('name');
    expect(typeof body.name).toBe('string');
    expect(body.name).toBe(editedPet.name);
  });

  test('should edit the correct category', async () => {
    expect(body).toHaveProperty('category');
    expect(typeof body.category).toBe('object');
    expect(body.category).toHaveProperty('id');
    expect(body.category.id).toBe(editedPet.category.id);
    expect(typeof body.category.id).toBe('number');
    expect(body.category).toHaveProperty('name');
    expect(body.category.name).toBe(editedPet.category.name);
    expect(typeof body.category.name).toBe('string');
  });

  test('should edit the a photoUrls property', async () => {
    expect(body).toHaveProperty('photoUrls');
    expect(typeof body.photoUrls).toBe('object');
    expect(body.photoUrls).toStrictEqual(editedPet.photoUrls);
  });

  test('should edit the correct tags', async () => {
    expect(body).toHaveProperty('tags');
    expect(typeof body.tags).toBe('object');
    expect(body.tags).toEqual(editedPet.tags);

    for (const tag of body.tags) {
      expect(typeof tag).toBe('object');
      expect(tag).not.toBeNull();
      expect(tag).toHaveProperty('id');
      expect(typeof tag.id).toBe('number');
      expect(tag).toHaveProperty('name');
      expect(typeof tag.name).toBe('string');
    }

  });

  test('should edit the correct status', async () => {
    expect(body).toHaveProperty('status');
    expect(typeof body.status).toBe('string');
    expect(body.status).toEqual(editedPet.status);
  });

});
