/*
 * scrollpersist v1.1.0
 * 
 * https://github.com/simon-thorpe/scrollpersist/
 * 
 * Include this script on any page that requires persistant scrolling when the user returns to it:
 * <script src="scrollpersist.js" data-auto="1000"></script>
 * 
 * The data-delay attribute is optional.
 * 
 * Optional plugins:
 * - jQuery and jquery.scrollTo.js for smooth scrolling
 * 
 */
(function(){
	var key='__scrollpersist_'+btoa(window.location.href);
	var currentScript=document.currentScript;
	var auto=currentScript.getAttribute('data-auto')!=='no';
	var delay=null;
	if(auto){
		delay=parseInt(currentScript.getAttribute('data-auto'));
	}
	var scroll=function(){
		var oldTop=localStorage[key+'_top'];
		var oldLeft=localStorage[key+'_left'];
		if(oldTop||oldLeft){
			if(typeof(jQuery)!=='undefined'&&typeof(jQuery.scrollTo)!=='undefined'){
				jQuery.scrollTo({top:oldTop,left:oldLeft},1000);
			}
			else{
				window.scrollTo(oldLeft,oldTop);
			}
		}
	};
	window.addEventListener('scroll',function(){
		var doc = document.documentElement;
		var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
		var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		localStorage[key+'_top']=top;
		localStorage[key+'_left']=left;
	});
	if(auto){
		document.addEventListener('DOMContentLoaded',function(){
			if(delay){
				setTimeout(scroll,delay);
			}
			else{
				scroll();
			}
		});
	}
	
	// Global function.
	window.scrollpersist=scroll;
})();
