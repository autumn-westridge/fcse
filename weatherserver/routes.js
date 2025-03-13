'use strict';

const router = require('express').Router();
const errors = require('./src/errors');

const weatherRouter = require('./src/weather/router');

router.use('/weather', weatherRouter);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
