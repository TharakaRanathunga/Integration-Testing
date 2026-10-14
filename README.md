# Hex-to-RGB REST API

A small Node.js project that converts hexadecimal colour values into RGB
values. It includes a reusable conversion module, an Express REST API, unit
tests, and integration tests.

## Features

- Converts three-digit and six-digit hexadecimal colours.
- Accepts values with or without a leading `#`.
- Validates malformed input and returns useful errors.
- Exposes the conversion through `POST /api/convert`.
- Tests the conversion logic with Jest unit tests.
- Tests the Express route with Jest and Supertest integration tests.

## Requirements

- Node.js 18 or newer
- npm

## Installation

Open a terminal in the project directory and install the dependencies:

```powershell
npm install
```

`node_modules` is created locally by npm and is excluded from Git by
[`.gitignore`](.gitignore). It must not be committed to the repository.

## Running the API

Start the server with:

```powershell
npm start
```

The server listens on:

```text
http://localhost:3000
```

You can use another port by setting the `PORT` environment variable:

```powershell
$env:PORT = 3001
npm start
```

## API reference

### `POST /api/convert`

The request must contain a JSON body with a three-digit or six-digit
hexadecimal colour. The leading `#` is optional.

Request:

```http
POST http://localhost:3000/api/convert
Content-Type: application/json

{
  "hex": "#336699"
}
```

Successful response (`200 OK`):

```json
{
  "hex": "#336699",
  "rgb": {
    "r": 51,
    "g": 102,
    "b": 153
  }
}
```

Invalid values return `400 Bad Request`:

```json
{
  "error": "Hex value must contain 3 or 6 hexadecimal digits"
}
```

## Testing

Run the complete automated test suite:

```powershell
npm test
```

The expected result is:

```text
Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
```

### Unit tests only

The unit tests call the conversion function directly. They cover six-digit
conversion, three-digit shorthand conversion, and invalid input:

```powershell
npx jest test/hexToRgb.test.js --runInBand
```

Expected result:

```text
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

### Integration tests only

The integration tests send HTTP-style requests through the Express app. They
check the successful `200` response and the invalid-input `400` response:

```powershell
npx jest test/app.integration.test.js --runInBand
```

Expected result:

```text
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

The integration tests import the Express app directly through Supertest, so
the server does not need to be started with `npm start` when running Jest.

## Manual REST-client test

Start the API with `npm start`, then open a second PowerShell terminal and run:

```powershell
$body = @{ hex = "#ff8800" } | ConvertTo-Json
$response = Invoke-WebRequest `
  -UseBasicParsing `
  -Uri "http://localhost:3000/api/convert" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

Write-Host "HTTP status: $($response.StatusCode)"
Write-Host "Response body: $($response.Content)"
```

Expected output:

```text
HTTP status: 200
Response body: {"hex":"#ff8800","rgb":{"r":255,"g":136,"b":0}}
```

An invalid request can be tested with:

```powershell
$body = @{ hex = "invalid" } | ConvertTo-Json

try {
  Invoke-WebRequest -UseBasicParsing `
    -Uri "http://localhost:3000/api/convert" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
}
catch {
  Write-Host "HTTP status: $([int]$_.Exception.Response.StatusCode)"
}
```

The expected status is `400 Bad Request`. The same requests can be sent using
Postman with the Desktop Agent.

## Project structure

```text
src/
  app.js          Express app and API route
  hexToRgb.js     Reusable hex-to-RGB conversion function
  server.js       Starts the HTTP listener
test/
  hexToRgb.test.js          Unit tests
  app.integration.test.js   Express integration tests
package.json      Scripts and dependencies
package-lock.json Exact dependency versions
.gitignore        Excludes generated and environment-specific files
```

## NPM scripts

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm start` | Start the Express server |
| `npm test` | Run all unit and integration tests |


