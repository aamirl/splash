

function navResponsive() {
    
    if (screenWidth > 991) {
        
        $(".main-nav .navbar-nav > .dropdown > a").attr("data-toggle", "");
        $(".main-nav .navbar-nav.nav-search > .dropdown > a").attr("data-toggle", "dropdown");
        $('.main-nav .navbar-nav > .dropdown').removeClass('open');
        $('.main-nav .navbar-nav .dropdown-submenu').removeClass('open');
        $('.main-nav .navbar-nav > li').find(':focus').blur();
        if ( $('.main-nav .navbar-collapse').hasClass('in') ) {
            $('.main-nav .navbar-collapse').removeClass('in');
        }
        if($('.navbar-toggle').hasClass('active')){
            $('.navbar-toggle').removeClass('active');
        }
        
    }
    else if  (screenWidth <= 991)  {
        
        $(".main-nav .navbar-nav > .dropdown > a").attr("data-toggle", "dropdown");
        $('.main-nav .nav > li .dropdown-menu').removeAttr('style');
        $('.main-nav .nav > li > .dropdown-menu').removeAttr('style');
        
    }
}


/* ------------------------------------------------
    Navigation's Click, Hover and Keyup Events
--------------------------------------------------- */


function navEvents() {
    
    /*---- Dropdown Menu Events ----*/
    
    $('.main-nav .navbar-nav > .dropdown > .dropdown-menu').click(function(event) {
        if(screenWidth <= 991) {
            event.stopPropagation();
        }
    });

    $( ".main-nav .navbar-nav>.dropdown>.dropdown-menu>.dropdown-submenu" ).click(function(event) {
        if(screenWidth < 991) {
            $this = $(this);
            $this.siblings(".dropdown-submenu").removeClass("open").end(); 
            $this.parents(".dropdown-submenu").addClass('open');
            $this.toggleClass('open');
            event.stopPropagation();
        }
    });

    $('.main-nav .navbar-nav > .dropdown > a').click(function(event) {
        $('.main-nav .navbar-nav .dropdown-submenu').removeClass('open');
    });	

    $('.navbar-toggle').click(function(event){
        $(this).toggleClass('active')
    })

    $('.main-nav .nav > li .dropdown-submenu > a').click(function(event) {
        if(screenWidth > 991) {
            event.stopPropagation();
        }
    });
    
    $('.main-nav .nav > li').hover(function() {
        var dropdownList = $(this).find("> .dropdown-menu");

        if (screenWidth > 991) {
            
            /*---- Dropdown Animation on Hover ----*/
    
            dropdownList.addClass('animated fadeIn');        
            window.setTimeout( function(){
                dropdownList.removeClass('animated fadeIn');
            }, 500);        

            /*---- Positioning Dropdown Menu ----*/
            
            if(!dropdownList.hasClass('megamenu')){
                var childDropdownList = $(this).find(".dropdown-submenu .dropdown-menu"),
                dropdownOffset = $(this).offset(),
                offsetLeft = dropdownOffset.left,
                dropdownWidth = dropdownList.width(),
                childWidth = childDropdownList.width(),
                docWidth = $(window).width(),
                aWidth = $(this).children("a").outerWidth(),
                shiftWidth = Math.abs(dropdownWidth - aWidth),
                childShiftWidth = dropdownWidth + childWidth - 1,
                isDropdownVisible = (offsetLeft + dropdownWidth <= docWidth),
                isChildDropdownVisible = (offsetLeft + dropdownWidth + childWidth <= docWidth);
                if (!isDropdownVisible) {
                    dropdownList.css('margin-left','-'+shiftWidth+'px')
                    childDropdownList.css('margin-left','-'+childShiftWidth+'px')
                } else if (!isChildDropdownVisible) {
                    childDropdownList.css('margin-left','-'+childShiftWidth+'px')
                }
                else {
                    dropdownList.removeAttr('style')
                    childDropdownList.removeAttr('style')
                }
            }
            
            /*---- Positioning Mega Menu ----*/
            
            else if(dropdownList.hasClass('megamenu')){
                var dropdownOffset = $(this).offset(),
                linkWidth = $(this).width(),
                dropdownListOffset = dropdownList.offset(),
                offsetLeft = dropdownOffset.left,
                dropdownListoffsetLeft = dropdownListOffset.left,
                dropdownWidth = dropdownList.width(),
                docWidth = $(window).width(),
                shiftOffset = (($('.navigation').hasClass('transparent')) ? 30 : 30),
                positionedValue = Math.abs(offsetLeft),
                shiftWidth = Math.abs(positionedValue + dropdownWidth + shiftOffset),
                isDropdownVisible = (shiftWidth <= docWidth);
                if (!isDropdownVisible) {
                    calculateOffset = docWidth - dropdownWidth - shiftOffset;
                    dropdownList.css('left',+calculateOffset+'px');
                }
                else {
                    dropdownList.css('left',+positionedValue+'px');
                }
            }
        }
    });
	
    /*---- Full-screen Menu Events ----*/
            
    $('.full-screen-menu-trigger').click(function(event) {
        event.preventDefault();
        $('.full-screen-header').fadeToggle();
        $(this).toggleClass('active');
        $('html, body').toggleClass('full-screen-header-active');
    });

    /*---- Side Menu Events ----*/
            
    $('.side-menu-trigger').click(function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('body').toggleClass('in');
        $('.side-header').toggleClass('active');
    });

    $(document).mouseup(function (e){
        var container = $(".main-nav");
        if (!container.is(e.target)&& container.has(e.target).length === 0 && $('.side-header').hasClass('active')) {
            $('.side-menu-trigger').removeClass('active');
            $('.side-header').removeClass('active');
            $('body').removeClass('in');
        }
    });
	
	$('.side-header-close').click(function(event){
        event.preventDefault();
        if ($('.side-header').hasClass('active')) {
            $('.side-menu-trigger').removeClass('active');
            $('.side-header').removeClass('active');
            $('body').removeClass('in');
        }
    });
	

    /*---- Sub-menu Events ----*/
            
    $( ".menu-dropdown-link" ).click(function(event) {
        $(this)
            .parent(".with-dropdown")
            .siblings(".with-dropdown")
            .children(".menu-dropdown.collapse")
            .removeClass("in")
            .end(); 
        $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").toggleClass('in');
        event.stopPropagation();
    });
	
    $('li.with-dropdown a.menu-dropdown-link').click(function () {
        var dh = $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").outerHeight();
        if(!$(this).hasClass('active-dropdown')) {
            $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").css('height',dh+'px');
        }
        else {
            $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").attr('style','');
        }
        $('.active-dropdown').not($(this)).removeClass('active-dropdown');
        $(this).toggleClass('active-dropdown');
    });

    /*---- Search Box Events ----*/
            
    $('.search-box-trigger').click(function(event) {
        if($(window).width() < 992) {
            if($('.navbar-collapse').hasClass('in')){
                $('.navbar-collapse').removeClass('in');
            }
        }
        event.preventDefault();
        $('.full-screen-search').fadeToggle();
        $(this).toggleClass('active');
    });

    $(".search-field").keyup(function (e) {
        if (e.keyCode == 13) {
            $('#searchForm').submit();
        }
    });
	
}


