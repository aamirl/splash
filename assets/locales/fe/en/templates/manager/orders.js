var addLang = {
	manager_orders : {
		tables : {
			active : {
				columns : {
					id : 'Ids',
					seller : 'Seller',
					total : 'Total',
					item : 'Item',
					quantity : 'Quantity',
					status : 'Status',
					placed : 'Placed',
					actions : 'Status'
					}
				},
			returns : {
				columns : {
					id : 'Ids',
					seller : 'Seller',
					total : 'Total',
					item : 'Item',
					quantity : 'Quantity',
					status : 'Status',
					placed : 'Placed',
					actions : 'Status'
					}
				}
			},
		ajax : {
			cancel : {
				confirm : 'Are you sure you wish to cancel this order? There is no way to undo this action once confirmed.',
				success : 'Order Cancelled!'
				},
			return : {
				confirm : 'Are you sure you wish to start a return request for this item?',
				success : 'Request Submitted!'
				},
			process : {
				confirm : 'Are you sure you wish to have this item marked as sent?',
				success : 'Return Completed!'
				}
			}
		}
	}

$.extend(s_lang, addLang);
