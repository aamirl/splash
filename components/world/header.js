
module.exports = {
	component : function(options){
		var _countries = _s_load.library('countries');
		var obj = { 
			items : (_s_cart.get.count()),
			zipcode : (_countries.active.postal.get() || 'Postal'),
			country : _countries.active.get()
			}

		if(_s_user.privileges.logged()){
			obj.logged = {
				id : _s_user.profile.id(),
				name : _s_user.profile.name(),
				}
			}
		if(_s_seller.is.seller()){
			obj.seller = {
				id : _s_seller.profile.id(),
				name : _s_seller.profile.name(),
				}
			}
			
		return obj;
		}
	}