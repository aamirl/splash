var addLang = {
	manager_seller_negotiations : {
		tables : {
			active : {
				columns : {
					id : 'Id',
					user : 'User',
					item : 'Item',
					status : 'Status',
					started : 'Started',
					actions : 'Status'
					}
				}
			},
		ajax : {
			submit : {
				confirm : 'Are you sure you wish to submit this new offer? Doing so will cancel/reject all previous offers made by either parties and will let them either respond with a rejection or acceptance of this deal.',
				success : 'Offer Submitted!'
				},
			cancel : {
				confirm : 'Are you sure you wish to cancel this negotiation? All offers will be cancelled and the negotiation will no longer be active or redeemable.',
				success : 'Negotiaton Cancelled!'
				},
			accept : {
				confirm : 'Are you sure you wish to accept this negotiation? By accepting this negotiation, you will be binding yourself to the terms of the offer - there is no way to cancel this action.',
				success : 'Negotiaton Accepted!'
				}
			}
		}
	}

$.extend(s_lang, addLang);
