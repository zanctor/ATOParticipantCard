const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const jsonParser = bodyParser.json();
const _ = require('lodash');

express.response.jsonSuccess = function(data) {
  this.json({data, success: true})
};
express.response.errorResponse = function(status, e) {
    this.status(status).send({success: false, data: {message: _.isString(e) ? e : e.message}});
};

app.use(express.static(path.join(process.cwd(), "app/client")));
app.use(jsonParser);

require('./routes')(app);

module.exports = app;