/*
 * wobbly images
 * inspired by www.justinaguilar.com/animations/
 * make images with certain class name wobbly
 */
(function(args) {
    var thingToAnimate = document.querySelectorAll(args.classThatWeWantToWobble);
    var i = 0;
    (function addAnimation(){
        if (i < thingToAnimate.length) {
            thingToAnimate[i].setAttribute("class", "wobble");
            i++;
            setTimeout(addAnimation, 100);
        }
    })();
})({classThatWeWantToWobble: ".foo" });



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
 * add a class
*/
document.getElementById("foo").className += " " + "new-class";



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