setTimeout(init, 100);

var obox = document.getElementById('box');
var aImg = obox.getElementsByTagName('img');
var radius = 300;

function init(notDelay) {
  for (var i = 0; i < aImg.length; i++) {
    aImg[i].style.transform = "rotateY(" + (i * (360 / aImg.length)) + "deg) translateZ(" + radius + "px)";
    aImg[i].style.transition = "transform 1s";

    if(!notDelay) aImg[i].style.transitionDelay = (aImg.length - i) / 4 + "s";
  }
}
var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10,
    index = 0;
document.onmousedown = function(e) {
  clearInterval(obox.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onmousemove = function(e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    obox.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
    sX = nX;
    sY = nY;
  }

  this.onmouseup = function(e) {
    this.onmousemove = this.onmouseup = null;
    obox.timer = setInterval(function() {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      obox.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(obox.timer);
      }
    }, 13);
  }

  return false;
}
document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  // if (d > 0) {
  //     index -= 20;
  // } else {
  //     index += 30;
  // }
  // if (index < -1050) {
  //     index = -1050;
  // }
  // document.body.style.perspective = (1000 + index) + "px";
  radius += d;
  init(true);
};

function mousewheel(obj, fn) {
  document.onmousewheel === null ? obj.onmousewheel : null;
}
// function addEvent(obj, eName, fn) {
// 	obj.attackEvent?obj.attackEvent("on", eName, fn):null;
// }
