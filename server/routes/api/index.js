const express = require('express');
const restApi = require('./rest');
const graphQLApi = require('./graph');

const router = express.Router();

router.use('/rest', restApi);
router.use('/graph', graphQLApi);

module.exports = router;