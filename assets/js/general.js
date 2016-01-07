// $.detectSwipe.threshold = 200;

$(document).ajaxError(function(event, jqxhr, settings, thrownError){
    alertify.alert('There was an error.');
    });


var isTouch = function(){
    return 'ontouchstart' in window // works on most browsers 
    || window.navigator.msMaxTouchPoints ; // works on ie10
    }

var convertCurrency = function(input, label){
	var num = (parseFloat(input,10) * parseFloat($('#header_currency :selected').attr('rate'),10)).toFixed(2);
    if(label){
        return num + ' ' + $('#header_currency :selected').attr('abbr');
        }
    return num;
    }
var standardizeCurrency = function(input){
    return (parseFloat(input,10) / parseFloat($('#header_currency :selected').attr('rate'),10)).toFixed(2);
    }
var GetURLParameter = function(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for(var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
            }
        }
    }
var GetURLParameters = function(){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var obj = {}
    for(var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        obj[sParameterName[0]] = sParameterName[1];
        }
    return obj;
    }
var setUrl = function(route, exceptions){
    var obj = GetURLParameters();
    var returnString = '&route=' + route;
    delete obj.route;
    delete obj.ref_rel;
    $.each(obj, function(i,o){
        if($.inArray(i, exceptions) == -1 && i != ''){
            returnString += '&' + i + '=' + o;
            }
        })
    return returnString;
    }
var createSendTo = function(route, add, exceptions, from){
    from ? from = '&ref_rel=' + GetURLParameter('route') : from = "";
    return 'index.php?' + setUrl(route, exceptions) + add + from;
    }
var sendTo = function(route, add, exceptions, from){
    window.location.assign(createSendTo(route, add, exceptions, from));
    }
var redirectBasicUrl = function(route, add){
    window.location.assign(createBasicUrl(route, add));
    }
var createBasicUrl = function(route, add){
    !add ? add = '' : null;
    return 'index.php?route=' + route + '&sc=' + GetURLParameter('sc') + add;
    }
var setDefaults = function(inputData, div, addition, locked){
    try{
        div.find('.send').each(function(){
            $(this).hasClass('input-error') ? $(this).removeClass('input-error') : null;

            $this = $(this);
            var editVal;
            var id = $(this).attr('id');
            inputData[id.replace(addition, '')] != null ? editVal = (inputData[id.replace(addition, '')]).toString() : editVal = '';

            if($(this).hasClass('select2-container') || $(this).hasClass('select2-offscreen')){
                }
            else if($(this).is('select') && $(this).attr('multiple')){
                $this.find('option').prop('selected', false);
                var options = editVal.split(',');
                $.each(options, function(i,o){
                    if($this.hasClass('select-group')){
                        var bud = $this.siblings('.select-group');
                        bud.find('option[value="' + o + '"]').prop('selected', true).trigger('dblclick');
                        }
                    else{
                        $this.find('option[value="' + o + '"]').prop('selected', true);
                        }
                    })  
                }
            else if($(this).is('select') && $(this).hasClass('other-value')){
                if(editVal.indexOf('||||') !== -1){
                    $this.val(0).trigger('change');
                    $this.siblings('input').val(editVal.replace('||||', '')).trigger('change');
                    return;
                    }
                else{
                    $(this).val(editVal).trigger('change');
                    }
                }
            else if($(this).is('textarea')){
                editVal = editVal.replace(/<(?:.|\n)*?>/gm, '');
                $(this).val(editVal).trigger('keyup');
                }
            else if($(this).prop('type') == 'checkbox'){
                if($(this).hasClass('op')){
                    editVal == '2' || editVal == '' ? $(this).prop('checked', false) : $(this).prop('checked', true);
                    }
                else{
                    editVal == '1' || editVal == '' ? $(this).prop('checked', false) : $(this).prop('checked', true);
                    }
                
                $(this).trigger('change');
                }
            else if($(this).is('input')){
                editVal = editVal.replace(/<(?:.|\n)*?>/gm, '');
                $(this).hasClass('data-decimal') || $(this).hasClass('data-number') ? editVal = editVal.replace(/[a-zA-Z ]+/, '') : null;
                $(this).val(editVal).trigger('focusin').trigger('focusout');
                }
            else{
                editVal == '' ? editVal = $(this).find('option:first').attr('value') : null;
                $(this).val(editVal).trigger('change');
                }
            $(this).prop('disabled', locked);
            });
        }
    catch(err){
        alert(err);
        }
    }
