/*
 * scrollpersist v1.1.0
 * 
 * https://github.com/simon-thorpe/scrollpersist/
 * 
 * Include this script on any page that requires persistant scrolling when the user returns to it:
 * <script src="scrollpersist.js" data-delay="1000"></script>
 * 
 */
(function () {
    var key = '__scrollpersist_' + btoa(window.location.href);
    var currentScript = document.currentScript;
    var delay = null;
    delay = parseInt(currentScript.getAttribute('data-delay'));
    var scroll = function () {
        var oldTop = localStorage[key + '_top'];
        var oldLeft = localStorage[key + '_left'];
        if (oldTop || oldLeft) {
            if (typeof (jQuery) !== 'undefined' && typeof (jQuery.scrollTo) !== 'undefined') {
                jQuery.scrollTo({ top: oldTop, left: oldLeft }, 1000);
            }
            else {
                window.scrollTo(oldLeft, oldTop);
            }
        }
    };
    window.addEventListener('scroll', function () {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        localStorage[key + '_top'] = top;
        localStorage[key + '_left'] = left;
    });
    document.addEventListener('DOMContentLoaded', function () {
        if (delay) {
            setTimeout(scroll, delay);
        }
        else {
            scroll();
        }
    });
	
    // Global function.
    window.scrollpersist = scroll;
})();
