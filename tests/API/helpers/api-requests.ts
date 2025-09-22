import { APIRequestContext, APIResponse } from '@playwright/test';
import { sendRequest } from './request-helper';
import pets from '../../../test-data/pets.json';

const baseUrl = 'https://petstore.swagger.io/v2/pet';
const defaultHeaders = {
  'Accept': 'application/json',
  'api_key': '',
};
const testPet = pets[0];
const editedPet = pets[1];

export async function createPet(request: APIRequestContext, pet: any): Promise<APIResponse> {
  return await sendRequest(request, {
    method: 'POST',
    url: baseUrl,
    headers: defaultHeaders,
    data: testPet,
  });
}

export async function getPet(request: APIRequestContext, id: number): Promise<APIResponse> {
  return await sendRequest(request, {
    method: 'GET',
    url: `${baseUrl}/${testPet.id}`,
    headers: defaultHeaders,
  });
}

export async function updatePet(request: APIRequestContext, pet: any): Promise<APIResponse> {
  return await sendRequest(request, {
    method: 'PUT',
    url: baseUrl,
    headers: defaultHeaders,
    data: editedPet,
  });
}
