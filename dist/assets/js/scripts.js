/* eslint-env jquery */
function externalLinks() {
    if (!document.getElementsByTagName) return;
    var anchors = document.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.getAttribute('href') &&
            anchor.getAttribute('rel') == 'external')
            anchor.target = '_blank';
    }
}
window.onload = externalLinks;

function theRotator() {
    rotate();
    //Call the rotator function to run the slideshow, 6000 = change to next image after 6 seconds
    setInterval(rotate, 6000);

}

function rotate() {
    var $slides = $('.rotator ul li'),
        $current = $slides.filter('.show'),
        $next = $slides.first(),
        slide_heights = $slides.map(function(i, slide) {
            return $(slide).height();
        }),
        max_slide_height = Math.max.apply(null, slide_heights);

    $slides.parent().height(max_slide_height);

    if (($slides.index($current) + 1) < $slides.length) {
        $next = $current.next();
    }



    //Set the fade in effect for the next image, the show class has higher z-index
    $next.addClass('show')
        .animate({
            opacity: 1
        }, 1000);

    //Hide the current image
    $current.animate({
            opacity: 0
        }, 1000)
        .removeClass('show');
}



$(document).ready(function() {
    //Load the slideshow
    theRotator();
    $('div.rotator').fadeIn(1000);
    $('div.rotator ul li').fadeIn(1000); // tweek for IE
});
/*Marshall Smith*/
