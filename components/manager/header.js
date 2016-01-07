var _corporate = _s_load.library('corporate');


module.exports = {
	component : function(options){
		
		var obj = { 
			user : {
				name : _s_user.profile.name(),
				id : _s_user.profile.id()
				},

			}

		if(_s_seller.is.seller()){
			obj.seller = {
				id : _s_seller.profile.id(),
				name : _s_seller.profile.name()
				}
			}
		if(_corporate.privileges.is()){
			obj.employee = true
			}
			
		return obj;
		},
	echo : function(){

		}


	}