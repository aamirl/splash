var addLang = {
	manager_corporate_inventories : {
		tables : {
			active : {
				columns : {
					condition : 'Condition',
					price : 'Pricing',
					quantity : 'Quantity',
					seller : 'Seller',
					shipping : 'Shipping',
					fulfillment : 'Fulfillment',
					shown : 'Shown',
					actions : 'Actions',
					id : 'Id',
					listing : 'Listing'
					}
				},
			},
		ajax : {
			
			},
		text : {
			pricing : {
				standard1 : 'Domestic',
				sale1 : 'Domestic Sale',
				return1 : 'Domestic (No Return)',
				sreturn1 : 'Domestic Sale (No Return)',
				standard2 : 'International',
				sale2 : 'International Sale',
				return2 : 'International (No Return)',
				sreturn2 : 'International Sale (No Return)',
				local : 'Local'
				}
			},
		buttons : {
			
			},
		form : {

			}
		}
	}

$.extend(s_lang, addLang);
