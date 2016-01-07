var addLang = {
	manager_seller_returns : {
		tables : {
			active : {
				columns : {
					id : 'Id',
					total : 'Total',
					user : 'Customer',
					item : 'Item',
					status : 'Status',
					placed : 'Placed',
					actions : 'Status'
					}
				}
			},
		ajax : {
			policy : {
				message : 'Retrieving Policy'
				},
			save : {
				success : 'Policy Saved'
				},
			process :{
				confirm : 'Are you sure you wish to process this return? Doing so will take out the amount specified by you in order to ',
				success : 'Return Processed'
				},
			confirm : {
				confirm : 'Are you sure you wish to process this item as having been received?',
				success : 'Return Confirmed'
				}
			}
		}
	}

$.extend(s_lang, addLang);
