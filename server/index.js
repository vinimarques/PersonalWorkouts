'use strict';

const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const server = express();
const bodyParser = require('body-parser')
const path = require('path');

const Model = require('./models/model');
const Api = require('./controllers/api');

class App {

  constructor() {
    this.config = {
        "port": 3000,
        "database": {
            "host" : "mysql995.umbler.com",
            "user": "personalroot",
            "password" : "q1w2e3r4t5",
            "database" : "personalworkouts",
            "charset" : "utf8"
        },
        "security": {
            "secret": "4jZE8eJt3VJDDNyCVstT5buc"
        }
    };

    Model.initialize(this.config.database);

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use('/api', Api);
    server.use('/manager', express.static(path.join(__dirname, 'manager/dist')));
    server.use('/', express.static(path.join(__dirname, 'app/dist')));

    server.listen(this.config.port || 3000, () => {
      console.log(`server listening on port ${this.config.port || 3000}`);
    });
  }

}

global.app = new App();
