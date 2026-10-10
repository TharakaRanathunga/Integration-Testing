const request = require('supertest');
const app = require('../src/app');

describe('POST /api/convert', () => {
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

  test('returns a client error for an invalid hex value', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: 'not-a-color' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Hex value must contain 3 or 6 hexadecimal digits'
    });
  });
});