if(document.getElementsByClassName('corner-navigation') || document.getElementsByClassName('.padded-fixed-footer')){
    window.addEventListener('scroll', function(e){
        if ($(window).scrollTop() > 50){
            $('.corner-navigation, .padded-fixed-footer').addClass('fill-in');
        }
        else{
            $('.corner-navigation, .padded-fixed-footer').removeClass('fill-in');
        }
    });
}


/* ------------------------------------------------
    Init Countdown
--------------------------------------------------- */


function countDown() {
    if(document.getElementById('countdown')){
        $('#countdown').countdown('2016/03/01', function(event) {
        $(this).html(event.strftime('<i>Launching in %w weeks and %d days</i>'));
      });
    }
}


/* ------------------------------------------------
    Sticky Navigation
--------------------------------------------------- */


/*---- Sticky Nav's Global Variables ----*/

var headerHeight = 0,
    headerVisiblePos = 0,
	headerFixedPos = 0,
	isHeaderFixed = false,
	isHeaderVisible = false;

function stickyMenu(){
    if($('.main-nav').hasClass('sticky')){
        window.addEventListener('scroll', function(e){
            var screenTop = $(window).scrollTop();
            if (screenTop > 0 ) {
                $('.main-nav').addClass('shrink');
                $('.logo img').attr('src','../dist/img/logo_dark.png')
            }
            if (screenTop <= 0 ) {
                $('.main-nav').removeClass('shrink');
                $('.logo img').attr('src','../dist/img/logo.png')
            }
        });
		var screenTop = $(window).scrollTop();
		if (screenTop > 0 ) {
			$('.main-nav').addClass('shrink');
		}
    }
}


