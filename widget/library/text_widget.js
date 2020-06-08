var USER_LOCATION;

// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

// Listen to messages from parent window
window.onload = function(){
	bindEvent(window, 'message', function (e) {
		if(e.data=='open'){
			document.getElementById("hl_text-widget--btn").click();
		}
	});
}



var PROVISION = {
	init: function(extras) {
		document.addEventListener("DOMContentLoaded", function(){

			
				console.log('Initializing Widget');
				var widget = new TextWidget();
			
				
				if(extras){
					Object.keys(extras).forEach(function(key){
						widget.CONFIG[key] = extras[key];
					});
				}

				console.log(widget.CONFIG);
				widget.load();
		});
	},

	refresh: function(locationId, extras){
		var widget = new TextWidget();
		if(extras){
			Object.keys(extras).forEach(function(key){
				widget.CONFIG[key] = extras[key];
			});
		}
		widget.CONFIG["location_id"] = locationId;

		console.log(widget.CONFIG);
		widget.load();
	}
}






/******************************************************************************************/
/******************************************************************************************/
/******************************************
/******************************************    TextWidget()
/******************************************
/******************************************************************************************/
function TextWidget(){
	this.USER_LOCATION = null;
	this.TEMPLATES = new Templates();
	this.LOADER = new ResourceLoader();
	this.AUTO_OPEN = false;

	this.CONFIG = {
		header_line_1:      "Hello!",
		header_line_2:      "We are online",
		welcome_message:    "Please enter your information and we'll send you a text!",
		bubble_message: 	"Hi there, have a question? Text us here.",
		bubble_image: 	  	false,
		bubble_text_color:  "000000",
		bubble_background:  "ffffff",
		image_style: 		"picture",
		image_url:        	"https://msg.everypages.com/resources/profile.jpg",
		svg:                false,
		locations:			[],
		color_scheme:       "188bf6",
		timezone:           "America/New_York",
		here_prefix:        "WebChatHere",
		away_prefix:        "WebChatAway",
		bubble_on_mobile:   true,
		status_prefix:      "false",
		phone_number:       "(800) 555-1212",
		default_message:    "We received your message.",
		here_message:       "<p>Someone will reach you shortly</p>",
		away_message:       "<p>Someone will text you when we get back</p>"
	};    

	this.FILES = {
		js: [
			{name: "jQuery", source: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"},
			{name: "spacetime", source: "https://unpkg.com/spacetime"},
			{name: "CryptoJS", source: "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"},
			{name: "libphonenumber", source: "https://unpkg.com/libphonenumber-js/bundle/libphonenumber-js.min.js"}
		],

		resources: [
			'<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">',
			'<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
			'<meta name="HandheldFriendly" content="true">',
			'<link href="./text_widget.css" rel="stylesheet" type="text/css" />',
			'<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />',
			'<script src="https://unpkg.com/libphonenumber-js/bundle/libphonenumber-js.min.js"></script>',
			'<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>'
		]
	}


	this.load = async function(){
		await this.LOADER.libraries(this.FILES.js);
		await this.LOADER.metas(this.FILES.resources);
		this.setTimezone();
		await this.getUserLocation();
		await this.displayWidget();
	}


	this.setTimezone = function(){
		this.spacetime = spacetime();
		if(typeof this.CONFIG.timezone!='undefined') this.spacetime = this.spacetime.goto(this.CONFIG.timezone);
		console.log(`Current Time: ${this.spacetime.time()} | Store is ${(this.isStoreOpen() ? "open" : "closed")}`);
	}


	this.displayWidget = function(){

		var html =  this.TEMPLATES.init(this.CONFIG);
		
		
		$("body").append(html);
		$(".hl-widget-header").hide();
		
		this.bindListener();
		console.log('Rendering Chat Widget');

		if(this.AUTO_OPEN) $("#hl_text-widget--btn").click();
		if(typeof this.CONFIG.color_scheme!='undefined'){
			$(".hl_text-widget--btn,.chat_header, .hl_text-widget--cover").css("background", "#"+this.CONFIG.color_scheme);
			
			$("head").append(`
				<style>
					.override-svg, .override-header:hover .storename { color: #${this.CONFIG.color_scheme} !important;}
					.form__field:focus { border-bottom: 2px solid #${this.CONFIG.color_scheme} !important; }	
				</style>`);

			$(".hl_location--search svg").addClass("override-svg");
			$(".hl_location").addClass("override-header");





			var _self = this;
			$(".form__field").keyup(function(){
				var keyword = $(this).val();

				var isExist = false;
				_self.CONFIG.locations.forEach(function(location){
					if(location.name.indexOf(keyword)!=-1 || location.address.indexOf(keyword)!=-1 || location.zipcode.indexOf(keyword)!=-1){
						$(`[data-id='${location.id}']`).show();
						isExist = true;
					} else $(`[data-id='${location.id}']`).hide();
				});

				if(isExist) $(`.hl_location--no-results`).hide();
				else $(`.hl_location--no-results`).show();

				if(keyword.trim()=="") $(`[data-id='${location.id}']`).show();
			});

			
		}

		
	}

	this.initiateLocation = function(){
		var attr = {
			is_store_open: this.CONFIG.isStoreOpen,
			location_id:   this.CONFIG.location_id
		}


		this.CONFIG.features.forEach(function(feature){
			if(feature.type=="chat") 		new Chat(feature, attr).render();
			if(feature.type=="custom-link") 	new CustomLink(feature).render();
			if(feature.type=="call") 		new Call(feature).render();
			if(feature.type=="review")		new Review(feature).render();
		});


		
	}


	this.bindListener = function(){
		this.textareaAutogrow();
		this.promptBubble();
		this.widgetListener();
		this.locationSearchListener();
	}


	this.locationSearchListener = function(){
		var _self = this;
		$(".hl_location").each(function(){
			$(this).click(function(){
				$(".location-container").hide();
				$(".hl-widget-header,.feature-container").show();


				var id = $(this).data("id");
				var config = _self.getLocationData(id);
				
				if(!!config){
					$(".replies, .hl_text-widget--prompt").html("");
					$('.hl_selected-location').find(".storename").html(config.name);
					$(".hl_selected-location").find(".address").html(`${config.address} ${config.zipcode}`);

					
					// BOOKMARK
					var attr = {
						is_store_open: false,
						location_id:   id
					}
			
					console.log(_self.CONFIG);
					config.features.forEach(function(feature){
						if(feature.type.replace(" ", "-").toLowerCase()=="chat") 			new Chat(feature.params, attr).render();
						if(feature.type.replace(" ", "-").toLowerCase()=="custom-link") 	new CustomLink(feature.params).render();
						if(feature.type.replace(" ", "-").toLowerCase()=="call") 			new Call(feature.params).render();
						if(feature.type.replace(" ", "-").toLowerCase()=="review")			new Review(feature.params).render();
					});
				}
			});
		});

		$(".go-back").click(function(){
			$(".location-container").show();
			$(".hl-widget-header,.feature-container").hide();
			$(".replies, .hl_text-widget--prompt").html("");
		});
	}

	this.widgetListener = function(){
		var _self = this;

		$("#hl_text-widget--btn, .Prompt__MessageBubble").on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			
			$(".Prompt__MessageBubble").remove();
			_self.toggleWidget();
			
		});
	}

	this.getLocationData = function(id){

		var isExist = false;
		var loc = null;
		this.CONFIG.locations.forEach(function(location){
			if(location.id==id){
				isExist = true;
				loc = location;
			}
		});

		if(isExist) return loc;
		else return;

	}


	this.toggleWidget = function(){

		if($(".widget-open-icon").hasClass("active")){
			window.parent.postMessage({
					'button': 'open',
					'message': 'Message text from iframe.'
			}, "*");
		}else{
			window.parent.postMessage({
					'button': 'close',
					'message': 'Message text from iframe.'
			}, "*");
		}


		$("#hl_text-widget--btn").toggleClass('active');
		$("#hl_text-widget--btn").find('.widget-open-icon').toggleClass('active');
		$("#hl_text-widget--btn").find('.widget-close-icon').toggleClass('active');
				
		

		if($(".widget-open-icon").hasClass("active")){
			$('.hl_text-widget--box').removeClass("active").hide();
			$('.chat_header').addClass("hide");
			$('.header_img').addClass("hide");
		}else{
			$(".location-container").addClass("active").show();
			$('.chat_header').removeClass("hide").hide();
			$('.header_img').removeClass("hide").hide();
		}

		
	}


	this.sendMessageToParent = function(message){
		window.parent.postMessage(message, "*");
	}

	this.promptBubble = function(){
		$('.Prompt__close').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$('.Prompt__MessageBubble').remove();
			window.parent.postMessage({
				'button': 'bubble',
				'message': 'Close bubble'
			}, "*");
		});
	}


	this.textareaAutogrow = function(){
		$("textarea").keypress(function(){
			var scroll_height = $(this).get(0).scrollHeight;
			$(this).css('height', scroll_height + 'px');
		});
	}


	this.getUserLocation = function(){
		fetch('https://extreme-ip-lookup.com/json/')
			.then( res => res.json())
			.then(response => {
					console.log("Country: ", response.countryCode);
					USER_LOCATION = response.countryCode;
				})
				.catch((data, status) => {
					console.log('Request failed');
		});
	}


	this.isStoreOpen = function(){
		var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		var day = days[this.spacetime.day()-1];
		var isOpen = false;
		var workHour = this.CONFIG.work_hour;

		if(workHour!=null && workHour!=false){
			if(typeof workHour[day]!='undefined'){
				var schedule = workHour[day];
				if(schedule.enable_state=="true"){
				var date = `${this.spacetime.year()}-${pad(this.spacetime.month()+1, 2)}-${pad(this.spacetime.date(), 2)}`;
			
				var start = `${date}T${(schedule.start_hour=="" ? "00:00": schedule.start_hour)}:00`;
				var end = `${date}T${(schedule.end_hour=="" ? "23:00": schedule.end_hour)}:00`;
			
				var s = spacetime(start);
				var e = spacetime(end);
				console.log(`Schedule: ${s.time()}-${e.time()}`);
				isOpen =(parseInt(`${this.spacetime.hour()}${this.spacetime.minute()}`)>=parseInt(`${s.hour()}${s.minute()}`) && parseInt(`${this.spacetime.hour()}${this.spacetime.minute()}`)<=parseInt(`${e.hour()}${e.minute()}`)? true : false);
				
			
				}
			}
		}
		
		this.CONFIG.isStoreOpen = isOpen;

		return isOpen;
	}
}




