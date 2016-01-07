
module.exports = {
	component : function(options){
		if(options.corporate){
			return {
				fulfillment : true,
				corporate : true
				}
			}
		
		var obj = {
			fulfillment: (_s_load.library('countries').fulfillment.fulfilled(_s_seller.profile.country()))	
			}

		if(_s_seller.profile.policy(true)){
			obj.policy = {};
			var policy = _s_seller.profile.policy();
			if(policy[1].allowed == 2) obj.policy.d = true;
			if(policy[2].allowed == 2) obj.policy.i = true;
			}

		console.log(obj);

		return obj;
		}
	}