// Supertest sends HTTP-style requests to the Express app without opening a port.
const request = require('supertest');
// Import the app directly so each integration test controls its own request.
const app = require('../src/app');

// Group integration tests for the conversion endpoint.
describe('POST /api/convert', () => {
  // Verify a valid request returns success and the expected RGB object.
  test('returns RGB data for a valid hex value', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: '#ff8800' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      hex: '#ff8800',
      rgb: { r: 255, g: 136, b: 0 }
    });
  });

  // Verify invalid client input returns a 400 response and an error message.
  test('returns a client error for an invalid hex value', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: 'not-a-color' });

    console.log('Invalid request status:', response.status);
    console.log('Invalid request body:', response.body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Hex value must contain 3 or 6 hexadecimal digits'
    });
  });
});
