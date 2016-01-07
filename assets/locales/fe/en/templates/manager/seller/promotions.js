var addLang = {
	manager_promotions : {
		tables : {
			general : {
				columns : {
					id : 'ID',
					apply : 'Applied To',
					type : 'Type',
					value : 'Value',
					start : 'Start',
					end : 'End',
					status : 'Status'
					}
				}
			},
		ajax : {
			add : {
				success : 'Promotion Added!',
				},
			edit : {
				success : 'Promotion Edited!'
				},
			end : {
				confirm : 'Are you sure you wish to end this promotion? Cancelling or ending a promotion is permanent. If you wish to promote this product in any other way, you will have to create another promotion for this item at a later point of time.',
				success : 'Promotion was successfully ended. From this point onwards, no item will have this promotion applied to it. If a purchase was made before this promotion was ended, you will be required to uphold the said prices and quantities.'
				}
			},
		text : {
			no_inventory : 'You have no active items in your inventory! Please make sure to add items before you are able to add any promotions for these items.',
			edit : 'Edit',
			details : 'Details',
			add : 'Add'
			},
		buttons : {
			close : {
				label : 'Close'
				},
			save : {
				label : 'Save Changes'
 				},
 			add : {
 				label : 'Add Promotion'
 				}
			},
		form : {
			value : {
				placeholder : {
					1 : 'Enter percentage of discount',
					2 : 'Describe the custom gift to be included',
					3 : 'Enter how many and how much percent off total',
					4 : 'Enter the flat price to be discounted off total'
					}
				}
			}
		}
	}

$.extend(s_lang, addLang);
