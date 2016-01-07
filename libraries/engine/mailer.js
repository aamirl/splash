// Mailer
var smtpTransport = require('nodemailer-smtp-transport');

var send = require('nodemailer').createTransport(smtpTransport({
		host : 'smtp.gmail.com',
		auth : {
			user : 'contact@sellyx.com',
			pass : 'sellyxWin23'
			}
		}));

function Mailer(){

	

	}


Mailer.prototype.send = function(obj){
	// obj must have to, subject, text, html version of mail
	obj.from = 'Sellyx Contact <contact@sellyx.com>';

	var deferred = _s_q.defer();	
	send.sendMail(obj, deferred.resolve());
	return deferred.promise.then(function(error, info){
		return error;	
		})

	}



module.exports = function(){
  	if(!(this instanceof Mailer)) { return new Mailer(); }
	}


















