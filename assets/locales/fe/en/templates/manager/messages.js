var addLang = {
	manager_messages : {
		tables : {
			box : {
				columns : {
					users : 'Participants',
					priority : 'Priority',
					last : {
						user : 'Last Sent By',
						subject : 'Last Sent Subject',
						sent : 'Last Sent'
						},
					actions : 'Actions'
					}
				}
			},
		ajax : {
			delete : {
				trash :	{
					confirm : 'Are you sure you wish to delete this message thread? The entire thread will be deleted.',
					},
				forever : {
					confirm : 'Are you sure you wish to delete this message thread forever? This action is not reversible.',
					}
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
