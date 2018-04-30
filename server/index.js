const express = require('express');
const proxy = require('http-proxy-middleware');
const settings = require('./settings');
const views = require('./views');

const app = express();
settings(app);
views(app);

// starts app
const port = process.env.PORT || 7213;
const host = process.env.HOST || 'localhost';
app.use('/webpack', proxy({
  target: `http://${host}:${+port + 1}`,
  changeOrigin: true
}));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
