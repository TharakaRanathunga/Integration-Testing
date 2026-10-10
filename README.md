# Hex-to-RGB REST API

This project demonstrates unit and integration testing with a small JavaScript
library and an Express REST API.

## Requirements

- Node.js 18 or newer
- npm

## Install and run

Install dependencies from `package.json`:

```bash
npm install
```

Start the API:

```bash
npm start
```

The server listens on `http://localhost:3000` (or the value of `PORT`).

## API specification

### `POST /api/convert`

Send a JSON object containing a three- or six-digit hexadecimal color. The
leading `#` is optional.

Request:

```http
POST /api/convert
Content-Type: application/json

{"hex":"#336699"}
```

Successful response (`200`):

```json
{
  "hex": "#336699",
  "rgb": { "r": 51, "g": 102, "b": 153 }
}
```

Malformed values return `400` with an error message:

```json
{"error":"Hex value must contain 3 or 6 hexadecimal digits"}
```

The reusable conversion function is documented in
[`src/hexToRgb.js`](src/hexToRgb.js), and the route is defined in
[`src/app.js`](src/app.js). `src/server.js` only starts the listener, which
allows the integration test to import the app without opening a network port.

## Tests

Run the complete test suite:

```bash
npm test
```

The unit tests in [`test/hexToRgb.test.js`](test/hexToRgb.test.js) call the
library directly and verify six-digit conversion, shorthand conversion, and
invalid input handling. The integration tests in
[`test/app.integration.test.js`](test/app.integration.test.js) send HTTP
requests through the Express app and verify both the successful JSON response
and the `400` response for invalid input.

Expected result after a clean install:

```text
Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
```

## REST client example

With the server running, the same endpoint can be checked with cURL:

```bash
curl -X POST http://localhost:3000/api/convert ^
  -H "Content-Type: application/json" ^
  -d "{\"hex\":\"#ff8800\"}"
```

Expected response:

```json
{"hex":"#ff8800","rgb":{"r":255,"g":136,"b":0}}
```