/* ------------------------------------------------
    One Page Navigation
--------------------------------------------------- */


function navOnePage() {
    if( $('body').hasClass('one-page')){	
        var offset = 0,
			delay =0;
        var $sections = $('.one-page-section');
        if($('.main-nav').hasClass('sticky')){
            offset = 60;
        }
		if($('body').find('.owl-carousel.one-page-section')){
            delay = 800;
        }
		else {
			delay = 100;
		}
		window.setTimeout(function() {
			sectionOffset();
		}, delay);
		function sectionOffset(){
            var currentScroll = $(this).scrollTop() + offset;
            var $currentSection = null;
            $sections.each(function(){
                var divPosition = $(this).offset().top;
                var divHeight = $(this).outerHeight();
                var total = divPosition + divHeight;
                if($(window).scrollTop() + screenHeight >= $(document).height() - offset) {
                    $currentSection = $sections.last();
                }
                else if( divPosition - 1 < currentScroll ){
                    $currentSection = $(this);
                }
            });
            var id = $currentSection.attr('id');
            $('.main-nav .nav > li').removeClass('active');
            $("[href=#"+id+"]").parent('li').addClass('active');
        }
		var timer;  
        $(window).scroll(function(){
            if(timer){
                sectionOffset();
            }
            else {
                timer = window.setTimeout(function() {
                    sectionOffset();
                }, 100);
            }
        });
        var scrollActive = '';
        $('.main-nav .nav li a[href*=#]:not([href=#])').click(function(event) {
            if(scrollActive == true) {
                event.preventDefault();	
            }
            else {
                var offset = 59;
                scrollActive = true;
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - offset
                        }, 1000, "easeInQuart" , function() {
                            scrollActive = false;
                        });
                        return false;
                    }
                }
            }
        });
    }
}


/* ------------------------------------------------

    Footer Reveal

--------------------------------------------------- */


function fixedFooter() {
    var footerHeight = $('.uncover-footer').outerHeight();
    $('.footer-reveal').css('height',footerHeight + 'px');
}


/* ------------------------------------------------

    Vertically Centred Elements

--------------------------------------------------- */


function verticallyCentered(){
    if(document.getElementsByClassName("vertical-centred-element")){
        $('.vertical-centred-element').each(function(){
            var $this = $(this),
                height = 0,
                width = 0,
                margin = 0;
            if($this.hasClass('flipped-vertical')){
                width = $this.outerWidth();
                margin = width/2;
                $this.css('margin-top',margin+'px');
            }
        });
    }
}


/* ------------------------------------------------

    Fixed Social Icons

--------------------------------------------------- */


function fixedSocialIcons () {
    var containerH = $('.social-fixed').outerHeight();
    var marginTop = containerH / 2;	
    $('.social-fixed').css('margin-top','-'+ marginTop + 'px');
}



