const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const _ = require('lodash');
const cors = require('./cors');

express.response.jsonSuccess = function (data, meta) {
    let response = {data};
    if (meta) {
        Object.assign(response, meta);
    }

    this.json(response);
};
express.response.errorResponse = function (status, e) {
    this.status(status).send({message: _.isString(e) ? e : e.message});
};

app.use(jsonParser);
app.use(cors);

require('./routes')(app);

module.exports = app;