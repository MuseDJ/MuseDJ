const http = require('http');
const https = require('https');
const fs = require('fs');
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
// Babel preprocessor
// TODO FIXME
// app.use(require('babel-middleware')({
// 	srcPath: __dirname + '/../public/',
// 	babelOptions: {
// 		presets: ['es2015']
// 	},
// 	debug: true
// }));
// View Engine
app.set('views', path.join(__dirname, '/../views'));
app.engine('.hbs', require('express-handlebars')({
    defaultLayout: "main",
    extname: "hbs"
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
let httpServer = http.createServer(app).listen(80);
console.log("Server now listening");
// TODO: Implement HTTPS on origin
// let httpsServer = https.createServer({
// 	key: fs.readFileSync(path.join(__dirname, '../private/key.pem')),
// 	cert: fs.readFileSync(path.join(__dirname, '../private/certificate.pem'))
// }, app).listen(443);

process.on('uncaughtException', function(err) {
    console.error(err.message);
    console.error(err.stack);
    process.exit(err);
});