var serializeAllData = function(div){
    try{
        var str = append =  '';

        if(div instanceof jQuery){
            json = false;
            var ajaxData = '';
            }
        else{
            json = true;
            var ajaxData = {};
            div = div.target;
            }


        div.children('div:not(.disabled)').find('> div:not(.disabled) .send:not(.select2-container)').each(function(){
            var encode = true;
            if($(this).prop('type') != 'radio'){
                if( $(this).attr('id').indexOf('__') != -1 ){
                    str = $(this).attr('id').substring($(this).attr('id').indexOf('__')+2);
                    }
                else{
                    str = $(this).attr('id');
                    }
                if($(this).is('span')){
                    append = $(this).text();
                    }
                else if($(this).is('select') && $(this).hasClass('other-value')){
                    if($(this).val() == 0){
                        append = '||||' + $(this).siblings('input').val();
                        }
                    else{
                        append = $(this).val();
                        }
                    }
                else if($(this).is('select') && $(this).hasClass('select-group')){
                    var chosen = $(this).find('option').length;
                    if( chosen > 0){
                        append = '';
                        $(this).find('option').each(function(i,o){
                            append += $(this).attr('value');
                            (i+1) < chosen ? append += ',' : null;
                            });
                        encode = false;
                        }
                    else{
                        append = 'null';
                        }
                    }
                else if($(this).prop('type') == 'checkbox'){
                    if($(this).hasClass('op')){
                        $(this).prop('checked') ? append = 1 : append = 2;
                        }
                    else{
                        $(this).prop('checked') ? append = 2 : append = 1;
                        }
                    }
                else{
                    append = $(this).val();
                    } 
                }
            else {
                str = $(this).attr('name').substring($(this).attr('name').indexOf('__')+2);
                append = $('input[name=' + $(this).attr('name') + ']:checked').val();
                }
            encode ? append = encodeURIComponent(append) : null;

            if(json){
                ajaxData[str] = append;
                }
            else{
                ajaxData += '&' + str + '=' + append;
                }
            });
        return ajaxData;
        }
    catch(err){
        alert(err)
        return '';
        }
    }
var createLoading = function(caption){
    return '<div class="buttons-container"><i class="fa fa-circle-o-notch fa-spin"></i><span> ' + caption + '</span></div>';
    }
var ajaxButton = function(btn, caption){
    btn.text('').append('<div style="text-align:center;"><i class="fa fa-spinner fa-spin" style="width:100%;display:inline-block;"></i><span> ' + caption + '</span></div>');
    btn.attr('disabled', true);
    }
var resetAjaxButton = function(btn, caption){
    btn.children().remove().end().append(caption);
    btn.attr('disabled', false);
    }
var validate = function(divs, alertshow){
    var i = 0;
    var count = divs.find('input:text.validate, input:password.validate, textarea.validate, select.validate').length;

    divs.find('input:text.validate, input:password.validate, textarea.validate, select.validate').each(function(){
        if($(this).is('input')||$(this).is('textarea')){
            if($(this).val()!=''){
                if($(this).hasClass('password')){
                    checkPassword($(this).val(), true) ? i++ : alertshow = false;
                    }  
                else if($(this).hasClass('email')){
                    checkEmail($(this).val(), true) ? i++ : alertshow = false;
                    }
                else{
                    i++;
                    }
                }
            else{
                $(this).addClass('input-error');
                }
            }
        else if($(this).is('select')){
            if($(this).hasClass('other-value')){
                i++;
                }
            else{
                if($(this).hasClass('cbn')){
                    if($(this).val() == null ){
                        i++;
                        }
                    else{
                        $(this).addClass('input-error');
                        }
                    }
                else{
                    if($(this).val() !=0 && $(this).val() != null){
                        i++;
                        }
                    else{
                        $(this).addClass('input-error');
                        }
                    }
                }
            }     
        else{
            if($(this).val()!=0){
                i++;
                }
            else{
                $(this).addClass('input-error');
                }
            }
        });
    if(i==count){
        return true;
        }
    alertshow ? alertify.error('Please fill in all required fields.') : null;
    return false;
    }
