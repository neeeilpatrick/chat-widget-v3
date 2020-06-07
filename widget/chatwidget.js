var domain = "http://127.0.0.1:5500/widget/";
// var domain = "http://127.0.0.1:8001/";
var trigger_class = ".mktchat";

var head = document.getElementsByTagName('head')[0];
css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('type', 'text/css');
css.setAttribute('href', `${domain}/chatwidget.css`);
head.appendChild(css);

//add viewport if not exist already
// https://stackoverflow.com/questions/7711411/how-to-insert-metatag-without-using-jquery-append
var viewport = document.querySelector('meta[name=viewport]');
var viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';

if (viewport === null) {
  // var head = document.getElementsByTagName('head')[0];
  viewport = document.createElement('meta');
  viewport.setAttribute('name', 'viewport');
  head.appendChild(viewport);
}

var readCookie = function() {
    return document.cookie;
};

viewport.setAttribute('content', viewportContent);
var iframe = null;
function injectJS(){
    console.log("Injecting Widget");
    // create iframe element
    iframe = document.createElement('iframe');
    iframe.setAttribute('id','mtkchat');
    iframe.setAttribute('allowfullscreen','');
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('scrolling','no');

    // var html = 'test';
    // script & stylesheets wll be hosted on a remote server 
    // only in the same dir for testing purposes at the moment. 
    // must have a full url to resolve correctly. 
    var cookies = readCookie();
    var hideBubble = false;

    cookies.split(";").forEach((cookie)=>{
        if(cookie.indexOf("bubble-close")!=-1) hideBubble = true;
    });

    if(hideBubble){
        iframe.setAttribute('style','width: 350px; height: 90px !important;');
        iframe.setAttribute('class','iframe no-bubble');
    }else{
        iframe.setAttribute('style','width: 350px; height: 250px; !important');
        iframe.setAttribute('class','iframe mobile');
    }

    config.settings.bubble = hideBubble;
    console.log(config.settings);
    Object.keys(config.settings).forEach(function(keyword){
        if(keyword=="color_scheme" || keyword=="bubble_background" || keyword=="bubble_text_color"){
            config.settings[keyword] = config.settings[keyword].replace("#", "");
        }
    });




    config.settings.features.forEach(function(feature, i){
            if(feature.type=="review"){
                feature.links.forEach(function(link, o){
                    if(link.link.indexOf("#")!=-1){
                        link = link.link.replace("#", "~");
                        config.settings.features[i].links[o].link = link
                    }
                    
                });
                
                
                console.log(config.settings.features[i].links);
            }
    });
    
    console.log(config.settings);
    console.log(JSON.stringify(config.settings));
    
    var html = `
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <link rel="stylesheet" type="text/css" href="${domain}/library/text_widget.css">
                <script src="${domain}/library/text_widget.js" widget-token="${config.token}"><\/script>
                <script>PROVISION.init('${config.location_id}', ${JSON.stringify(config.settings)});<\/script>
            <\/head>
        <body></body>`;
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    document.body.appendChild(iframe);
    
    

}


var start = Date.now();
var interval = 9;


// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener){
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}


window.onload = function(){
	trigger_class = (config.trigger_class) ? config.trigger_class : trigger_class;
    document.querySelectorAll(trigger_class).forEach(function(button){
        button.onclick = function(){
            var toolkit = new ToolkitChat();
            toolkit.open();
        }
    });

}
class ToolkitChat{
    open(){
        var wn = document.getElementById("mtkchat");
       
        // Send random messge data on every button click
            wn.contentWindow.postMessage('open', '*');
    }
}

function main() {
    console.log("Running Body");
    var body = document.body;
    if (body) {
        injectJS();
    } else if (Date.now() - start > 10000) {
        return null;
    } else {
        setTimeout(function() {
        main();
            
        
        }, interval);
        interval *= 2;
    }
}

main();

// listen for messages from iframe
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    // Check sender origin to be trusted
    // if (event.origin !== "http://example.com") return;
    // we don't need to check origin. Not security threat to open and close chat window.

    var data = event.data;
    if (data.button=='open')
    {   
        iframe.setAttribute('style','width: 350px; height: 100vh !important;');
        iframe.setAttribute('class','iframe open');
    	document.body.classList.remove('chatclosed');
    	document.body.classList.add('chatopen');
        
    	// document.body.classList.add('chatclosed');
    } else if (data.button=='close')
    {

        iframe.setAttribute('style','width: 90px !important; height: 90px !important; ');
        iframe.setAttribute('class','iframe closed');
    	document.body.classList.remove('chatopen');
    	document.body.classList.add('chatclosed');
    }

    if(data.action=="save-cookie"){
        createCookie(data.name, data.value);
        iframe.contentWindow.postMessage({
            action: "read-cookie",
            cookie: readCookie()
        }, "*")
    }

    if(data.button=="bubble"){
        createCookie("bubble-close", "true", 1);
    }
}

var createCookie = function(name, value, days) {
    console.log("Saving Cookies");
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		var expires = '; expires=' + date.toGMTString();
	} else var expires = '';
	document.cookie = name + '=' + value + expires + '; path=/';
};
