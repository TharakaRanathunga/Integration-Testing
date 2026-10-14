// Import the configured Express app without duplicating route definitions.
const app = require('./app');

// Use PORT when supplied; otherwise run locally on port 3000.
const port = process.env.PORT || 3000;

// Start the HTTP listener for manual REST-client testing.
app.listen(port, () => {
  console.log(`Hex-to-RGB API listening on port ${port}`);
});
