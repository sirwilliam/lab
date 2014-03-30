var giveSize = function() {
    var myWidth = 0, myHeight = 0;

    if( typeof( window.innerWidth ) === 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    // return Object Lilteral
    return {
        'W': myWidth,
        'H': myHeight
    };

};

//Function to create circles with different positions and velocities
var create_circle = function(){
    'use strict';

    var result = giveSize(), W = result.W, H = result.H;

    //var W = window.innerWidth, H = window.innerHeight;

    //Random Position
    this.x = Math.random() * W;
    this.y = Math.random() * H;

    //Random Velocities
    this.vx = Math.random() * 1;
    this.vy = -this.vx;

    //Random Radius
    this.rad = 10 + Math.random() * 33;
};

var circles = []; // array containing the circles
var num = 21; // number of circles
for(var i=0; i < num; i++ ){
    circles.push(new create_circle());
}

var flicks = function() {
    'use strict';

    $('figure').hover(function(){
        $(this).animate({paddingLeft:'+=22px'});
    }, function(){
        $(this).animate({paddingLeft:'-=22px'});
    });
};


//Function to draw the background
var drawCircle = function() {
    var canvasId = document.getElementById('canvas');
    var idGetContext = canvasId.getContext("2d");

    var result = giveSize();
    /*    console.log(result.W);
     console.log(result.H);*/

    var W = result.W, H = result.H;

    canvasId.width = W;
    canvasId.height = H ;

    //Create the gradient
    var grad = idGetContext.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, 'rgb(206,114,30)');
    grad.addColorStop(1, 'rgb(219,219,219)');

    //Fill the canvas with the gradient
    idGetContext.globalCompositeOperation = "darker"; //lighter
    idGetContext.fillStyle = grad; // color
    idGetContext.fillRect(1,1,W,H);

    //Fill the canvas with the circles
    var len = circles.length;
    for(var n=0; n < len; n++) {
        var cir = circles[n];

        //Draw the circle and it with the blur grad
        idGetContext.beginPath();
        idGetContext.globalCompositeOperation = "lighter"; // destination-out
        idGetContext.fillStyle = grad;
        idGetContext.arc(cir.x, cir.y, cir.rad, Math.PI*2, false); // draw the circle
        idGetContext.fill();

        // speed
        cir.x += cir.vx;
        cir.y += cir.vy;

        // circles stay within canvas
        if(cir.x < -66) cir.x = W+66;
        if(cir.y < -66) cir.y = H+66;
        if(cir.x > W+66) cir.x = -66;
        if(cir.y > H+66) cir.y = -66;
    }
};


