// Express provides the HTTP server and routing functionality.
const express = require('express');
// Reuse the conversion library so the API and unit tests share the same logic.
const hexToRgb = require('./hexToRgb');

// Create the app separately from the server listener so tests can import it.
const app = express();
// Parse JSON request bodies before route handlers process them.
app.use(express.json());

/**
 * Convert a JSON hex color to RGB channels.
 *
 * Request body: { "hex": "#336699" }
 * Response body: { "hex": "#336699", "rgb": { "r": 51, "g": 102, "b": 153 } }
 */
app.post('/api/convert', (req, res) => {
  try {
    // Convert the hex value supplied by the client.
    const rgb = hexToRgb(req.body && req.body.hex);
    return res.status(200).json({
      hex: req.body.hex,
      rgb
    });
  } catch (error) {
    // Report invalid client input with a Bad Request response.
    return res.status(400).json({ error: error.message });
  }
});

// Export the app for both the server entry point and integration tests.
module.exports = app;
