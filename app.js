'use strict'

// var http = require('http');
// var https = require('https');
var fs = require('fs');

GLOBAL._s_app = require('koa')();
GLOBAL._s_config = require('./config');

_s_app.name = _s_config.app.name;
_s_app.keys = _s_config.app.keys;

GLOBAL._s_load = require('./libraries/engine/loader')();


GLOBAL._s_views = _s_load.engine('views');
GLOBAL._s_db = _s_load.engine('database')
GLOBAL._s_q = require('q');

GLOBAL._s_cache = _s_load.engine('cache');
GLOBAL._s_u = require('underscore');
GLOBAL._s_util = _s_load.helper('utility');

// helpers
// _s_app.use(require('koa-sslify')());
_s_app.use(require('koa-logger')());
_s_app.use(require('koa-cors')());
_s_app.use(require('koa-generic-session')({
	store: require('koa-redis')(),
	ttl : 345600000
	}));
_s_app.use(require('koa-body')({formidable:{uploadDir:__dirname}}));
_s_app.use(require('koa-static')(__dirname + '/public/'));


// _s_app.use(require('koa-compress')({
// 	filter: function (content_type) {
// 		return /text/i.test(content_type)
// 		},
// 	threshold: 2048,
// 	flush: require('zlib').Z_SYNC_FLUSH
// 	}));


_s_app.use(function*(next){

	GLOBAL._s_req = _s_load.engine('request' , this.request);
	GLOBAL._s_session = _s_load.engine('session' , this.session);
	GLOBAL._s_dt = _s_load.engine('datetime');
	GLOBAL._s_countries = _s_load.engine('countries');
	GLOBAL._s_l = _s_load.engine('locales');

	GLOBAL._s_loc = _s_load.engine('location', this.request.ip);

	this.res.removeHeader("X-Powered-By");


	if(this.request.method == 'GET'){
		if(this.request.path == '/'){
			var viewData = yield require(__dirname+'/controllers/intro/home').render();
			viewData.data.location = _s_loc.active.get();
			viewData.data.paths = _s_config.paths;

			this.body = yield _s_views.render.layout(viewData.view, viewData.data);
			this.status = 200;
			this.session = _s_session.get();
			}
		else{
			var exists = fs.existsSync(__dirname + '/controllers' + this.request.path );

			if(!exists) this.redirect('/')
			else {
				var viewData = yield require(__dirname + '/controllers' + this.request.path ).render();

				if(!viewData.redirect) {
					viewData.data.location = _s_loc.active.get();
					viewData.data.paths = _s_config.paths;

					this.body = yield _s_views.render.layout(viewData.view, viewData.data);
					this.status = 200;
					this.session = _s_session.get();
					}
				else{
					this.redirect(_s_config.paths.root + viewData.redirect);
					}
				}
			}
		}
	else if(this.request.method == 'POST'){
		
		var route = this.request.path.split('/');
		
		var method = route[route.length-1];
		delete route[route.length-1];
		route = route.join('/');
		route = route.substring(0,route.length-1);
		if(fs.existsSync(__dirname + '/controllers' + route + '.js')){

			// var info = yield getMethod(this, route, method);

			var info = yield require(__dirname + '/controllers' + route)[method](_s_app);
			if(!_s_u.isObject(info)) return { body : { failure : { msg : 'Request Not Found' , code : 300 } } }
			
			if(info.redirect) return this.redirect(info.redirect);
			this.session = _s_session.get();
			this.body = info;
			this.status = 200;
			}
		}
	else{
		this.body = 'Invalid Request';
		this.status = '400';
		}
	});

_s_app.listen(4500);

// http.createServer(_s_app.callback()).listen(80);
// https.createServer({
// 	key : fs.readFileSync('/root/sellyx/certs/www_sellyx_com.key'),
// 	cert : fs.readFileSync('/root/sellyx/certs/star_sellyx_com.pem')
// 	} , _s_app.callback()).listen(443);
