/* eslint-env jquery */
function externalLinks() {
    if (!document.getElementsByTagName) return;
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.getAttribute("href") &&
            anchor.getAttribute("rel") == "external")
            anchor.target = "_blank";
    }
}
window.onload = externalLinks;

function theRotator() {
    //Set the opacity of all images to 0
    $('div.rotator ul li').css({
        opacity: 0.0
    });

    //Get the first image and display it (gets set to full opacity)
    $('div.rotator ul li:first').css({
        opacity: 1.0
    });

    //Call the rotator function to run the slideshow, 6000 = change to next image after 6 seconds

    setInterval('rotate()', 6000);

}

function rotate() {
    //Get the first image
    var current = ($('div.rotator ul li.show') ? $('div.rotator ul li.show') : $('div.rotator ul li:first'));

    if (current.length == 0) current = $('div.rotator ul li:first');

    //Get next image, when it reaches the end, rotate it back to the first image
    var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div.rotator ul li:first') : current.next()) : $('div.rotator ul li:first'));

    //Un-comment the 3 lines below to get the images in random order

    //var sibs = current.siblings();
    //var rndNum = Math.floor(Math.random() * sibs.length );
    //var next = $( sibs[ rndNum ] );


    //Set the fade in effect for the next image, the show class has higher z-index
    next.css({
            opacity: 0.0
        })
        .addClass('show')
        .animate({
            opacity: 1.0
        }, 1000);

    //Hide the current image
    current.animate({
            opacity: 0.0
        }, 1000)
        .removeClass('show');

};



$(document).ready(function() {
    //Load the slideshow
    theRotator();
    $('div.rotator').fadeIn(1000);
    $('div.rotator ul li').fadeIn(1000); // tweek for IE
});
/*Marshall Smith*/