function themeImageSection () {
    var fullScreenImage = document.getElementsByClassName("theme-background-section");
    if(document.getElementsByClassName("theme-background-section")){
        var windowH = window.innerHeight;
        $('.theme-background-section').each(function(){ 
            $selection =  $(this);
            if($selection.hasClass('custom-height')) {
                var customHeight = $selection.attr('data-custom-height');
                if (typeof customHeight !== typeof undefined && customHeight !== false && customHeight !== '') {
                    var decCustomHeight = customHeight/100;
                    windowH = windowH * decCustomHeight;
                }
            }
            else if($selection.hasClass('half-screen')){
                windowH = windowH/2;
            }
            else if($selection.hasClass('half-screen-width')){
                windowW = screenWidth/2;
                $selection.css('width', windowW + 'px');
            }
            else {
                var offsetContainer = $selection.attr('data-offset-container');
                if (typeof offsetContainer !== typeof undefined && offsetContainer !== false && offsetContainer !== '' && screenWidth > 767) {
                    var containerArray = offsetContainer.split(",");
                    var i, offsetHeight = 0, currentContainer;
                    for (i = 0; i < containerArray.length; i++) { 
                        currentContainer = String(containerArray[i]);
                        offsetHeight += $(currentContainer).outerHeight();
                    }
                    windowH = windowH - offsetHeight;
                }
            }
            if($selection.find('.content-container').outerHeight() > windowH) {
                $selection.css('height', 'auto');
                $selection.find('.fade-scroll').removeClass('fade-scroll');
            }
            else {
                $selection.css('height', windowH + 'px');
            }
            if($selection.closest(".owl-carousel").length ) {
                window.setTimeout(function(){
                    if($selection.find('.content-container').outerHeight() > windowH) {
                        $('.theme-background-section').css('height', 'auto');
                        $('.theme-background-section').find('.fade-scroll').removeClass('fade-scroll').addClass('no-fade-scroll');
                    }
                    else {
                        $('.theme-background-section').css('height', windowH + 'px');
                        $('.theme-background-section').find('.no-fade-scroll').removeClass('no-fade-scroll').addClass('fade-scroll');
                    }
                },300);
            }
            $(window).scroll(function(){
                $(".fade-scroll").css("opacity", 1 - $(window).scrollTop() / (windowH/2));
            });
        });
    }
}


/* ------------------------------------------------

    Sections Height

--------------------------------------------------- */


function sectionHeights(){
    if(document.getElementsByClassName('full-height')){
        $('.full-height').each(function(){
            $section  = $(this);
            if($section.hasClass('slider-item')){
                var offsetContainer = $section.closest('.owl-carousel').attr('data-offset-container');
                var dataOffsetHeight = $section.closest('.owl-carousel').attr('data-offset-height');
                if (typeof offsetContainer !== typeof undefined && offsetContainer !== false && offsetContainer !== '' && screenWidth > 767) {
                    var containerArray = offsetContainer.split(",");
                    var i, offsetHeight = 0, currentContainer;
                    for (i = 0; i < containerArray.length; i++) { 
                        currentContainer = String(containerArray[i]);
                        offsetHeight += $(currentContainer).outerHeight();
                    }
                    windowH = screenHeight - offsetHeight;
                    $section.css('height', windowH + 'px');
                }
                else if (typeof dataOffsetHeight !== typeof undefined && dataOffsetHeight !== false && dataOffsetHeight !== '' && screenWidth > 767) {
                    windowH = screenHeight - dataOffsetHeight;
                    $section.css('height', windowH + 'px');
                }
                else {
                     windowH = screenHeight;
                     $section.css('height', windowH + 'px');
                }   
            }
            else{
                var offsetContainer = $section.attr('data-offset-container');
                var dataOffsetHeight = $section.closest('.owl-carousel').attr('data-offset-height');
                if ($('.content-container').height() > screenHeight){
                    $section.css('height', 'auto');
                }
                else if (typeof offsetContainer !== typeof undefined && offsetContainer !== false && offsetContainer !== '' && screenWidth > 767) {
                    var containerArray = offsetContainer.split(",");
                    var i, offsetHeight = 0, currentContainer;
                    for (i = 0; i < containerArray.length; i++) { 
                        currentContainer = String(containerArray[i]);
                        offsetHeight += $(currentContainer).outerHeight();
                    }
                    windowH = screenHeight - offsetHeight;
                    $section.css('height', windowH + 'px');
                }
                else if (typeof dataOffsetHeight !== typeof undefined && dataOffsetHeight !== false && dataOffsetHeight !== '' && screenWidth > 767) {
                    windowH = screenHeight - dataOffsetHeight;
                    $section.css('height', windowH + 'px');
                }
                else if (screenWidth < 767){
                    $section.css('height', 'auto');
                }
                else {
                    $section.css('height', screenHeight + 'px');
                }
            }
        });
    }
}


