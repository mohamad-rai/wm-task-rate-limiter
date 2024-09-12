import request from 'supertest';
import app, { shutdown } from '../src/app';

describe('Rate Limiting', () => {
    afterAll(async () => {
        shutdown();
    })
    it('should limit requests to 10 per minute', async () => {
        const userId = 'testUser';
        for (let i = 0; i < 10; i++) {
            await request(app).get('/api/data').set('user_id', userId).expect(200);
        }

        const response = await request(app).get('/api/data').set('user_id', userId);
        expect(response.status).toBe(429);
        expect(response.text).toBe('Too many requests, please try again later');
    });
});
