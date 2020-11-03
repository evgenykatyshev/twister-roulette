$(document).ready(function() {

  var lang;

  var setLang = function() {
    var pathname = window.location.pathname;
    var pathnameArr = pathname.split('/');
    urlLang = pathnameArr[1];
    //alert('from URL: '+lang);
    if(jQuery.inArray(urlLang, languages) == -1) {
      cookieLang = $.cookie('lang'); // Get language from cookies
      if(jQuery.inArray(cookieLang, languages) == -1) {
        if(window.navigator) {
          var navigatorLang = window.navigator.language;
          navigatorLang = navigatorLang.substr(0, 2).toLowerCase();
          if(jQuery.inArray(navigatorLang, languages) == -1)
            lang = 'en'; // Default language
          else {
            lang = navigatorLang;
            $.cookie('lang', lang, { path: '/' });
          }
        }        
      }
      else {
        lang = cookieLang;
        $.cookie('lang', lang, { path: '/' });
      }
    }
    else {
      lang = urlLang;
      $.cookie('lang', lang, { path: '/' });
    }
    //alert('final lang: '+lang);
  }

  var colors = {
    'libm': ['210', '220', '120', '012'],
    'circle': ['e20', 'fc0', '6c3', '26c']
  };

  setLang();

  //alert(lang);

  $('.button_lang span').text(lang);

  var title = strings['title2'][lang];
  var tip = strings['tip'][lang];

  $('title').html(title);
  $('#title').html(title);
  $('#tip').text(tip);
  $('#old').attr('href', '//old.twister-roulette.com/'+lang);
  $('#old').text(strings['old version'][lang]);
  var authorArr = strings['author'][lang].split(' ');
  $('#author').html('<span class="desktop-part">© </span><a href="//evgenykatyshev.ru/projects/twister-roulette/" class="link link_light"><span class="desktop-part">' + authorArr[0] + ' </span>' + authorArr[1] + '</a>');

  var colorNames = [
    strings['red'][lang],
    strings['yellow'][lang],
    strings['green'][lang],
    strings['blue'][lang]
  ];

  var limbsNames = [
    strings['rightHand'][lang],
    strings['leftHand'][lang],
    strings['rightFoot'][lang],
    strings['leftFoot'][lang]
  ];

  var limbDiv = $('#limb');
  var circleDiv = $('#circle');
  var colorNameDiv = $('#color-name');
  var favicon = $('link[rel="icon"]');
  var lang = $('#lang span');

  var timerInterval;
  var time = 20;
  var time_period = 20;

  var time_decrement;
  var time_increment;

  function timer() {
    if(time == 1) {
      time = time_period;
      spin();
    }
    else {
      time--;
      $('#time').html(time);
    }
  }

  var spin = function() {
    var color = Math.ceil(4 * Math.random()) - 1;
    var limb = Math.ceil(4 * Math.random()) - 1;
    limbDiv.html(limbsNames[limb]);
    circleDiv.css('background', '#'+colors['circle'][color]);
    lang.css('background', '#'+colors['circle'][color]);
    colorNameDiv.html(colorNames[color]);
    favicon.attr('href', '../img/favicon-'+color+'.png');
    time = time_period;
    $('#time').html(time_period);
    return false;	
  }

  var adaptation = function() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    var likely = $('.likely');
    if(windowWidth <= 600)
      likely.addClass('likely-small');
    else
      likely.removeClass('likely-small');
  }

  spin();	
  adaptation();

  $('#main').on('click tap taphold', function() {
    spin();
    //$('#title').hide();
    $('#tip').hide();
    $('#lang-list').hide();
  });
  $(document).keyup(spin);

  $(window).on('load resize', adaptation);

  // Buttons

  $('.button_settings').on('click tap taphold', function() {
    $('#settings').removeClass('hidden');
    return false;
  });

  $('.button_close').on('click tap taphold', function() {
    $('#settings').addClass('hidden');
    return false;
  });

  $('.button_sound').on('click tap taphold', function() {
    $('.button_sound > .button__icon_on').toggle();
    $('.button_sound > .button__icon_off').toggle();
    return false;
  });

  $('.button_play').on('click tap taphold', function() {
    $('#title').hide();
    $('#tip').hide();
    $('.button_play').hide();
    $('.button_stop').show();
    $('#timer').removeClass('hidden');
    spin();
    timerInterval = setInterval(timer, 1000);
    return false;
  });

  $('.button_stop').on('click tap taphold', function() {
    $('.button_stop').hide();
    $('.button_play').show();
    $('#timer').addClass('hidden');
    clearInterval(timerInterval);
    return false;
  });

  $('.button_minus.enable').on('click tap taphold', function() {
    $('#time_period').show();
    switch(time_period) {
      case 5:
        time_decrement = 0;
        time_period = 5;
        break;
      case 10:
        time_decrement = 5;
        time_period = 5;
        $('.button_minus').removeClass('enable');
        $('.button_minus').addClass('disable');			
        break;
      case 15:
        time_decrement = 5;
        time_period = 10;
        break;
      case 20:
        time_decrement = 5;
        time_period = 15;
        break;
      case 30:
        time_decrement = 10;
        time_period = 20;
        break;
      case 45:
        time_decrement = 15;
        time_period = 30;
        $('.button_plus').removeClass('disable');
        $('.button_plus').addClass('enable');
        break;
    }
    if(time - time_decrement < 1)
      spin();
    else
      time = time - time_decrement;
    $('#time').html(time);
    $('#time_period').html(time_period);
    $('#time_period').delay(500).hide('slow');
    return false;
  });

  $('.button_plus.enable').on('click tap taphold', function() {
    $('#time_period').show();
    switch(time_period) {
      case 5:
        time_increment = 5;
        time_period = 10;
        $('.button_minus').removeClass('disable');
        $('.button_minus').addClass('enable');
        break;
      case 10:
        time_increment = 5;
        time_period = 15;				
        break;
      case 15:
        time_increment = 5;
        time_period = 20;
        break;
      case 20:
        time_increment = 10;
        time_period = 30;
        break;
      case 30:
        time_increment = 15;
        time_period = 45;
        $('.button_plus').removeClass('enable');
        $('.button_plus').addClass('disable');
        break;
      case 45:
        time_increment = 0;
        time_period = 45;
        break;
    }
    time = time + time_increment;
    $('#time_period').html(time_period);
    $('#time').html(time);
    $('#time_period').delay(500).hide('slow');
    return false;
  });

  $('.button_lang').on('click tap taphold', function() {
    $('#lang-list').show();
  });

  /*$('.lang').on('click tap taphold', function() {
    $('#lang-list').hide();
  });*/

});	