var numbersOnly = function(eventTrans){
    if ( $.inArray(eventTrans.keyCode,[46,8,9,27,13,110]) !== -1 || (eventTrans.keyCode == 65 && eventTrans.ctrlKey === true) || (eventTrans.keyCode >= 35 && eventTrans.keyCode <= 39)) {
            return;
            }
        else {
            if ( (eventTrans.keyCode < 48 || eventTrans.keyCode > 57) && (eventTrans.keyCode < 96 || eventTrans.keyCode > 105 )) {
                eventTrans.preventDefault(); 
                if($(document).find('.alertify-logs').children().length == 0){
                    alertify.error('Numbers only.');
                    }
                }
            }
    }
var decimalOnly = function(eventTrans){
    if ( $.inArray(eventTrans.keyCode,[46,8,9,27,13,110,190]) !== -1 || (eventTrans.keyCode == 65 && eventTrans.ctrlKey === true) || (eventTrans.keyCode >= 35 && eventTrans.keyCode <= 39)) {
            return;
            }
        else {
            if ( (eventTrans.keyCode < 48 || eventTrans.keyCode > 57) && (eventTrans.keyCode < 96 || eventTrans.keyCode > 105 )) {
                eventTrans.preventDefault(); 
                if($(document).find('.alertify-logs').children().length == 0){
                    alertify.error('Numbers and decimals only.');
                    }
                }
            }
    }
var checkEmail = function(str, alertShow){
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    var testResult = pattern.test(str);
    if(!testResult&&alertShow){
         if($(document).find('.alertify-logs').children().length == 0){
            alertify.error('Not a valid email address');
            }
        }
    return testResult;
    }
var checkPassword = function(str, alertShow){
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,16}$/;
    var testResult = pattern.test(str);
    if(!testResult && alertShow){
        alertify.alert('Please make sure your password satisfies the following conditions: <ul><li>Has at least one uppercase letter</li><li>Has at least one number</li><li>Is at least 7 characters long</li><li>Is less than 16 characters long</li></ul>');
        }
    return testResult;
    }
var cleanCurrency = function(value){
    value.val(value.val().replace(/[a-zA-Z ]+/, ''));    
    }
var createAjaxData = function(obj){
    var str = '';
    var exceptions = ['undefined','null','0','false','', false,0,null,undefined];

    $.each(obj.filters, function(i,o){
        if(i == 'y'){
            o = parseInt(obj.filters.x) + parseInt(o) ;
            }
        if(i == 'x'){
            o = obj.filters.base_x;
            }

        if( $.inArray(o, exceptions) === -1 && $.inArray(i, obj.exceptions) === -1 ){
            str += '&' + i + '=' + o;
            }
        });

    return str;
    }
var processAjaxData = function(urlPath){
    window.history.replaceState({},"", urlPath);
    }
var ajaxBottom = function(delay, func){
    var _throttleTimer = null;
    var _throttleDelay = delay;
    var $window = $(window);
    var $document = $(document);

    $window
        .off('scroll', ScrollHandler)
        .on('scroll', ScrollHandler);

    function ScrollHandler(e) {
        clearTimeout(_throttleTimer);
        _throttleTimer = setTimeout(function () {
            if ($window.scrollTop() + $window.height() > $document.height() - 20 && !$(document).data('noAjax')) {
                func();
                }

            }, _throttleDelay);
        }
    }

