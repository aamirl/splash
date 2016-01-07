var addLang = {
	manager_seller_social : {
		tables : {
			active : {
				columns : {
					id : 'Id',
					name : 'Title',
					added : 'Added',
					details : 'Details',

					total : 'Total',
					user : 'Customer',
					item : 'Item',
					status : 'Status',
					actions : 'Status'
					}
				}
			},
		ajax : {
			add : {
				success : 'Offer Added!'
				}
			}
		}
	}

$.extend(s_lang, addLang);
