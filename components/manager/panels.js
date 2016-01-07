

module.exports = {
	component : function(options){
		
		var obj = { 
			panels : {

				}
			}

		if(_s_seller.is.seller()){
			if(!_s_seller.profile.policy(true)){
				obj.panels.policy = {
					color : 'red',
					class : 'return-panel',
					title : 'Setup Return Policy',
					icon : 'mail-reply',
					text : "Let's setup a return policy, even if it means not having one.",
					url : '/manager/seller/returns'
					}
				}
			if(!_s_seller.financials.set(true)){
				obj.panels.policy = {
					color : 'teal',
					class : 'banking-panel',
					title : 'Setup Banking',
					icon : 'exclamation-circle',
					text : "Let's get a bank account hooked up so that we can get you your money!",
					url : '/manager/seller/financials'
					}
				}
			}
		if(!_s_user.profile.email.verified()){
			obj.panels.email = {
				color : 'red',
				class : 'email-panel',
				title : 'Verify Email Address',
				icon : 'file',
				text : "Please verify your email.",
				url : '/manager/account'
				}
			}
		
		return obj;
		}


	}