var createDisplayObj = function(data, valid){
    var staticArray = {};
    $.extend(true, staticArray, valid);
    $.each(staticArray, function(i,o){
        if(data[i]){
            staticArray[i] = {label: true, name: o, startValue : data[i], classes : ''};
            }
        else{
            delete staticArray[i];
            }
        });
    return staticArray;
    }

var createFormString = function(i, lS, cS, form, identifier, language){
    var aString = '<div class="sellyx-subpanel">';
    var name, startValue, id, placeholder;

    $.each(i, function(element, value){
        if(language){
            name = language[element].label;
            placeholder = language[element].placeholder;
            }
        else{
            value.name == 1 ? name = element.replace(/[_]/g, ' ').toLowerCase().replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase(); }) : name = value.name;
            if(value.placeholder){
                placeholder = value.placeholder;
                }
            else{
                placeholder = '';
                }
            }

        id = 'id="' + form + '__' + identifier + element + '"';

        switch(value.startValue){
            case 'none':
                startValue = '';
                break;
            case 'doc':
                $(document).data(id);
                break;
            default:
                startValue = value.startValue;
                break;
            }

        if(value.label == false){
            switch(value.type){
                case 'input':
                    aString += '<div class="form-group"><label class="col-sm-' + lS + ' control-label">' + name + '</label><div class="col-sm-' + cS + '"><input type="text" ' + value.extra + ' class="form-control ' + value.classes + '" ' + id + ' placeholder="' + placeholder + '" value="' + startValue + '"></div></div>';
                    break;
                case 'password':
                    aString += '<div class="form-group"><label class="col-sm-' + lS + ' control-label">' + name + '</label><div class="col-sm-' + cS + '"><input type="password" class="form-control ' + value.classes + '" ' + id + ' placeholder="' + placeholder + '" value="' + startValue + '"></div></div>';
                    break;
                case 'checkbox':
                    aString += '<div class="form-group"><div class="col-sm-offset-' + value.offset + ' col-sm-' + cS + '"><div class="checkbox"><input type="checkbox" ' + id + ' ' + startValue + '><label for="' + id + '">' + value.caption + '</label></div></div></div>';
                    break;
                case 'textarea':
                    if(value.characters){
                        var tbcount = 'maxlength="' + value.characters + '"';
                        value.classes += ' character-count ';
                        var tbcounter = '<div class="col-sm-offset-' + lS + '" style="padding-left:15px;"><span>Characters Remaining: </span><span class="character-counter">' + value.characters + '</span></div>';
                        }
                    else{
                        var tbcount = '';
                        var tbcounter = '';
                        }


                    aString += '<div class="form-group"><label class="col-sm-' + lS + ' control-label" >' + name + ' <br>Max Characters: ' + value.characters + '</label><div class="col-sm-' + cS + '"><textarea class="form-control ' + value.classes + '" ' + id + ' style="resize:' + value.resize + ';height:' + value.height + '" placeholder="' + placeholder + '" ' + tbcount + '>' + startValue + '</textarea></div>' + tbcounter + '</div>';
                    break;
                case 'select':
                    aString += '<div class="form-group"><label class="col-sm-' + lS + ' control-label">' + name + '</label><div class="col-sm-' + cS + '"><select class="form-control ' + value.classes + '" ' + id + '>' + value.options + '</select></div></div>';
                    break;
                case 'radio':
                    aString += '<div class="radio col-sm-' + lS + ' col-sm-offset-' + value.offset + '"><label><input type="radio" name="' + value.group +'" value="' + value.val + '">' + value.caption + '</label></div>';
                }
            }
        else{
            aString += '<div class="form-group form-display-form-group"><label class="col-sm-' + lS+ ' control-label form-display-form-label">' + name + '</label><div class="col-sm-' + cS + '"><span ' + id + ' class="form-display ' + value.classes + '">' + startValue + '</span></div></div>';
            }
        });
    return aString + '</div>';
    }
var createDisplayItem = function(obj){ 
    return  '<div class="form-group form-display-form-group">'+
                '<label class="col-sm-' + obj.lS + ' control-label form-display-form-label">' + obj.name + '</label>'+
                '<div class="col-sm-' + obj.sS + '">'+
                    '<span class="form-display" style="max-height:none;">' + obj.info + '</span>'+
                '</div>'+
            '</div>';
    }
