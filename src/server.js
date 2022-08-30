const express = require('express');
require('express-async-errors');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);
app.use((errors, request, response, next) => {
  console.log(errors);
  response.sendStatus(500);
});

app.listen(3333, () => console.log('Server running at http://localhost:3333'));
