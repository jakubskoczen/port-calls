import client from './client';

test('should create axios instance with the base url from dotenv', () => {
    expect(client.defaults.baseURL).toBe(process.env.API_BASE_PATH);
})