/******************************************************************************************/
/******************************************************************************************/
/******************************************
/******************************************    TYPE: custom-link
/******************************************
/******************************************************************************************/
function CustomLink(config){
	this.CONFIG = config;
	this.TEMPLATES = new Templates();
	this.render = function(){
		var _self = this;
		var buttonText 	= this.CONFIG.button_text; 
		var featureButton = $(this.TEMPLATES.featureButton( buttonText ));
		featureButton.click(function(){
			window.open(_self.CONFIG.link, "_blank");
		});

		$(".hl_text-widget--prompt").append( featureButton );
	}
}



/******************************************************************************************/
/******************************************************************************************/
/******************************************
/******************************************    TYPE: call
/******************************************
/******************************************************************************************/
function Call(config){
	this.CONFIG = config;
	this.TEMPLATES = new Templates();
	this.render = function(){
		var _self = this;
		var buttonText 	= `<a href='tel:${_self.CONFIG.phone_number}' target='_blank'>${this.CONFIG.button_text}</a>`; 
		var featureButton = $(this.TEMPLATES.featureButton( buttonText ));

		$(".hl_text-widget--prompt").append( featureButton );
		
	}
}



/******************************************************************************************/
/******************************************************************************************/
/******************************************
/******************************************    TYPE: chat
/******************************************
/******************************************************************************************/
function Chat(config, attr){
	this.ATTR = attr;
	this.CONFIG = config;
	this.TEMPLATES = new Templates();
	this.PHONE_VALIDATED = false;

	this.render = function(){
		var _self = this;
		var buttonText 	= this.CONFIG.button_text; 
		var featureButton = $(this.TEMPLATES.featureButton( buttonText ));
		featureButton.addClass("chatFeature");
		featureButton.click(function(){_self.show(this, _self)});

		$(".hl_text-widget--prompt").append( featureButton );
	}
}