/* ------------------------------------------------

    Initializing Plugins & Elements

--------------------------------------------------- */



/* ------------------------------------------------
    Init Isotope
--------------------------------------------------- */


function isotope() {
    if ( document.querySelector('body').offsetHeight > window.innerHeight ) {
        document.documentElement.style.overflowY = 'scroll';
    }
    var $container = $('.js-isotope');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    var $container2 = $('.filterArea');
    $container2.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    $('.filter a').click(function(){
        $('.filter .current').removeClass('current');
        $(this).addClass('current');
        var selector = $(this).attr('data-filter');
        $container2.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
}


/* ------------------------------------------------
    Init Progress Bars
--------------------------------------------------- */


function progressBarsOnView() {
    $('div.progress-bar').waypoint(function(){
        $(this).css('width', $(this).attr('aria-valuenow')+'%');
    }, {
        offset: '100%'
    });	
}


/* ------------------------------------------------
    Init Tooltips
--------------------------------------------------- */


function tooltip() {
    $(".tip-top").tooltip({
        placement : 'top',
        container : 'body'
    });
    $(".tip-right").tooltip({
        placement : 'right',
        container : 'body'
    });
    $(".tip-bottom").tooltip({
        placement : 'bottom',
        container : 'body'
    });
    $(".tip-left").tooltip({
        placement : 'left',
        container : 'body'
    });	
}





/* ------------------------------------------------

    Click Events

--------------------------------------------------- */


/* ------------------------------------------------
    # Links
--------------------------------------------------- */


$('a').click(function(e) {
    var link = $(this).attr('href');
    if(link == '#'){
        e.preventDefault();
    }
});


/* ------------------------------------------------
    Jump Links
--------------------------------------------------- */


$('a[href*=#]:not([href=#]).jump').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var jumpOffset = 0;
        if($(this).attr('data-jump-offset')){
            jumpOffset = $(this).attr('data-jump-offset');
        }
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - jumpOffset
            }, 1000, "easeInQuart");
            return false;
        }
    }
});




/* ------------------------------------------------
    Init Wow
--------------------------------------------------- */


function wowInit() {
    var wow = new WOW({
        //disabled for mobile
        mobile: false
    });
    wow.init();
}


/* ------------------------------------------------

    Function Calls

--------------------------------------------------- */


var $win = $(window);


/* ------------------------------------------------
    Window Resize Events
--------------------------------------------------- */
  
  
$win.on('resize', function() {
    
    /*---- Resetting Variables ----*/
	
    isStickyElementFixed = false;
    winScrollY = 0;
    stickyElementSetPoint = 0;
    stickyElementY = 0;
    screenWidth =  window.innerWidth;
    screenHeight =  window.innerHeight;
    winScrollY = 0;
    stickyElementTop = 0;
    stickyElementDisabled = false;
    headerVisiblePos = 0;
    headerFixedPos = 0;
    isHeaderFixed = false;
    isHeaderVisible = false;
    headerHeight = 0;

    navResponsive();

    navOnePage();

	stickyMenu();

    countDown();

    setTimeout(fixedFooter, 800)
	
    themeImageSection();

    sectionHeights();

    verticallyCentered();
	
}).resize();


/* ------------------------------------------------
    Window Load Events
--------------------------------------------------- */
  
  
$win.on('load', function() {
	
    navEvents();

    progressBarsOnView();

    wowInit();
    
    isotope();

    tooltip();

    fixedSocialIcons();

    // defaultMap();

    /*---- Hide Page Loader ----*/

    $(".loader").fadeOut("slow");
	
});