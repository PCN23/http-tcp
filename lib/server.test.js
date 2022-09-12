import request from 'supertest';
import { serve } from './server.js';

describe('The TCP server', () => {
  let server = null;

  beforeEach(() => {
    // Deliberately omit the port so we get an available one.
    server = serve('localhost', undefined);
  });

  afterEach(() => {
    server.close();
  });

  // This test will fail initially since the project doesn't start with a
  // working HTTP server.
  it('connects on the default port', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('GET posts with json', async () => {
    const res = await request(server)
      .get('/posts')
      .expect(200);
      expect(res.body).toEqual({
      name: expect.any(String),
      age: expect.any(String),
    });
  });
});
