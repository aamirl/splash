
var static_vars = {
	1: { 
		length : {
			divisor : 2.54,
			unit : {
				full : 'Inches',
				abbr : 'in'
				}
			},
		weight : {
			divisor : 0.453592,
			unit : {
				full : 'Pounds',
				abbr : 'lbs'
				}
			}
		},
	2: { 
		length : {
			divisor : 1,
			unit : {
				full : 'Centimeters',
				abbr : 'cm'
				}
			},
		weight : {
			divisor : 1,
			unit : {
				full : 'Kilograms',
				abbr : 'kgs'
				}
			}
		}
	}


function Dimensions(){

	!this.active.get() ? this.active.set(1) : null;

	}



Dimensions.prototype = {
	active : {
		get : function(truthy){
			return  _s_session.get('active.dimensions', truthy);
			},
		set : function(standard){
			_s_session.set('active.dimensions', standard);
			}
		},
	get : {
		units : function(standard, full){
			var r = static_vars[standard];
			return {
				weight : r.weight.unit[(full?'full':'abbr')],
				length : r.length.unit[(full?'full':'abbr')]
				}
			}
		},
	get convert() {
		var self = this;
		var length = 'length|width|height';
		var weight = 'weight';
		return {
			front : function(key, dim, label){
				var c = static_vars[self.active.get()];
				
               	// we test to see if its a length dimension or a weight dimension
                if(new RegExp(weight).test(key)){
                	var converted = parseFloat((parseFloat(dim) / c.weight.divisor).toFixed(2));
                	if(label) {
                		if( label == 'full' ) return converted + ' ' + c.weight.unit.full
                		else return converted + ' ' + c.weight.unit.abbr;
                		}
                	else{
                		return converted;
                		}
                	}
                else{
                	var converted = parseFloat((parseFloat(dim) / c.length.divisor).toFixed(2));
                	if(label) {
                		if( label == 'full' ) return converted + ' ' + c.length.unit.full
                		else return converted + ' ' + c.length.unit.abbr;
                		}
                	else{
                		return converted;
                		}
                	}
				},
			back : function(key, dim){
				var c = static_vars[self.active.get()];
				if(new RegExp(weight).test(key)){
                	return parseFloat((parseFloat(dim) * c.weight.divisor).toFixed(2));
                	}
                else{
                	return parseFloat((parseFloat(dim) * c.length.divisor).toFixed(2));
                	}
				}
			}
		}
	}



module.exports = function(){
  	if(!(this instanceof Dimensions)) { return new Dimensions(); }
	}

