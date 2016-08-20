const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

let app = express();
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// Morgan
app.use(morgan('dev'));
// Sass preprocessor
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, '../public/sass'),
    dest: path.join(__dirname, '../public/css'),
    debug: true,
	indentedSyntax: true,
    outputStyle: 'compressed',
	prefix: '/css'
}));
// View Engine
app.set('views', path.join(__dirname, '/../views'));
app.engine('.hbs', require('express-handlebars')({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', '.hbs');
// Static Directory
app.use(express.static(path.join(__dirname, '../public'), {
	etag: true,
	lastModified: true,
    maxAge: 0
}));

// Routing
// Index Router
app.use('/', require(__dirname + '/routes/index'));
// Songs Router
app.use('/api/songs', require(__dirname + '/routes/api/songs'));

// Listen
http.createServer(app).listen(80);
console.log('Server now listening');

process.on('uncaughtException', function(err) {
    console.error(err.message); // eslint-disable-no-console
    console.error(err.stack); // eslint-disable-no-console
    process.exit(err);
});
