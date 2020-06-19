const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const apiRouter = require('./api/api');

const app = express();
const PORT = process.env.PORT || 4000;
