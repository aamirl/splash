
module.exports = {
	render : function(){

		var obj = { 
			view : 'intro/default',
			data : { 
				header : 
					{ 
						backstretch : false,
						easing : true
					}, 
				body : 'intro/full'
				}
			}

		return obj;
		},
	send : function*(){
		var data = _s_req.validate({
			email : { v:['isEmail'] }
			})
		if(data.failure) return {failure :{msg:'Please enter a valid email.' , code : 300}}
		
		var _model = _s_load.model('intro');

		var get = yield _model.get(data);
		console.log(get);
		if(get) return { failure : { msg : 'This email has already been registered' , code : 300 } };


		data.setup = {
			status : 1,
			active : 1,
			added : _s_dt.now.datetime(),
			ip : _s_req.ip()
			}

		var new_entry = yield _model.new(data);
		if(!new_entry) return { failure : { msg : 'The process of adding your email failed.' , code : 300 } }

		return { success : { msg : 'Thank you for requesting an invite to use our platform! Please check your email in the next few weeks for updates as we begin rolling out invitation spots.' , code : 300 } }

		}


	}