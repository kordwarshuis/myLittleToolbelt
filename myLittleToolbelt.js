/**
 * There was (used to be) no fadeout in soundjs (createjs lib), this is a snippet to fill the gap
 * Assumes an object with:
 *   method: theSound.setVolume()
 *   method: theSound.stop()
 */
(function fadeOut(args) {
    if (args.whatToFade > 0) {
        theSound.setVolume(args.whatToFade * args.whatToFade * args.whatToFade);
        args.whatToFade -= 0.05;
        setTimeout(fadeOut, args.speed);
    }
    else {
        theSound.stop();
    }
}({
    soundObject: theSound,
    whatToFade: 1, // aNumberPlease
    speed: 100
}));



/*
 * add a class attribute to elements with already a certain class attached, with a delay.
 *
 * Example:
 * we have 5 elements with class .foo. This function adds a class with name .bar to one of the elements every 1000 miliseconds
 * Application: if you want to add animation to elements, but you don't want to animate everything in exactly the same pace
 */
(function(args) {
    var targetClass = document.querySelectorAll(args.targetClass);
    var i = 0;
    (function recursive(){
        if (i < targetClass.length) {
            targetClass[i].className += " " + args.newClass;
            i++;
            setTimeout(recursive, args.delay);
        }
    })();
})({
    targetClass: ".foo",
    newClass: "bar", // no dot!
    delay: 1000 // miliseconds, 1000 ms = 1 sec
});



/*
 * wobbly images
 * inspired by www.justinaguilar.com/animations/
 * make images with certain class name wobbly
 * DON'T FORGET THE CSS
 */
(function(args) {
    var thingToAnimate = document.querySelectorAll(args.classThatWeWantToWobble);
    var i = 0;
    (function addAnimation(){
        if (i < thingToAnimate.length) {
            thingToAnimate[i].className += " " + "wobble";
            i++;
            setTimeout(addAnimation, 100);
        }
    })();
})({classThatWeWantToWobble: ".foo" }); // images with a class name "foo" will be wobblified



/*
 * calculate frames per second
 * source: http://stackoverflow.com/questions/5078913/html5-canvas-performance-calculating-loops-frames-per-second
 */
(function fpsCalculator(){
    var fpsViewer = document.createElement("p");
    fpsViewer.setAttribute("id", "fps");
    fpsViewer.style.position = "absolute";
    fpsViewer.style.top = "10px";
    fpsViewer.style.left = "10px";
    document.body.appendChild(fpsViewer);

    var fps = 0, now, lastUpdate = (new Date)*1 - 1;

    // The higher this value, the less the FPS will be affected by quick changes
    // Setting this to 1 will show you the FPS of the last sampled frame only
    var fpsFilter = 50;

    function drawFrame(){
        // ... draw the frame ...

        var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
        fps += (thisFrameFPS - fps) / fpsFilter;
        lastUpdate = now * 1 - 1;

        setTimeout( drawFrame, 1 );
    }

    var fpsOut = document.getElementById('fps');
    setInterval(function(){
        fpsOut.innerHTML = fps.toFixed(1) + "fps";
    }, 1000);
    drawFrame();
}());



/*
 * turn nodelist into array
 * source: http://stackoverflow.com/questions/7459704/in-javascript-best-way-to-convert-nodelist-to-array
 */
var htmlImgs;
htmlImgs = document.querySelectorAll(".deviceOrientedImages"); //nodelist
htmlImgs = Array.prototype.slice.call(htmlImgs, 0); //array



/*
 * 'length' of an object
 */
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};



/*
 * source: http://ejohn.org/blog/fast-javascript-maxmin/
 * Fast JavaScript Max/Min
 */
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};



/*
 * source: http://www.nczonline.net/blog/2009/03/03/the-art-of-throwing-javascript-errors/
 * add a class
 *
*/
function addClass(element, className){
    if (element != null && typeof element.className == "string"){
        element.className += " " + className;
    } else {
        throw new Error("addClass(): First arg must be a DOM element.");
    }
}



/*
 * prevent selection of text
 * source: http://stackoverflow.com/questions/2326004/prevent-selection-in-html
 * DON"T FORGET THE CSS!!!!
 */
(function makeUnselectable(node) {
    if (node.nodeType === 1) {
        node.setAttribute("unselectable", "on");
    }
    var child = node.firstChild;
    while (child) {
        makeUnselectable(child);
        child = child.nextSibling;
    }
})(document.getElementsByTagName("body"));



/*
 * determine whether an array contains a value
 * source: http://stackoverflow.com/questions/1181575/javascript-determine-whether-an-array-contains-a-value
 */
var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle);
};
// You can use it like this:
var myArray = [0,1,2],
    needle = 1,
    index = indexOf.call(myArray, needle); // 1



/*
 * random between two integers
 */
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}



/*
 * rounding numbers
 * example: rounding(13.5374,2)
 * ==> 13,54
 */
function rounding(value, places) {
    var multiplier = Math.pow(10, places);
    return (Math.round(value * multiplier) / multiplier);
}


/**
 * get viewportsize
 * @returns {{width: number, height: number}}
 */
function getViewportSize() {
    var wdth = 0;
    var hth = 0;
    if (!window.innerWidth) {
        wdth = (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);
        hth = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);
    } else {
        wdth = window.innerWidth;
        hth = window.innerHeight;
    }
    return {
        width: wdth,
        height: hth
    };
}
var viewportWidth = getViewportSize().width;
var viewportHeight = getViewportSize().height;



/**
 * quick and dirty way to build an html table
 */
function buildHTMLTable() {
    var i;
    var stringBuilder = function () {
        this.buffer = [];
    };

    stringBuilder.prototype = {
        cat: function (what) {
            this.buffer.push(what);
            return this;
        },
        string: function () {
            return this.buffer.join('');
        }
    };

    var html = new stringBuilder();

    var howManyRows = 15;

    // make table headers
    html.cat("<table>");
    html.cat("<caption>Caption text ");
    html.cat(" quakes</caption>");
    html.cat(
        "<th>some text 1</th>" +
        "<th>some text 2</th>" +
        "<th>some text 3</th>" +
        "<th>some text 4</th>"
    );

    // make rows and cells with content
    for (i = 0; i < howManyRows; i++) {
        html.cat("<tr>");
        html.cat("<td>");
        html.cat("something 1");
        html.cat("</td>");
        html.cat("<td>");
        html.cat("something 2");
        html.cat("</td>");
        html.cat("<td>");
        html.cat("something 3");
        html.cat("</td>");
        html.cat("<td>");
        html.cat("something 4");
        html.cat("</td>");
        html.cat("</tr>");
    }
    // and close table
    html.cat("</table>");

    // and append string to DOM, requires jQuery
    $('#details').empty().append(html.string());
}