Chat.prototype.show = function(elem, _self){
	var userResponseText = _self.CONFIG.button_text;
	var initialMessage 	= _self.CONFIG.responses.initial;

	$(".replies").html("");
	$(".replies").append(`
		${ _self.TEMPLATES.userResponse( userResponseText ) }
		${ _self.TEMPLATES.initialMessage( initialMessage ) }
		${ _self.TEMPLATES.contactForm() }
	`);

	_self.submitListener();
	_self.formValidation();

	$("#name").focus();
	$(".hl_text-widget--form").animate({ scrollTop: $(".hl_text-widget--form").height()+$("#message-form").height() }, 1000);


}


Chat.prototype.submitListener = function(){
	var _self = this;

	$("#hl_text-widget--send-btn, #message-form").unbind();
	$('#hl_text-widget--send-btn').on('click', function(e) { 
		$('#send').click();
	});

	$("#message-form").on("submit", function(e){
		
		e.preventDefault();
		e.stopPropagation();


		var name = $("#name").val();
		var phone = libphonenumber.format(libphonenumber.parse($('#phone').val(), USER_LOCATION), 'E.164');
		var message = $('#message').val();
		$(".feature-container").css("cursor", "wait");
		$("#hl_text-widget--send-btn").html("Sending...").attr("disabled", true);
        console.log(_self.CONFIG["responses"]);
		var message_prefix = _self.CONFIG["responses"].prefix.away;
		if(_self.ATTR.is_store_open) message_prefix = _self.CONFIG["responses"].prefix.here;
		message_prefix = (_self.CONFIG["responses"].prefix.status ? `${message_prefix}: ${message}` : message);

		// console.log(_self.CONFIG.endpoint+'/message');
		// url: `${_self.CONFIG.endpoint}/message`,
		$.ajax({
			type: "POST",
			url: 'https://api.gohighlevel.com/message',
			data: JSON.stringify({
				name: name,
				phone: phone,
				message: message_prefix,
				location_id: _self.ATTR["location_id"]
			}),
			contentType: "application/json",
			success: function(){
				$(".feature-container").css("cursor", "pointer");
				$(".hl_text-widget--form button").show();
				$("#message").val("");

				var responseMessage = "";
				if(_self.ATTR.is_store_open){
					responseMessage = _self.CONFIG["responses"].confirmation.here;
				}else if(_self.CONFIG["responses"].confirmation.away!=false){
					responseMessage = _self.CONFIG["responses"].confirmation.away;
				}

				$(".small-text").hide();
				$("#hl_text-widget--send-btn").parent().hide();
				$("#message-form").hide();

				var data = {
					name: name,
					phone_number: _self.CONFIG.phone_number,
					message: message,
					default_message: _self.CONFIG.responses.confirmation.default,
					responseMessage: responseMessage
				};
				
				$(".replies").append( _self.TEMPLATES.successMessage(data) );
				
				$("#hl_text-widget--send-btn").html("Send").attr("disabled", false);

			},
			error: function(xhr, textStatus, errorThrown){
				$(".feature-container").css("cursor", "pointer");
				$("hl_text-widget--form button").show();
				$(".replies").append( _self.TEMPLATES.errorMessage() );
				$("#hl_text-widget--send-btn").html("Send").attr("disabled", false);

			}
		})
	});
}


