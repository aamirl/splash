var addLang = {
	manager_negotiations : {
		tables : {
			active : {
				columns : {
					id : 'Id',
					seller : 'Seller',
					item : 'Item',
					status : 'Status',
					started : 'Started',
					actions : 'Status'
					}
				}
			},
		ajax : {
			submit : {
				confirm : 'Are you sure you wish to submit this new offer? Doing so will cancel/reject all previous offers made by either parties.',
				success : 'Offer Submitted!'
				},
			cancel : {
				confirm : 'Are you sure you wish to cancel this negotiation? All offers will be cancelled and the negotiation will no longer be active or redeemable.',
				success : 'Negotiaton Cancelled!'
				},
			accept : {
				confirm : 'Are you sure you wish to accept this negotiation? In doing so, you are not obligated to purchase this item from the seller.',
				success : 'Negotiaton Accepted!'
				},
			redeem : {
				confirm : 'Are you sure you wish to redeem this offer? The item will be added to your cart, in which case you can purchase it. Note that the offer will not be considered redeemed until a successful offer occurs before the expiration date of the offer.',
				success : 'Item added!'
				}
			}
		}
	}

$.extend(s_lang, addLang);
