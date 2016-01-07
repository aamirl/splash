var addLang = {
	cart : {
		tables : {

			},
		ajax : {
			delete : {
				confirm : 'Are you sure you wish to delete this item?',
				},
			empty : {
				confirm : 'Are you sure you wish to empty your cart and delete all items?',
				},
			waive : {
				1 : {
					confirm : 'Are you sure you wish to unwaive the return policy? While the return policy will be reinstated, you will a higher price. To view the seller\'s return policy, please click the company name above and make your way to the \'Return Policy\' Tab.'
					},
				2 : {
					confirm : 'Are you sure you wish to waive the return policy on this item? You will be unable to return the item if you place this order with this lower price. To view the seller\'s return policy, please click the company name above and make your way to the \'Return Policy\' Tab.'
					}
				},
			finalize : {
				message : 'Finalizing Order...'
				}
			},
		text : {

			},
		buttons : {
			
			},
		form : {

			}
		}
	}

$.extend(s_lang, addLang);