Chat.prototype.formValidation = function(){
	var _self = this;

	$('#phone').keyup(function(e){
		
		var phoneValid = libphonenumber.isValidNumber(libphonenumber.parse($('#phone').val(), USER_LOCATION));
		
		
		if (!phoneValid) {
			_self.PHONE_VALIDATED = false;
			document.getElementById("phone").setCustomValidity("Please provide valid phone number");
		} else {
			_self.PHONE_VALIDATED = true;
			document.getElementById("phone").setCustomValidity("");
		}

		if($('#phone').val() && _self.PHONE_VALIDATED){
			if($(this).parent().find('.TextInput__Checkmark').length){
			} else{
					$('.group_phone').append('<span class="TextInput__Checkmark TextInput__Checkmark--show"><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px;float:right;margin-top:-23px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></span>');
					}
			}
			else{
				$(this).parent().find('.TextInput__Checkmark').remove();
			}      
	});

	
	$('#phone').on('keyup paste', function(e) {
		$(e.target).val(
			libphonenumber.formatNumber(
				{
					country: USER_LOCATION,
					phone: $(e.target).val()
				},
				'National'
			)
		);
	});

	$('input, textarea').focus(function() {
		id = $(this).attr('id');
		$(`label[for='${id}']`).addClass('filledout');
		$(`label[for='${id}']`).addClass('focus-color');
		$(this).parent().find(".TextInput__Bar").addClass('paint');
	});

	$('input, textarea').blur(function() {
		if(!$(this).val()){
			$('label[for='+$(this).attr('id')+']').removeClass('filledout');
		}

		
		$('label[for='+$(this).attr('id')).removeClass('focus-color');
		$(this).parent().find(".TextInput__Bar").removeClass('paint');
	});


	$('#name').on('input', function(){  
		if($('#name').val()){
			if($(this).parent().find('.TextInput__Checkmark').length){} 
			else $('.group_name').append('<span class="TextInput__Checkmark TextInput__Checkmark--show"><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px;float:right;margin-top:-23px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></span>');
				
		}else{
			$(this).parent().find('.TextInput__Checkmark').remove();
		}
	});

		
	$('#message').on('input', function(){  
		if($('#message').val()){
			if($(this).parent().find('.TextInput__Checkmark').length){} 
			else $('.group_message').append('<span class="TextInput__Checkmark TextInput__Checkmark--show"><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px;float:right;margin-top:-23px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></span>');
				
		}else{
			$(this).parent().find('.TextInput__Checkmark').remove();
		}
	});
}



/******************************************************************************************/
/******************************************************************************************/
/******************************************
/******************************************    TYPE: custom-link
/******************************************
/******************************************************************************************/
function Review(config){
	this.CONFIG = config;
	this.TEMPLATES = new Templates();

	this.render = function(){
		var _self = this;
		var buttonText 	= this.CONFIG.button_text; 
		var featureButton = $(this.TEMPLATES.featureButton( buttonText ));
		featureButton.addClass("reviewFeature");
		featureButton.click(function(){_self.show(this, _self)});
		$(".hl_text-widget--prompt").append( featureButton );
	}
}



Review.prototype.show = function(elem, _self){
	var userResponseText = _self.CONFIG.button_text;
	var initialMessage 	= `<span class='information'>${_self.CONFIG.responses.initial}</span>
						<br><br>
						${ _self.TEMPLATES.reviewUpandDown() }
				
	`;

	$(".replies").html("");
	$(".replies").append(`
		${ _self.TEMPLATES.userResponse( userResponseText ) }
		${ _self.TEMPLATES.initialMessage( initialMessage ) }
	`);

	_self.reviewReaction();
	_self.submitListener();
	_self.formValidation();

	$("#name").focus();
		

}

Review.prototype.reviewReaction = function(){
	var _self = this;

	$(".positive").click(function(){
		$("#review-form").remove();
		$("#review-link").remove();

		var rawHtml = '';
		_self.CONFIG.links.forEach(function(link){
			if(link.link.indexOf("~")!=-1) link.link = link.link.replace('~', '#');
			rawHtml += _self.TEMPLATES.reviewLinks(link.thumbnail, link.name, link.link);
		});

		$(".replies").append(`<div id='review-link'>${rawHtml}</div>`);
		$(".hl_text-widget--form").animate({ scrollTop: $(".hl_text-widget--form").height()+$(".reviews").height() }, 1000);

	});


	$(".negative").click(function(){
		$("#review-form").remove();
		$("#review-link").remove();
		$(".replies").append(`${ _self.TEMPLATES.reviewForm() }`);
		var color = $(".chat_header").css("background-color");
		$("#hl_text-widget--send-btn, .review-close").css("background-color", color);
		if(color.indexOf("rgb")!=-1) color = color.substr(0, color.length-1) +", 0.75)";
		if(color.indexOf("#")!=-1) color = color+"94";
		console.log(color);
		$("#review-form").css("background-color", color);
		$(".hl_text-widget--form").animate({ scrollTop: $(".hl_text-widget--form").height()+$("#review-form").height() }, 1000);

		$(".review-close").click(function(){
			$("#review-form").hide('slow', function(){
				$(this).remove();
			});
		});
	});

	
}



function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

