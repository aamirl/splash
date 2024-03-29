
function SFactory() {
    
    var helpers = {
        input: input,
        password : password,
        display: display,
        select: select,
        textarea : textarea,
        checkbox : checkbox,
        buttons: buttons,
        quick : quick
        };

    // helper functions and tags
    function sizing(type, obj, config){
        if(type == 1) return ( obj.title && obj.title.sm !== undefined ? obj.title.sm : (config.titles && config.titles.sm !== undefined ? config.titles.sm : 4) );
        else return ( obj.item && obj.item.sm !== undefined ? obj.item.sm : (config.items && config.items.sm !== undefined ? config.items.sm : 4) );
        }

    function extend(obj1, obj2) {
        for(var key in obj2) {
            obj1[key] = obj2[key];
            }
        return obj1;
        }
    function start(obj, config, sub){
        return (!sub ? (obj.display || config.display ? '<div class="form-group display">' : '<div class="form-group">') : '') +
            (obj.label ? '<label class="col-xs-12 col-sm-' + sizing(1,obj,config) + (config.titles.offset ? ' col-sm-offset-' + config.titles.offset : '') + ' control-label '+ (obj.display || config.display ? 'display' : (obj.classes && obj.classes.indexOf('validate') !== -1 ? 's-d-red' : '' )) + '">' + obj.label + '</label>' : '') +
            '<div class="col-xs-12 col-sm-' + sizing(2,obj,config) + (config.items.offset ? ' col-sm-offset-' + config.items.offset : '') + '">';
        }
    function finish(obj, config, sub){
        var str = '</div>';
        if(obj.items) $.each(obj.items, function(item){ str += helpers[item.type](item, config, true) });
        return str += (sub ? '</div>' : '');
        // return str += (!sub ? '</div>' : '');
        }
    function style(obj){
        var str = '';
        if(obj.style){
            $.each(obj.style, function(attr,value){
                str += attr + ':' + value + ';';
                })
            }
        return str;
        }
    function value(obj, config){
        var type = (obj.sv && obj.sv.type != undefined ? obj.sv.type : (config.sv && config.sv.type != undefined ? config.sv.type : 0));
        var value = (obj.sv && obj.sv.value != undefined ? obj.sv.value : (config.sv && config.sv.value != undefined ? config.sv.value : ''));
        
        switch(type){
            case 0 :
                var send = '';
                break;
            case 1 :
                var send = _s_session.get(value + '.' + obj.id);
                break;
            }
        return (send != undefined ? send : '');
        }

    function quick(){

        return {
            displays : function(obj){
                var arr = obj.data;
                var config = { titles : { sm : obj.l }, items : { sm : obj.v } };
                var str = (obj.container ? '<div class="form-horizontal">' : '');
                $.each(arr, function(key, val){
                    str += '<div class="form-group display">' + '<label class="col-xs-12 col-sm-' + sizing(1,obj,config) + ' control-label display">'+(val.label ? val.label : key.replaceAll('_',' '))+'</label>' + '<span class="form-display col-xs-12 col-sm-'+sizing(2,obj,config)+'" style="max-height:none;' + style(obj) + '">' + (val.converted ? val.converted : (val.data ? val.data : val)) + '</span>' + finish(obj, config, false);
                    })
                return (obj.container ? str += '</div>' : str);
                }
            }
        }

    // form components
    function display(obj, config){
        return start(obj, config, false) + '<span class="form-display" style="max-height:none;' + style(obj) + '">' + obj.value + '</span>' + finish(obj, config, false);
        }
    function input(obj, config, sub){
        return start(obj, config, sub) +
            '<input type="text" ' + (obj.extra !== undefined ? obj.extra : '') + ' class="form-control ' + (obj.classes !== undefined ? obj.classes : '') + '" id="'  + (obj.id !== undefined ? obj.id : '')  + '" placeholder="' + (obj.placeholder != undefined ? obj.placeholder : '') + '" value="' + value(obj, config) + '" style="' + style(obj) + '"  ' + ((obj.display || config.display) ? 'disabled' : '' ) + ' >' + finish(obj, config, sub);
        }
    function password(obj, config, sub){
        return start(obj, config, sub) +
                        '<input type="password" ' + (obj.extra !== undefined ? obj.extra : '') + ' class="form-control password ' + (obj.classes !== undefined ? obj.classes : '') + '" id="'  + (obj.id !== undefined ? obj.id : '')  + '" placeholder="' + (obj.placeholder != undefined ? obj.placeholder : '') + '" style="' + style(obj) + '" ' + ((obj.display || config.display) ? 'disabled' : '' ) + '>' +
                    finish(obj, config, sub);
        }
    function checkbox(obj, config, sub){
        return '<div class="form-group"><div class="col-sm-offset-' + sizing(1,obj,config) + ' col-sm-' + sizing(2,obj,config) + '"><div class="checkbox"><input type="checkbox" ' + (obj.extra !== undefined ? obj.extra : '') + ' id=' + obj.id + ' ' + (obj.value == 2 ? 'checked' : '') + ' style="'+style(obj)+'" ' + ((obj.display || config.display) ? 'disabled' : '' ) + '><label for="' + obj.id + '">' + obj.label + '</label></div></div></div>';
        }
    function select(obj, config, sub){
        var insert = value(obj,config);

        if(obj.options instanceof Object){
            var options = '';
            $.each(obj.options, function( value , title){
                options += '<option value="' + value +'" ' + (value == insert ? 'selected' : '')+' >'+title+'</option>';
                })
            }
        else{
            var options = obj.options;
            }
        return start(obj,config,sub) + 
            '<select class="form-control ' + (obj.classes !== undefined ? obj.classes : '') + '" ' + (obj.extra !== undefined ? obj.extra : '') + ' id="'  + (obj.id !== undefined ? obj.id : '')  + '" style="' + style(obj) + '" ' + (obj.multiple ? 'multiple' : '') + ((obj.display || config.display) ? ' disabled ' : '' ) + ' >' + options + '</select>' + 
            finish(obj, config, sub);
        }
    function textarea(obj, config, sub){
        return start(obj, config, sub) +
            '<textarea ' + (obj.extra !== undefined ? obj.extra : '') + ' class="form-control ' + (obj.classes !== undefined ? obj.classes : '') + '" id="'  + (obj.id !== undefined ? obj.id : '')  + '" placeholder="' + (obj.placeholder != undefined ? obj.placeholder : '') + '" style="resize:vertical; '+style(obj)+'"  '+(obj.characters ? 'maxlength="'+ obj.characters + '"' : '' ) + ((obj.display || config.display) ? ' disabled ' : '' ) + '>' + value(obj, config) + '</textarea>' + (obj.characters ? '<div class="col-sm-offset-' + sizing(1,obj,config) + '" style="padding-left:15px;"><span>Characters Remaining: </span><span class="character-counter">' + obj.characters + '</span></div>' : '' ) +
            finish(obj, config, sub);
        }

    function buttons(){
        return {
            container : function(obj){
                var str = '';
                $.each(obj, function(ind, button){ 
                    str += buttons().button(button);
                    })
                return '<div class="buttons-container">'+str+'</div>';
                },
            button : function(obj, config){
                return '<button type="button" class="btn btn-' + obj.color +' '+(obj.classes !== undefined ? obj.classes : '')+' " id="'+(obj.id !== undefined ? obj.id : '')+'" style="'+style(obj)+'">' + (obj.icon ? '<i class="fa fa-' + obj.icon + '"></i> ' : '') + obj.title + '</button>';
                }
            }
        }


    return helpers;
    };