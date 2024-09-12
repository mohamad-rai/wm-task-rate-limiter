import request from 'supertest';
import app, { shutdown } from '../src/app';
import cacheService from '../src/service/cacheService';

describe('Response Caching', () => {
  afterAll(async () => {
    shutdown();
  })
  it('should cache the response', async () => {
    const userId = 'testUser';
    const response = await request(app).get('/api/data').set('user_id', userId);
    const cachedResponse = await cacheService.getCache(userId);
    expect(cachedResponse).toEqual(JSON.parse(response.text));
  });
});