var createDisplay = function(obj){
    var aString = '';
    if (obj.col){
        if(obj.col.values){
            aString += '<div class="col-xs-12 ' + obj.col.values + '">';
            }
        else{
            aString += '<div class="col-xs-12 col-sm-6">';            
            }
        }
    if(obj.heading){
        if(obj.heading.sellyx){
            aString += '<h6 class="sellyx-subheading sellyx-minus"><i class="pull-right fa fa-minus-square"></i>' + obj.heading.message + '</h6>';
            }
        else{
            aString += obj.heading.message;
            }
        }
    
    aString += '<div class="sellyx-subpanel">';

    if(obj.validate){
        $.each(obj.validate_array, function(i,o){
            if(obj.lang && obj.lang[o]){
                var name = obj.lang[o];                
                }
            else{
                var name = o.replace(/[_]/g, ' ').replace(obj.replace, '').toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                    });
                }
            
            if(obj.data[o]){
                aString += createDisplayItem({lS:obj.lS,sS:obj.sS,name:name,info:obj.data[o]});
                }
            });
        }
    else if(obj.display){
        aString += obj.display;
        }
    else{
        $.each(obj.data, function(i,o){
            if(obj.lang){
                var name = obj.lang[i];
                
                }
            else{
                var name = o.replace(/[_]/g, ' ').replace(obj.replace, '').toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                    });
                }
            aString += createDisplayItem({lS:obj.lS,sS:obj.sS,name:name,info:o});
            });
        }
    if (obj.col){
        return aString += '</div></div>';
        }
    return aString += '</div>';
    }
var showCatch = function(message){
    alertify.alert('[ ' + message + ' ] - ' + lang.ajax.error);
    }
var showFail = function(message){
    alertify.alert('[ ' + message + ' ] - ' + lang.ajax.fail);
    }
var createTableString = function(obj){
    var aString = '<table id="' + obj.table + '" class="table" style="margin-top:10px;margin-bottom:0px;"><thead><tr>';
    $.each(obj.columns, function(i,o){
        var talign;
        o.center ? talign = ' ;text-align:center; ' : talign = '';
        aString += '<td class="' + o.classes + '" style=" ' + o.style + talign +  '">' + o.name + '</td>';
        });
    aString += '</tr></thead><tbody>';
    if(obj.data){
        $.each(obj.data, function(i,daArr){
            if(obj.iddata){
                aString += '<tr data-iddata="' + daArr[obj.iddata] + '">';
                }
            else{
                aString += '<tr>';
                }

            $.each(obj.td, function(val, det){
                var talign;
                det.center ? talign = ' ;text-align:center; ' : talign = '';
                if(daArr[val]){
                    val = daArr[val];
                    }
                else{
                    val = '-';
                    }
                aString += '<td style="' + det.style + talign + '">' + val + '</td>';
                });
            aString += '</tr>';
            });
        }

    return aString += '</tbody></table>';
    }
var notificationRead = function(row, path, id){
    if(row){
        row.removeClass('row-chosen');
        }
    if(path){
        var route = path;
        }
    else{
        var route = GetURLParameter('route');
        }
    decrementNotifications();
    $.ajax({
        data: '&id=' + id,
        cache:false,
        url:'index.php?route=' + route + '/notificationRead',
        type:'post'
        })
    }
var removeImage = function(list, route, file){
    if(file.accepted != false && Object.keys(list).length > 0){
        var deleteFile = '&deleteFile=' + list[file.name].name;
        var url;
        list[file.name].existing ? url = 'index.php?route=' + route + '/removeExistingImages': url = 'index.php?route=' + route + '/removeTempImage';
        $.ajax({
            url: url,
            data: deleteFile,
            type: 'post',
            cache: false
            });
        delete list[file.name];
        }
    }

$(document).on('focusin', '.password', function(event){
    $(this).popover({'html':true});
    $(this).popover('show');
    });
