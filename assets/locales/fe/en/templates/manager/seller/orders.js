var addLang = {
	manager_seller_orders : {
		tables : {
			active : {
				columns : {
					id : 'Id',
					total : 'Total',
					user : 'Customer',
					status : 'Status',
					placed : 'Placed',
					actions : 'Status'
					}
				}
			},
		ajax : {
			confirm : {
				confirm : 'Please make sure all tracking information is correct before continuing. Once you have done so, click continue to confirm this shipment.',
				success : 'Items Confirmed!'
				}
			}
		}
	}

$.extend(s_lang, addLang);
