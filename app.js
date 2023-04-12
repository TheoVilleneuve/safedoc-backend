require("dotenv").config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/connection');

var confidentialitiesRouter = require('./routes/confidentialities');
var doctorsRouter = require('./routes/doctors');
var gendersRouter = require('./routes/genders');
var languagesRouter = require('./routes/languages');
var orientationsRouter = require('./routes/orientations');
var recommandantionsRouter = require('./routes/recommandantions');
var sectorsRouter = require('./routes/sectors');
var specialtiesRouter = require('./routes/specialties');
var tagsRouter = require('./routes/tags');
var usersRouter = require('./routes/users');

var app = express();
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/confidentialities', indexRouter);
app.use('/doctors', doctorsRouter);
app.use('/genders', gendersRouter);
app.use('/languages', indexRouter);
app.use('/orientations', orientationsRouter);
app.use('/recommandations', indexRouter);
app.use('/sectors', indexRouter);
app.use('/specialties', indexRouter);
app.use('/tags', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
