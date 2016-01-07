var fs = require('fs');
var path = require('path');
var glob = require('glob');

var merge = function (obj1, obj2) {
    var c = {};
    var keys = Object.keys(obj2);
    for(var i=0; i!==keys.length; i++) {
        c[keys[i]] = obj2[keys[i]];
        }

    keys = Object.keys(obj1);
    for(i=0; i!==keys.length; i++) {
        if (!c.hasOwnProperty(keys[i])) {
            c[keys[i]] = obj1[keys[i]];
            }
        }

    return c;
    };


/* Capture the layout name; thanks express-hbs */
var rLayoutPattern = /{{!<\s+([A-Za-z0-9\._\-\/]+)\s*}}/;

var read = function (filename) {
    return function(done) {
        fs.readFile(filename, {encoding: 'utf8'}, done);
        };
    };

function Hbs(options) {
    this.handlebars = require('handlebars').create();

    this.Utils = this.handlebars.Utils;
    this.SafeString = this.handlebars.SafeString;

    var self = this;

    if(!options.viewPath) { throw new Error('must specify view path'); }

    options = options || {};
    this.viewPath = options.viewPath;
    this.templateOptions = options.templateOptions || {};
    this.extname = options.extname || '.hbs';
    this.partialsPath = options.partialsPath || [];
    this.contentHelperName = options.contentHelperName || 'contentFor';
    this.blockHelperName = options.blockHelperName || 'block';
    this.defaultLayout = options.defaultLayout || '';
    this.layoutsPath = options.layoutsPath || '';
    this.locals = options.locals || {};

    this.partialsRegistered = false;
    this.cache = {};
    this.blocks = {};

    // block helper
    this.registerHelper(this.blockHelperName, function(name, options) {
        // instead of returning self.block(name), render the default content if no
        // block is given
        val = self.block(name);
        if(val === '' && typeof options.fn === 'function') {
            val = options.fn(this);
            }

        return val;
        });

    // contentFor helper
    this.registerHelper(this.contentHelperName, function(name, options) {
        return self.content(name, options, this);
        });

    return this;
    };

Hbs.prototype.render = function*(tpl, locals){
    var tplPath = path.join(this.layoutsPath, tpl + this.extname), template, rawTemplate, layoutTemplate;
    locals = merge(this.locals, locals || {});

    if(!this.partialsRegistered && this.partialsPath !== ''){
        yield this.registerPartials();
        }

    if(this.layoutTemplate) this.layoutTemplate = yield this.cacheLayout();
    if(!this.cache[tpl]){
        rawTemplate = yield read(tplPath);
        this.cache[tpl] = {
            template: this.handlebars.compile(rawTemplate)
            }

        if(rLayoutPattern.test(rawTemplate)){
            var layout = rLayoutPattern.exec(rawTemplate)[1];
            this.cache[tpl].layoutTemplate = this.handlebars.compile(rawLayout);
            }
        }
    template = this.cache[tpl].template;
    layoutTemplate = this.cache[tpl].layoutTemplate || this.layoutTemplate;
    
    return template(locals, this.templateOptions);
    }

Hbs.prototype.getLayoutPath = function(layout) {
    if(this.layoutsPath) {
        return path.join(this.layoutsPath, layout + this.extname);
        }
    return path.join(this.viewPath, layout + this.extname);
    };


Hbs.prototype.cacheLayout = function(layout) {
    var hbs = this;
    return function* () {
        if(!layout && !hbs.defaultLayout) {
            return hbs.handlebars.compile('{{{body}}}');
            }

        if(!layout) { layout = hbs.defaultLayout; }

        var layoutTemplate;
        try {
            var rawLayout = yield hbs.loadLayoutFile(layout);
            layoutTemplate = hbs.handlebars.compile(rawLayout);
            } 
        catch (err) {
            console.error(err.stack);
            }

        return layoutTemplate;
        };
    };

/**
 * Load a layout file
 */

Hbs.prototype.loadLayoutFile = function(layout) {
  var hbs = this;
  return function(done) {
    var file = hbs.getLayoutPath(layout);
    read(file)(done);
  };
};

/**
 * Register helper to internal handlebars instance
 */

Hbs.prototype.registerHelper = function() {
    this.handlebars.registerHelper.apply(this.handlebars, arguments);
    };

Hbs.prototype.renderDynamic = function(name, options) {

    var partial = this.handlebars.partials[name];

    
    if (!partial) return "";
    return new this.handlebars.SafeString(this.handlebars.compile(partial)(options));
    };

/**
 * Register partial with internal handlebars instance
 */

Hbs.prototype.registerPartial = function() {
  this.handlebars.registerPartial.apply(this.handlebars, arguments);
};

/**
 * Register directory of partials
 */

Hbs.prototype.registerPartials = function () {
  var self = this;

  if(!Array.isArray(this.partialsPath)) {
    this.partialsPath = [this.partialsPath];
  }

  /* thunk creator for readdirp */
  var readdir = function(root) {
    return function(done) {
      glob('**/*' + self.extname, {
        cwd: root,
      }, done);
    };
  };

  /* Read in partials and register them */
  return function *() {
    try {
      var resultList = yield self.partialsPath.map( readdir );
      // console.log(resultList);
      var files = [];
      var names = [];

      if (!resultList.length) { return; }

      // Generate list of files and template names
      resultList.forEach(function(result,i) {
        result.forEach(function(file) {
          files.push(path.join(self.partialsPath[i], file));
          names.push(file.slice(0,-1*self.extname.length));
        });
      });

      console.log(files);
      console.log(names);

      // Read all the partial from disk
      partials = yield files.map(read);
      for(var i=0; i!==partials.length; i++) {
        self.registerPartial(names[i], partials[i]);
      }
      self.partialsRegistered = true;
    } catch(e) {
      console.error('Error caught while registering partials');
      console.error(e);
    }

  };
};

/**
 * The contentFor helper delegates to here to populate block content
 */

Hbs.prototype.content = function(name, options, context) {
  // fetch block
  var block = this.blocks[name] || (this.blocks[name] = []);

  // render block and save for layout render
  block.push(options.fn(context));
};

/**
 * block helper delegates to this function to retreive content
 */

Hbs.prototype.block = function(name) {
  // val = block.toString
  var val = (this.blocks[name] || []).join('\n');

  // clear the block
  this.blocks[name] = [];
  return val;
};


module.exports = function(options){
    if(!(this instanceof Hbs)) { return new Hbs(options); }
    }