Review.prototype.submitListener = function(){
	var _self = this;

	$("#hl_text-widget--send-btn, #message-form").unbind();
	$('#hl_text-widget--send-btn').on('click', function(e) { 
		$('#send').click();
	});

	$("#message-form").on("submit", function(e){
		
		e.preventDefault();
		e.stopPropagation();


		var name = $("#name").val();
		var phone = libphonenumber.format(libphonenumber.parse($('#phone').val(), USER_LOCATION), 'E.164');
		var message = $('#message').val();

		var message_prefix = _self.CONFIG["responses"].prefix.away;
		if(_self.ATTR.is_store_open) message_prefix = _self.CONFIG["responses"].prefix.here;
		message_prefix = (_self.CONFIG["responses"].prefix.status ? `${message_prefix}: ${message}` : message);

		$.ajax({
			type: "POST",
			url: `${_self.CONFIG.endpoint}/message`,
			data: JSON.stringify({
				name: name,
				phone: phone,
				message: message_prefix,
				location_id: _self.ATTR["location_id"]
			}),
			contentType: "application/json",
			success: function(){
				$(".feature-container").css("cursor", "pointer");
				$(".hl_text-widget--form button").show();
				$("#message").val("");

				var responseMessage = "";
				if(_self.ATTR.is_store_open){
					responseMessage = _self.CONFIG["responses"].confirmation.here;
				}else if(_self.CONFIG["responses"].confirmation.away!=false){
					responseMessage = _self.CONFIG["responses"].confirmation.away;
				}

				$(".small-text").hide();
				$("#hl_text-widget--send-btn").parent().hide();
				$("#message-form").hide();

				var data = {
					name: name,
					phone_number: _self.CONFIG.phone_number,
					message: message,
					default_message: _self.CONFIG.responses.confirmation.default,
					responseMessage: responseMessage
				};
				
				$(".replies").append( _self.TEMPLATES.successMessage(data) );


			},
			error: function(xhr, textStatus, errorThrown){
				$(".feature-container").css("cursor", "pointer");
				$("hl_text-widget--form button").show();
				$(".replies").append( _self.TEMPLATES.errorMessage() );

			}
		})
	});
}


Review.prototype.formValidation = function(){
	var _self = this;

	$('#phone').keyup(function(e){
		
		var phoneValid = libphonenumber.isValidNumber(libphonenumber.parse($('#phone').val(), USER_LOCATION));
		
		
		if (!phoneValid) {
			_self.PHONE_VALIDATED = false;
			document.getElementById("phone").setCustomValidity("Please provide valid phone number");
		} else {
			_self.PHONE_VALIDATED = true;
			document.getElementById("phone").setCustomValidity("");
		}

		if($('#phone').val() && _self.PHONE_VALIDATED){
			if($(this).parent().find('.TextInput__Checkmark').length){
			} else{
					$('.group_phone').append('<span class="TextInput__Checkmark TextInput__Checkmark--show"><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px;float:right;margin-top:-23px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></span>');
					}
			}
			else{
				$(this).parent().find('.TextInput__Checkmark').remove();
			}      
	});

	
	$('#phone').on('keyup paste', function(e) {
		$(e.target).val(
			libphonenumber.formatNumber(
				{
					country: USER_LOCATION,
					phone: $(e.target).val()
				},
				'National'
			)
		);
	});

	$('input, textarea').focus(function() {
		id = $(this).attr('id');
		$(`label[for='${id}']`).addClass('filledout');
		$(`label[for='${id}']`).addClass('focus-color');
		$(this).parent().find(".TextInput__Bar").addClass('paint');
	});

	$('input, textarea').blur(function() {
		if(!$(this).val()){
			$('label[for='+$(this).attr('id')+']').removeClass('filledout');
		}

		
		$('label[for='+$(this).attr('id')).removeClass('focus-color');
		$(this).parent().find(".TextInput__Bar").removeClass('paint');
	});


	$('#name').on('input', function(){  
		if($('#name').val()){
			if($(this).parent().find('.TextInput__Checkmark').length){} 
			else $('.group_name').append('<span class="TextInput__Checkmark TextInput__Checkmark--show"><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px;float:right;margin-top:-23px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></span>');
				
		}else{
			$(this).parent().find('.TextInput__Checkmark').remove();
		}
	});

		
	$('#message').on('input', function(){  
		if($('#message').val()){
			if($(this).parent().find('.TextInput__Checkmark').length){} 
			else $('.group_message').append('<span class="TextInput__Checkmark TextInput__Checkmark--show"><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px;float:right;margin-top:-23px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></span>');
				
		}else{
			$(this).parent().find('.TextInput__Checkmark').remove();
		}
	});
}


