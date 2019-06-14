import request from 'supertest';
import app from '../app';

describe('Test the root path', () => {
    test('It should response the GET method', () => (
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
        })
    ));
});
