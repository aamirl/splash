var _corporate = _s_load.library('corporate');


module.exports = {
	component : function(options){
		
		var obj = { 
			user : {
				name : _s_user.profile.name(),
				id : _s_user.profile.id()
				},
			employee : {
				master : _corporate.profile.master(),
				title : _corporate.profile.title(),
				}
			}

		return obj;
		}


	}