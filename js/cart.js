
lscache.flush();

$(document).on("click", '.productlist__Itembutton', function()
{
	cartItemsAdded = $('.cart-nav__list').html();
	productName  = $(this).parents('li').attr('data-name');
	productPrice = $(this).parents('li').attr('data-price');
	productId    = $(this).parents('li').attr('data-id');

	productIdCounter = lscache.get( productId );

	if( productIdCounter == null )
	{
		productIdCounter = 0;	
		productIdCounter = productIdCounter + 1;
		newItem = '<li class="cart-nav__item" data-id="'+ productId +'"><span class="cd-qty cart-nav__item--quantity"></span> '+ productName +'<div class="cd-price cart-nav__price cart-nav__price--text-color">NOK '+ productPrice +'</div><div class="quantity"><label for="cd-product-2">Qty</label><span class="select"><select id="cd-product-2" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div><a href="#" class="cart-nav__remove cd-img-replace">Remove</a></li>';
		$('.cart-nav__list').html( newItem + cartItemsAdded );
		lscache.set( productId, productIdCounter );
	}
	else
	{
		productIdCounter = productIdCounter + 1;
		lscache.set( productId, productIdCounter );
		$('.cart-nav__list').html( cartItemsAdded );
		$('.cart-nav__list').find("li  [data-id=' " + productId + "']").find('span.cart-nav__item--quantity').html( productIdCounter + 'x' );
	}
	
	reTotal();
	swal(productName, "Added to Cart", "success");
	return;
	
	
});

$(document).on("click", '.cart-nav__remove', function()
{
	productId = $(this).parents('li').attr('data-id');
	swal({
	title: "Are you sure?",
	text: "The product will be deleted from cart",
	type: "warning",
	showCancelButton: true,
	confirmButtonColor: "#DD6B55",
	confirmButtonText: "Yes, delete it!",
	cancelButtonText: "No",
	closeOnConfirm: false,
	closeOnCancel: false
	},
	function(isConfirm){
	if (isConfirm) {
		console.log( productId );
		$('.cart-nav__list').find("li[data-id='"+ productId +"']").remove();
		lscache.set( productId, null );
		reTotal();
		swal("Deleted!", "Product is deleted from Cart", "success");
	} else {
		swal("Cancelled", "", "error");
		return;
	}
	});

});

$(document).on('change','.select',function(){
	var quant = $('.select option:selected').html();
	reTotal();
});

function reTotal()
{
	totalPrice = 0;
	$('.cart-nav__list').find('.cart-nav__item').each(function(index, element) 
	{
		 var countProduct = $('.select option:selected').html();
		 
		 price = $(this).find('.cart-nav__price').html();
		 price = price.replace(/[NOK,]+/g,"");
		 price = parseFloat( price ); 

		 priceOfProduct = price * countProduct;
		 totalPrice = totalPrice + priceOfProduct;
		 
    });
	$('.js_total_cart_amount').html( totalPrice );
	$('.js_total_no_products').html( $('.cart-nav__item').length  );
}
