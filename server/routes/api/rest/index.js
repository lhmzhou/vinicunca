const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const ensureCtype = require('express-ensure-ctype');
var cookieParser = require('cookie-parser');

var inventory = require('./inventory');
var orders = require('./orders');

const router = express.Router();

// router.use('/', ensureCtype('json'));
router.use('/', bodyParser.json());
router.use('/', cookieParser());
router.use('/', cors());

router.use('/inventory',inventory.router);
router.use('/orders',orders.router);

module.exports = router;