/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
/******************************************************************************************/
function Templates(){

	this.fields = {
		name:  `<div class="form-group group_name">
					<label for="name" class="">Name</label>
					<input type="text" class="form-control" tabindex="1"  id="name" required value="">
					<div class="TextInput__Bar"></div>
				</div>`,

		phone: `<div class="form-group group_phone" id="phone-group">
					<label for="phone">Mobile Phone</label>
					<input type="text" class="form-control" tabindex="2" id="phone" required value="" >
					<div class="TextInput__Bar"></div>
				</div>`,

		textarea:	`<div class="form-group group_message">
						<label  for="message">Message</label>
						<textarea class="form-control" tabindex="3" id="message" style="height:30px; overflow:hidden" required></textarea>
						<div class="TextInput__Bar"></div>
					</div>`
	}	

	


	this.init = function(config){
		console.log(config);
		return `
			
			<div id='hl_text-widget' class='hl_text-widget'>
				${ this.bubble(config.bubble_message, config.image_url, config.bubble_image, config.bubble_background, config.bubble_text_color, config.bubble_on_mobile) }
				
				${ this.profilePicture(config.image_style, config.image_url) }
				${ this.header(config.image_style, config.header_line_1, config.header_line_2) }

				${ this.locationSelector(config) }
				${ this.chatwidget(config) }
			</div>


			<button class='hl_text-widget--btn fade-in-1' id='hl_text-widget--btn'>
				${ this.widgetButton(config.svg) }
				${ this.closeButton() }
			</button>`;
	}

	this.locationSelector = function(config){
		
		var location = ``;
		config.locations.forEach(function(loc){
			location += `
				<div class="hl_location" data-id="${loc.id}">
					<div class='storename'>${loc.name}</div>
					<div class='address'>${loc.address} ${loc.zipcode}</div>
				</div>
			`
		});

		return `
		<div class="hl_text-widget--box location-container" id="hl_text-widget--box" style="display: none;">
			<div class="hl_text-widget--box-inner" id="hl_text-widget--location">
				<div class="hl_text-widget--cover">
					<div class='header'>Select Location</div>
					<div class='sub-header'>Search for the location you want to contact by entering a ZIP Code or address</div>
				
					<div class="hl_text-widget--location-search">

					
						<div class="hl_location--search">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
							<input type="input" autocomplete="off" class="form__field" placeholder="ZIP Code or Address" name="name" id='name' required />
						</div>

						<div class="hl_location--results">
							${ location }

							<div class='hl_location--no-results'>No result</div>
						</div>
					</div>
				</div>
				
			</div>

			${ this.poweredby(config.powered_by) }
		</div>
		
		`;
	}

	this.chatwidget = function(config){
		return `
		<div class="hl_text-widget--box feature-container" id="hl_text-widget--box" style="display: none;">
			<div class="hl_text-widget--box-inner">
				<div class="hl_text-widget--form">
					${ this.initialPrompt(config.welcome_message) }
					<div class="replies"></div>
				</div>
			</div>

			${ this.poweredby(config.powered_by) }
		</div>
		`;
	}


	this.initialPrompt = function(message){
		return	`
				<div class="hl_selected-location">
					<div class='go-back'>
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
						Back
					</div>
					<div class="storename">Peterson's Harley-Davidson of ...</div>
					<div class="address">19400 NW 2nd Ave, Miami, FL 33169</div>
				</div>
				<div class="hl_text-widget--heading fade-in-1">
					
					<div>${message}</div>
					
				</div>
				<div class="hl_text-widget--prompt fade-in-1"></div>`;
	}
	


	this.poweredby = function(sponsor){
		return (sponsor!=null ? `<div class='powered-by'>Powered by ${sponsor}</div>` : `<div class='powered-by'>Powered by<a href='http://www.gohighlevel.com/?utm_source=text-widget&amp;utm_medium=poweredby&amp;utm_campaign=poweredby' target='_blank'> Highlevel</a></div>`) 
	}


	this.profilePicture = function(style, image){
		
		return (style =="picture" ? `<div class="hl-widget-header header_img hide"><img src="${image}"/></div>` : '');
	}


	this.bubble = 	function(bubbleMessage, image, bubbleImage, backgroundColor, textColor, isMobile){
		console.log(bubbleMessage);
		console.log(image);
		console.log(bubbleImage);
		console.log(backgroundColor);
		console.log(textColor);
		console.log(isMobile);
		
		var profile = image;
		if(bubbleImage!=false && bubbleImage!='false' && bubbleImage!=undefined && bubbleImage!=null) profile = bubbleImage;
		 
		var addClass="";
		if(typeof isMobile!='undefined'){
		    
		    if(isMobile==false) addClass = "mobile-disable";
		}

		return 	`<style id="wizardAfter">
					.Prompt__MessageBubble,
					.Prompt__MessageBubble::after {
						background: #${backgroundColor};
					}

					.bubble-message{ color: #${textColor}}
				</style>
				<div class="Prompt__MessageBubble fade-in-3 ${addClass}">
					<div class="Prompt__close">close</div>
					<div class="Prompt__AvatarCustom Prompt__AvatarCustom--BRight" style="background-image: url(&quot;${profile}&quot;);"></div>
					<div class="Prompt__PromptText">
						<div class="TextInput__Bar"></div>
					</div>
					<div class='bubble-message'>${ bubbleMessage }</div>
				</div>`;
	}

	this.errorMessage = function(){
		return	`<div class="hl_text-widget--heading fade-in-1 error-message">
					<div>
						There was some issue. Please enter correct name, phone and message before you hit send.
					</div>
				</div>`
	}

	this.userResponse = function(message){
		return 	`<div class="SubmittedMessage SubmittedMessage--visible fade-in-1" style="background-color: rgba(76, 118, 224, 0.12);">
					<div>${ message }</div>
				</div>`
	}


	this.initialMessage = function(message){
		return	`<div class="hl_text-widget--heading fade-in-2">
					<div>${message}</div>
				</div>`;
	}


	this.successMessage = function(data){
		return	`<div class="SubmittedMessage SubmittedMessage--visible fade-in-2" style="background-color: rgba(76, 118, 224, 0.12);">
					<div class="SubmittedMessage__Title">${  data.name }</div>
					<div>${ data.message }</div>
				</div>
				
				<div class="SubmittedMessage__SendStatus fade-in-2"><p>Received</p></div>

				<div class="ConfirmationMessage fade-in-3">
					<div class="ConfirmationMessage__PhoneNumber">${ data.phone_number }</div>
					<div class="ConfirmationMessage__Message fade-in-3">
						<div class="ConfirmationMessage__Title">${ data.default_message }</div>
						<div class="ConfirmationMessage__Subtitle">${ data.responseMessage }</div>
						<div class="ConfirmationMessage__Check" style=""><svg class="checkmark" viewBox="0 0 52 52" style="width: 18px; height: 18px; border-radius: 50%; display: block; stroke-width: 4; stroke: white; stroke-miterlimit: 10; box-shadow: rgb(0, 189, 148) 0px 0px 0px inset; animation: 0.5s ease-in-out 0.3s 1 normal forwards running fill, 0.3s ease-in-out 0.65s 1 normal forwards running scale, 0.5s ease-in-out 0.5s 1 normal forwards running box-shadow;"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" style="stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 4; stroke-miterlimit: 10; stroke: rgb(0, 189, 148); fill: none; animation: 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0s 1 normal forwards running stroke;"></circle><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style="transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s 1 normal forwards running stroke;"></path></svg></div>
					</div>
				</div>
				`;
	}

	this.responsePlain = function(message){
		return	`<div class="hl_text-widget--heading fade-in-1">
					<div>${message}</div>
				</div>`;
	}
	

	this.widgetButton = function(icon){
		if(icon==false || icon=="false") icon = `<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 199.83 181.57" enable-background="new 0 0 199.83 181.57" xml:space="preserve" style="width:60%; height:auto;"><g><path fill="#fff" d="M182.21,35.37h-25.77V18.17c0-9.49-7.74-17.2-17.21-17.2H18.85c-9.48,0-17.2,7.71-17.2,17.2v77.38 c0,9.49,7.72,17.2,17.2,17.2v34.4l45.87-34.4h74.51c9.46,0,17.21-7.71,17.21-17.2V52.56h25.77v77.41h-17.18v17.18l-22.94-17.18    H70.14l-18.31,13.92c2.83,2.04,6.28,3.26,10.01,3.26h74.53l45.84,34.4v-34.4c9.49,0,17.21-7.69,17.21-17.18V52.56    C199.42,43.07,191.7,35.37,182.21,35.37z M58.98,95.55l-22.92,17.2v-17.2H18.85V18.17h120.38v77.38H58.98z"></path><path fill="#fff" d="M36.06,52.56h77.37c4.76,0,8.59-3.83,8.59-8.59c0-4.75-3.83-8.6-8.59-8.6H36.06c-4.77,0-8.6,3.85-8.6,8.6 C27.46,48.73,31.29,52.56,36.06,52.56z"></path><path fill="#fff" d="M96.25,69.78c0-4.77-3.87-8.61-8.6-8.61H36.06c-4.77,0-8.6,3.85-8.6,8.61c0,4.72,3.83,8.59,8.6,8.59h51.59    C92.38,78.37,96.25,74.5,96.25,69.78z"></path></g></svg>`
		else icon = `<img src='${icon}' style='height: 79%; width: 79%'>`;

		return 	`<div class="icon widget-open-icon active">${ icon }</div>`;
	}


	this.featureButton = function(text){
		return	`<div class='hl_text-widget--feature'>${text}</div>`;
	}

	this.contactForm = function(){
		return	`<form class="fade-in-2" id="message-form">
					<div class="form-group group_name">
						<label for="name" class="">Name</label>
						<input type="text" class="form-control" tabindex="1"  id="name" required value="" >
						<div class="TextInput__Bar"></div>
					</div>
					
					<div class="form-group group_phone" id="phone-group">
						<label for="phone">Mobile Phone</label>
						<input type="text" class="form-control" tabindex="2" id="phone" required value="" >
						<div class="TextInput__Bar"></div>
					</div>


					<div class="form-group group_message">
						<label  for="message">Message</label>
						<textarea class="form-control" tabindex="3" id="message" style="height:30px; overflow:hidden" required></textarea>
						<div class="TextInput__Bar"></div>
					</div>
					
					<button type="submit" class="btn btn-primary" id="send">Send</button>
		
				</form>
				<div class="text-center">
					<button type="button" class="btn btn-primary" id="hl_text-widget--send-btn">Send</button>
				</div>

				<p class="small-text">By submitting you agree to receive text messages at the number provided. Message/data rates apply.</p>`;
	}

	this.reviewUpandDown = function(){
		return	`<div class="review-reaction">
					<div class="review-thumbs positive">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" class="svg-inline--fa fa-thumbs-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path></svg>
						<span>I had a good experience</span>
					</div>

					<div class="review-thumbs negative">
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" class="svg-inline--fa fa-thumbs-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z"></path></svg>
						<span>I had a bad experience</span>
					</div>
		
				</div>`;
	}


	this.reviewLinks = function(image, page, link){
		return	`<div class="reviews fade-3"><a href="${ link }" class="review-links" target="_blank">
					<img class="thumbnail" src="${ image }">
					<span>${ page }</span>
				</a></div>`;
	}


	this.reviewForm = function(){
		return	`<form id="review-form" >
					<div class='review-close'>x</div>
					<div class="title">How can we improve?</div>


					<div class="form-group group_message">
						<span>Tell us your story</span>
						<textarea class="form-control" tabindex="3" id="message" placeholder="Please help us improve" style="overflow:hidden" required></textarea>
						
					</div>


					<div class="form-group group_name">
						<span>Name</span>
						<input type="text" class="form-control" tabindex="1"  id="name" required value="">
						
					</div>
					
					<div class="form-group group_phone" id="phone-group">
						<span>Phone Number</span>
						<input type="text" class="form-control" tabindex="2" id="phone" required value="" >
						<div class="TextInput__Bar"></div>
					</div>


					
					
					<button type="submit" class="btn btn-primary" id="send">Send Review</button>
					
					<div class="text-center">
						<button type="button" class="btn btn-primary" id="hl_text-widget--send-btn">Send</button>
					</div>

					<p class="small-text">By submitting you agree to receive text messages at the number provided. Message/data rates apply.</p>
				</form>
				`;

	}


	this.closeButton = function(){
		return 	`<div class="icon widget-close-icon">
					<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="24" height="24" viewBox="0 0 23.8 23.9">
						<defs>
						<style>
							.cls-1 {
							fill: #fff;
							fill-rule: evenodd;
							}
						</style>
						</defs>
						<path d="M13.3 11.9L23.5 22.2C23.9 22.6 23.9 23.2 23.5 23.6 23.3 23.8 23.1 23.9 22.8 23.9 22.6 23.9 22.3 23.8 22.1 23.6L11.9 13.4 1.7 23.6C1.5 23.8 1.2 23.9 1 23.9 0.7 23.9 0.5 23.8 0.3 23.6 -0.1 23.2-0.1 22.6 0.3 22.2L10.5 11.9 0.3 1.7C-0.1 1.3-0.1 0.7 0.3 0.3 0.7-0.1 1.3-0.1 1.7 0.3L11.9 10.5 22.1 0.3C22.5-0.1 23.1-0.1 23.5 0.3 23.9 0.7 23.9 1.3 23.5 1.7L13.3 11.9Z" class="cls-1"></path>
					</svg>
				</div>`;
	}

	this.header = function(style, header_1, header_2){
		var icon = '';
		if(style=="icon") icon = `<div class="chat_icon"><svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 199.83 181.57" enable-background="new 0 0 199.83 181.57" xml:space="preserve" ><g><path fill="#fff" d="M182.21,35.37h-25.77V18.17c0-9.49-7.74-17.2-17.21-17.2H18.85c-9.48,0-17.2,7.71-17.2,17.2v77.38 c0,9.49,7.72,17.2,17.2,17.2v34.4l45.87-34.4h74.51c9.46,0,17.21-7.71,17.21-17.2V52.56h25.77v77.41h-17.18v17.18l-22.94-17.18    H70.14l-18.31,13.92c2.83,2.04,6.28,3.26,10.01,3.26h74.53l45.84,34.4v-34.4c9.49,0,17.21-7.69,17.21-17.18V52.56    C199.42,43.07,191.7,35.37,182.21,35.37z M58.98,95.55l-22.92,17.2v-17.2H18.85V18.17h120.38v77.38H58.98z"/><path fill="#fff" d="M36.06,52.56h77.37c4.76,0,8.59-3.83,8.59-8.59c0-4.75-3.83-8.6-8.59-8.6H36.06c-4.77,0-8.6,3.85-8.6,8.6 C27.46,48.73,31.29,52.56,36.06,52.56z"/><path fill="#fff" d="M96.25,69.78c0-4.77-3.87-8.61-8.6-8.61H36.06c-4.77,0-8.6,3.85-8.6,8.61c0,4.72,3.83,8.59,8.6,8.59h51.59    C92.38,78.37,96.25,74.5,96.25,69.78z"/></g></svg></div>`;
		icon += `<span class="header_line_1">${header_1}</span><br><span class="header_line_2">${header_2}</span>`;

		return 	`<div class="hl-widget-header chat_header hide">
				<div class="chat_option">${icon}</div>
				</div>`;
	}
}




function ResourceLoader(){
	this.libraries = async function(files){
		return new Promise((resolve, reject)=>{
			var i=0;
			var _self = this;
			files.forEach(async function(file){
				await _self.jsLoader(file.name, file.source);
				i++;

				if(i==files.length) resolve();
			});
		});

		
	}

	this.jsLoader = function(name, source){
		return new Promise((resolve, reject)=>{

			var src = document.createElement("script");
			src.src = source;
			src.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(src);

			console.log(`Loading Library: ${name}`);
			
			var checker = setInterval(()=>{
				if(typeof window[name]!='undefined'){
					clearInterval(checker);
					resolve();
				}
			}, 100);
		});
	}

	this.metas = function(list){
		return new Promise((resolve, reject)=>{
			list.forEach(function(list){ $("head").append(list); });

			var checker = setInterval(()=>{
				if(typeof window.libphonenumber!='undefined'){
				clearInterval(checker);
				console.log("Resources Loaded");
				resolve();
				}
			}, 100);
		});
	}
} 