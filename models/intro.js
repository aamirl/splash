// orders models


module.exports = {
	new : function*(obj, meta){
		return yield _s_db.es.add({
			index : 'intro',
			body : obj
			}, meta);
		},
	update : function*(obj){
		var doc = {
			id : obj.id,
			doc : (obj.doc?obj.doc:obj),
			index : 'intro',
			merge : true
			}
		delete obj.id;
		return yield _s_db.es.update(doc);
		},
	get : function*(obj){
		// if we have just an id we just submit that;
		if(obj.id || typeof obj == 'string') return yield _s_db.es.get('intro', obj);

		var search = {
			index : 'intro',
			body : {
				query : {
					term : {email:obj.email }
					}
				}
			};

		// if(obj.email) search.body.query.bool.must.push({term:{'email':obj.email}})
		return yield _s_db.es.search(search, obj);
		}
	}
