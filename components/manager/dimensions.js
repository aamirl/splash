
module.exports = {
	component : function(options){
		var _dimensions = _s_load.library('dimensions');
		return _dimensions.get.units(_dimensions.active.get());
		}
	}