$(document).on('focusout', '.password', function(event){
    $(this).popover('hide');
    });
$(document).on('click', '.sellyx-minus', function(event){
    event.stopImmediatePropagation();
    $(this).next('.sellyx-subpanel').slideToggle();
    var icon = $(this).find('i');
    icon.hasClass('fa-minus-square') ? icon.removeClass('fa-minus-square').addClass('fa-plus-square') : icon.removeClass('fa-plus-square').addClass('fa-minus-square');
    });
$(document).on('focusout', '.input-error', function(){
    if( $(this).hasClass('email')){
        checkEmail($(this).val(), false) ? $(this).removeClass('input-error') : null;
        }
    else if($(this).hasClass('password')){
        Sellyx.check.password($(this).val(), false) ? $(this).removeClass('input-error') : null;
        }
    else{
        $(this).val()!='' ? $(this).removeClass('input-error') : null;        
        }

    });
$(document).on('dblclick', '.select-group', function(){
    var option = $(this).find('option:selected');
    var other = $(this).parent('div').find('.select-group').not($(this));

    if(other.length == 0){
        other = $(this).parents('.form-horizontal').find('.select-group').not($(this));
        }

    if(option.length==1){
        other.append('<option value="'+option.val()+'">' + option.text() + '</option>');
        $(this).find('option:selected').remove();
        }
        
    // var my_options = other.find('option');
    // my_options.sort(function(a,b) {
    //     if (a.text > b.text) return 1;
    //     else if (a.text < b.text) return -1;
    //     else return 0
    //     })
    // other.children().remove().end().append( my_options );
    });
$(document).on('keydown', '.data-number', function(event){
    numbersOnly(event);
    });
$(document).on('keydown', '.data-decimal', function(event){
    decimalOnly(event);
    });
$(document).on('focusout', '.email', function(){
    !checkEmail($(this).val(), true) ? $(this).addClass('input-error') : null;
    });
$(document).on('focusout', '.password', function(){
    !checkPassword($(this).val(), false) ? $(this).addClass('input-error') : null;
    });
$(document).on('keyup', '.character-count', function(event){
    var length = $(this).val().length;
    $(this).parent().siblings().find('.character-counter').text($(this).attr('maxlength') - length);
    });
$(document).on('keyup', '.enter', function(event){
    if(event.keyCode == 13){
        $(this).parents('.enter-container').find('.enter-target').trigger('click');
        }
    });
$(document).on('change', '.other-value', function(){
    var parent = $(this).parent();
    if($(this).val() == 0){
        parent.append('<input class="validate form-control" placeholder="Enter custom value here"></input>');
        }
    else{
        parent.find('input') ? parent.find('input').remove() : null;
        }
    });
$(document).on('click', '.refresh-button', function(){
    if($(this).parents('.tab-pane.active').length > 0){
        var table = $(this).parents('.tab-pane.active').find('.dataTable:last').attr('id');
        }
    else{
        var table = $(this).parents('.manager-container').find('.dataTable:last').attr('id');
        }

    $('#'+table).DataTable().ajax.reload();
    });
$(document).on('click', '.login-submit-button', function(){
    var button = $(this);

    if(GetURLParameter('route') && GetURLParameter('route').split('/')[0] == 'corporate'){
        var message = 'Logging in Employee...';
        var r = 'corporate';
        }
    else{
        var message = 'Logging in User...'
        var r = 'regular';
        }

    if(validate($('#loginDiv'), true)){
        $.ajax({
            url: 'index.php?route=common/login/login',
            type: 'post',
            data: serializeAllData($('#loginDiv')) + '&tz=' + jstz.determine().name(),
            cache: false,
            beforeSend: function(){
                $.blockUI({ message: message });
                }
            })
        .done(function(returnData){
            try{
                var data = JSON.parse(returnData);
                if(data.success){
                    if(r == 'corporate'){
                        window.location.assign('index.php?route=corporate/home');
                        }
                    else if(button.attr('relocate')){
                        window.location.assign("index.php?route=manager/home");
                        }
                    else{
                        if($(document).data('login_event')){
                            sendTo(GetURLParameter('route'), $(document).data('login_event'), []);
                            }
                        else{
                            window.location.reload();
                            }

                        }
                    }
                else{
                    alertify.error(data.failure);
                    $.unblockUI();
                    }
                }
            catch(err){
                alertify.alert('There was an error in submitting the data. Please try again later.');
                $.unblockUI();
                }
            })
        .fail(function(returnData){
            $.unblockUI();
            });
        }
    })
