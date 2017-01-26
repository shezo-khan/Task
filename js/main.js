
jQuery(document).ready(function($){

	var $L = 1200,
		$left_navigation = $('.main-navigation__menu'),
		$cart_button = $('.shopping-cart'),
		$left_menu_icon = $('.main-navigation__hamburger'),
		$cart_menu = $('.cart-nav'),
		$shadow_layer = $('#cd-shadow-layer');

	//open Main menu on mobile
	$left_menu_icon.on('click', function(event){
		event.preventDefault();
		//close cart panel (if it's open)
		$cart_menu.removeClass('speed-in');
		toggle_panel_visibility($left_navigation, $shadow_layer, $('body'));
	});

	//open cart
	$cart_button.on('click', function(event){
		event.preventDefault();
		//close lateral menu (if it's open)
		$left_navigation.removeClass('speed-in');
		toggle_panel_visibility($cart_menu, $shadow_layer, $('body'));
	});

	//close  cart or  menu by clicking shadow layer
	$shadow_layer.on('click', function(){
		$shadow_layer.removeClass('is-visible');
		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $cart_menu.hasClass('speed-in') ) {
			$cart_menu.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$left_navigation.removeClass('speed-in');
		} else {
			$left_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$cart_menu.removeClass('speed-in');
		}
	});

	//move #main-navigation inside header on laptop
	//insert #main-navigation after header on mobile
	move_navigation( $left_navigation, $L);

	$(window).on('resize', function(){
		move_navigation( $left_navigation, $L);
		
		if( $(window).width() >= $L && $left_navigation.hasClass('speed-in')) {
			$left_navigation.removeClass('speed-in');
			$shadow_layer.removeClass('is-visible');
			$('body').removeClass('overflow-hidden');
		}

	});
});

function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
	if( $lateral_panel.hasClass('speed-in') ) {
		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		$lateral_panel.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$body.removeClass('overflow-hidden');
		});
		$background_layer.removeClass('is-visible');

	} else {
		$lateral_panel.addClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$body.addClass('overflow-hidden');
		});
		$background_layer.addClass('is-visible');
	}
}

function move_navigation( $navigation, $MQ) {
	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}
}