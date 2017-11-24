const express = require('express');
const _ = require('lodash');
const router = express.Router();

const Auth = require('../services/auth');
const Resolve = require('../services/resolve');
const Validator = require('../services/validator');
const ApiError = require('../services/error');

const Consts = require('../models/consts');

const Promise = require('bluebird');

router.get('/consts', Resolve.send(
	function (req) {
		return Consts.all()
			.then(result => {
				return {
					success: true,
					data: {
						types: result[0],
						difficulties: result[1]
					}
				};
			})
			.catch((err) => {
				console.log(err);
				return {
					success: false,
					error: {
						status: 500,
						message: err
					}
				};
			});
	}
));

require('./routes/users')(router);
require('./routes/exercises')(router);
require('./routes/plans')(router);
require('./routes/days')(router);
require('./routes/day_exercises')(router);
require('./routes/calendar')(router);

module.exports = router;
