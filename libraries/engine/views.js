var _fs = require('fs');
var _swag = require('swag');
var _path = require('path');
var _glob = require('glob');
var _handlebars = require('handlebars').create();
var _factory = _s_load.helper('forms');

_factory.register(_handlebars);

Views.prototype = {
	get render() {
		var self = this;
		return {
			layout : function*(layout, data){
				var layout = _path.join('./views/layouts/' + layout + '.htm');
				var locale = _s_l.active.get();
				if(!self.registered) yield self.register.partials();
				if(!self.cache.layouts[layout]){
					self.cache.layouts[layout] = _handlebars.compile(_fs.readFileSync(layout, {encoding: 'utf8'}))
					}
				return (self.cache.layouts[layout])(_s_util.merge({
					paths : _s_config.paths,
					locale : {
						main : _s_config.paths.dist.locales + locale + '/',
						pieces : _s_config.paths.dist.locales + locale + '/pieces/' ,
						templates : _s_config.paths.dist.locales + locale + '/templates/'
						}
					},data), {});
				},
			dynamic : function(name,options){
				var partial = _handlebars.partials[name];
			    if (!partial) return "";
			    return new _handlebars.SafeString(_handlebars.compile(partial)(options));
				}
			}
		},
	get register() {
		var self = this;
		return {
			partial : function(){
    			_handlebars.registerPartial.apply(_handlebars, arguments);
				},
			partials : function*(){
				var readdir = function() {
					return function(done) {
						_glob('**/*'+'.html' , { cwd : './views' } , done);
						};
					}
				var partials = yield readdir();
				_s_u.each(partials , function(file,i){
					self.register.partial(file.slice(0,-1*5).replace('pieces/','') , _fs.readFileSync(_path.join('./views',file), {encoding: 'utf8'}))
					})
				self.registered = true;
				},
			helper : function(){
    			_handlebars.registerHelper.apply(_handlebars, arguments);
				}
			}
		}
	}

function Views(){
    this.cache = {
		layouts : {},
		templates : {}
		};
	this.registered = false;
	var self = this;

	_swag.registerHelpers(_handlebars);
	
	// render helpers
	this.register.helper("template", function (name, options){
		var s = self.render.dynamic('templates/'+name, options);
		return s;
		});
	this.register.helper("partial", function (name, options){
		return self.render.dynamic(name, options);
		});	
	this.register.helper("component", function (name, options, config){
		if(_fs.existsSync(_s_config.paths.components + name + '.js')){
			options.component = require(_s_config.paths.components + name + '.js')[(options.components && options.components[name] ? options.components[name] : 'component')](options);
			return self.render.dynamic(name, options);
			}
		return "";
		});
	this.register.helper('renderConditional', function(piece, value, options) {
		console.log(piece + '/' + value);
		return self.render.dynamic(piece + '/' + value , options);
		});
	
	// view helpers
	this.register.helper('date', function(str) {
		return _s_dt.convert.date.output(str);
		});
	this.register.helper('datetime', function(str) {
		return _s_dt.convert.datetime.output(str);
		});
	this.register.helper('json', function(str) {
		return new _handlebars.SafeString(str);
		});
	this.register.helper('jsonify', function(obj) {
		return new _handlebars.SafeString(JSON.stringify(obj));
		});
	this.register.helper('price', function(obj) {
		var currency = _s_load.library('currency');
		if(obj instanceof Array){
			if(obj[0] == obj[1]) return currency.convert.front(obj[0]);
			return currency.convert.front(obj[0], true) + ' - ' + currency.convert.front(obj[1]);
			}
		return currency.convert.front(obj);	
		});
	this.register.helper('flag', function(id) {
		return '';
		});
	this.register.helper('ifCond', function(v1, v2, options) {
		if(v1 == v2) {
			return options.fn(this);
			}
		return options.inverse(this);
		});
	this.register.helper('inArray', function(array, value, block) {
		if (_s_u.indexOf(array, value) != -1) {
			return block.fn(this);
			} 
		else {
			return block.inverse(this);
			}
		});
	this.register.helper("displays", function (obj, id) {
		var str = "";
		if(!obj) return;
		var config = (obj.config !== undefined && obj.config.titles ? obj.config : { titles : {sm:4},items:{sm:8}});


		if(!id.inverse && !id.fn) obj = obj[id];

		_s_u.each(obj, function(val, key){
            if(key == 'config' || key == 'setup') return;
            if(val.label && (!val.data && !val.converted)){
            	val.converted = val.label;
            	val.label = 'Attribute';
            	}

            str += '<div class="form-group display"><label class="col-xs-12 col-sm-' + config.titles.sm + ' control-label display">'+(val.label ? val.label : key.replaceAll('_',' '))+'</label><span class="form-display col-xs-12 col-sm-'+config.items.sm+'" style="max-height:none;">' + (val.converted ? val.converted : (val.data ? val.data : val)) + '</span></div>';
            })
		return new _handlebars.SafeString(str);
		})
	}


module.exports = function(){
  	if(!(this instanceof Views)) { return new Views(); }
	}

