jQuery(document).ready(function($){$(document).scroll(function(){var y=$(this).scrollTop();if(y>280){$('.alertbar').fadeIn();}else{$('.alertbar').fadeOut();}});$(function(){setTimeout(function(){if(location.hash){window.scrollTo(0,0);target=location.hash.split('#');smoothScrollTo($('#'+target[1]));}},1);$('a[href*=\\#]:not([href=\\#])').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){smoothScrollTo($(this.hash));return false;}});function smoothScrollTo(target){target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top},1000);}}});var didScroll;var lastScrollTop=0;var delta=5;var navbarHeight=$('nav').outerHeight();$(window).scroll(function(event){didScroll=true;});setInterval(function(){if(didScroll){hasScrolled();didScroll=false;}},250);function hasScrolled(){var st=$(this).scrollTop();if(Math.abs(lastScrollTop-st)<=delta)
return;if(st>lastScrollTop&&st>navbarHeight){$('nav').removeClass('nav-down').addClass('nav-up');$('.nav-up').css('top',-$('nav').outerHeight()+'px');}else{if(st+$(window).height()<$(document).height()){$('nav').removeClass('nav-up').addClass('nav-down');$('.nav-up, .nav-down').css('top','0px');}}
lastScrollTop=st;}
$('.site-content').css('margin-top',$('header').outerHeight()+'px');$(document).on('click','.spoiler',function(){$(this).removeClass('spoiler');});});$("#alertbar-close").click(function(){$("#alertbar-disposable").remove();});/*!
* IE10 viewport hack for Surface/desktop Windows 8 bug
* Copyright 2014-2017 The Bootstrap Authors
* Copyright 2014-2017 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/(function(){'use strict'
if(navigator.userAgent.match(/IEMobile\/10\.0/)){var msViewportStyle=document.createElement('style')
msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'))
document.head.appendChild(msViewportStyle)}}())