const express = require('express');
const hexToRgb = require('./hexToRgb');

const app = express();
app.use(express.json());

/**
 * Convert a JSON hex color to RGB channels.
 *
 * Request body: { "hex": "#336699" }
 * Response body: { "hex": "#336699", "rgb": { "r": 51, "g": 102, "b": 153 } }
 */
app.post('/api/convert', (req, res) => {
  try {
    const rgb = hexToRgb(req.body && req.body.hex);
    return res.status(200).json({
      hex: req.body.hex,
      rgb
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = app;
