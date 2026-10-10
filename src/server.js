const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Hex-to-RGB API listening on port ${port}`);
});
