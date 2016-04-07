'use strict'; 

var app = require('express')();
var path = require('path');



app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

// app.use('/', function (req, res, next) {
// 	console.log('headers', req.headers);
//     if (req.headers['x-custom-header-name'] !== 'secret') {
//         res.redirect('/'); //Or just do what you want to
//     }
//     next();
// });
app.use('/api', require('../api/api.router'));

app.use('/auth', require('../auth/auth.router'));






app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.use(require('./error.middleware'));

module.exports = app;