$(document).on('ready', function(){
    if(!isTouch()){
        $('.s-tooltip').tooltip();
        }
        
    // $('.header-ss').selectpicker({style: 'header-ss', menuStyle: 'dropdown-menu-bs'});


    $(document).on('click', 'a', function(){
        $(this).blur();
        });

    $(document).on('click', '.panel-heading', function(){
        $(this).siblings('.panel-body').slideToggle();
        var i = $(this).find('.fa');
        i.hasClass('fa-caret-down') ? i.removeClass('fa-caret-down').addClass('fa-caret-up') : i.addClass('fa-caret-down').removeClass('fa-caret-up');
        }); 

    $(document).on('click', '.sellyx-left' , function(){
        var panel = $(this).parent('.sellyx-panel').width();
        var target = $(this).siblings('.sellyx-subpanel-scroll-a');
        var left = target.scrollLeft();
        target.animate({scrollLeft: left - panel}, 400);
        });
    $(document).on('click', '.sellyx-right' , function(){
        var panel = $(this).parent('.sellyx-panel').width();
        var target = $(this).siblings('.sellyx-subpanel-scroll-a');
        var right = target.scrollLeft();
        target.animate({scrollLeft: right + panel}, 400);
        });

    var isOverflown = function(e){
        e = e.get(0);
        return e.scrollWidth>e.clientWidth;
        }

    var triggerHandles = function(){
        if(isTouch()){
            $('.sellyx-right, .sellyx-left').hide();
            $('.sellyx-subpanel-scroll-a').css('overflow-x','auto');
            }
        else{
            $(document).find($('.sellyx-subpanel-scroll-a')).each(function(){
                var sib = $(this).siblings('.sellyx-right, .sellyx-left');
                if(isOverflown($(this))){
                    sib.show();
                    }
                else{
                    sib.hide();
                    }
                })
            }
        }

    triggerHandles();

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        if($(document).find('.dataTable').length > 0){
            var table = $.fn.dataTable.fnTables(true);
                if ( table.length > 0 ) {
                $(table).dataTable().fnAdjustColumnSizing();
                }
            } 
        })
    $('.modal').on('show.bs.modal', function() {
        $(this).find('.nav-tabs a:first').tab('show');
        });

    $(document)
        .on('mouseover', '.btn, .small-btn', function(){
            if(!isTouch()){
                $(this).addClass('button-hover');
                }
            })
        .on('mouseleave', '.btn, .small-btn', function(){
            if(!isTouch()){
                $(this).removeClass('button-hover');
                }
            });

    var tab = GetURLParameter('tab');
    tab ? $('.nav-tabs.main a:eq('+ tab +')').tab('show') : $('.nav-tabs.main a:first').tab('show');
    
    $(window).on('resize', function (){
        triggerHandles();
        });
    });
$(document).on('click', '.common-btn', function(event){
    event.preventDefault();
    var $this = $(this);
    if($this.attr('loc')){
        location.assign($this.attr('loc'));
        }
    });
$(document).on('click', '.help-button', function(){
    alertify.alert('<div style="display:block;padding: 0px 10px 0px 10px;font-size:20px;font-weight:bold;">Oops!</div><div style="block;padding:10px;"><p>We are currently setting up a comprehensive help tool. <b>It will be available for use in Beta 2.</b> In the meantime, please send us a message at Technical Support by clicking the button next to this one, or by sending us an email at <a style="font-weight:bold;" href="mailto:support@sellyx.com">support@sellyx.com</a>.</p><p>Thanks!</p></div>');
    });