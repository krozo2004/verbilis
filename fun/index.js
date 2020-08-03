var body = document.body;
var width  = body.clientWidth * 2;
var height = body.clientHeight * 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fps = 60;
var frameTime = 1000 / fps;

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getDegree = function(radian) {
  return radian / Math.PI * 180;
};

var getRadian = function(degrees) {
  return degrees * Math.PI / 180;
};

var getDistance = function(p1x, p1y, p2x, p2y) {
  var distX = p1x - p2x;
  var distY = p1y - p2y;
  return Math.sqrt(distX * distX + distY * distY);
};

var debounce = function(object, eventType, callback){
  var timer;

  object.addEventListener(eventType, function() {
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback();
    }, 500);
  }, false);
};

var animeObjArr = [];
var lastTime = +new Date();
var pointBase = {
  x: width / 2,
  y: height
};
var pointGlip = {
  x: 0,
  y: 0
};
var isTouched = false;
var isGliped = false;
var renderType = 'Full';

var setPointBase = function() {
  pointBase.x = width / 2;
  pointBase.y = height;
};

var canvasResize = function() {
  ctx.clearRect(0, 0, width, height);
  width  = body.clientWidth * 2;
  height = body.clientHeight * 2;

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width / 2 + 'px';
  canvas.style.height = height / 2 + 'px';
  setPointBase();
};

debounce(window, 'resize', function(){
  canvasResize();
});

canvasResize();

var animeObj = function() {
  this.size = 100;
  this.angle = 90;
  this.k = 0.09;
  this.px = width / 2;
  this.py = height - 300;
  this.x = this.px;
  this.y = this.py;
  this.ax = 0;
  this.ay = 0;
  this.vx = 0;
  this.vy = 0;
  this.cd = 0.1;
  this.distance = 0;
  this.vector = 0;
  this.cp1x = 0;
  this.cp1y = 0;
  this.cp2x = 0;
  this.cp2y = 0;
  this.cp3x = 0;
  this.cp3y = 0;
  this.cp4x = 0;
  this.cp4y = 0;
  this.cp5x = 0;
  this.cp5y = 0;
  this.cp6x = 0;
  this.cp6y = 0;
  this.cp7x = 0;
  this.cp7y = 0;
  this.cp8x = 0;
  this.cp8y = 0;
  this.cp9x = 0;
  this.cp9y = 0;
  this.cpin1x = 0;
  this.cpin1y = 0;
  this.cpin2x = 0;
  this.cpin2y = 0;
  this.cpin3x = 0;
  this.cpin3y = 0;
  this.cpin4x = 0;
  this.cpin4y = 0;
  this.cpin5x = 0;
  this.cpin5y = 0;
  this.cpin6x = 0;
  this.cpin6y = 0;
  this.cpin7x = 0;
  this.cpin7y = 0;
  this.cpin8x = 0;
  this.cpin8y = 0;
  this.cpin9x = 0;
  this.cpin9y = 0;
  this.lpx = 0;
  this.lpy = 0;
};

animeObj.prototype.move = function() {
  this.px = width / 2;
  this.py = height - 300;
  if (isGliped) {
    this.x = pointGlip.x;
    this.y = pointGlip.y;
    if (this.y > height - 50) {
      this.y = height - 50;
    }
  } else {
    this.ax = (this.px - this.x + Math.cos(this.angle) * 50) * this.k;
    this.ay = (this.py - this.y + Math.sin(this.angle * 3) * 10) * this.k;
    this.ax -= this.cd * this.vx;
    this.ay -= this.cd * this.vy;
    this.vx += this.ax;
    this.vy += this.ay;
    this.angle += 0.05;
    this.x += this.vx;
    this.y += this.vy;
    if(this.y > height - this.size) {
      this.y = height - this.size;
    }
  }
  this.distance = getDistance(pointBase.x, pointBase.y, this.x, this.y);
  this.vector = getDegree(Math.atan2(pointBase.y - this.y, pointBase.x - this.x));
  this.cp1x = width / 2 - this.size * 1.5;
  this.cp1y = height + 10;
  this.cp2x = width / 2 - (this.size - this.distance / 33) * Math.cos(getRadian(this.vector - 60));
  this.cp2y = height - (this.size - this.distance / 33) * Math.sin(getRadian(this.vector - 60));
  this.cp3x = this.x - (this.size - this.distance / 33) * Math.cos(getRadian(this.vector - 90));
  this.cp3y = this.y - (this.size - this.distance / 33) * Math.sin(getRadian(this.vector - 90));
  this.cp4x = this.x - (this.size - this.distance / 33) * 1.33 * Math.cos(getRadian(this.vector - 45));
  this.cp4y = this.y - (this.size - this.distance / 33) * 1.33 * Math.sin(getRadian(this.vector - 45));
  this.cp5x = this.x - (this.size - this.distance / 33) * Math.cos(getRadian(this.vector));
  this.cp5y = this.y - (this.size - this.distance / 33) * Math.sin(getRadian(this.vector));
  this.cp6x = this.x - (this.size - this.distance / 33) * 1.33 * Math.cos(getRadian(this.vector + 45));
  this.cp6y = this.y - (this.size - this.distance / 33) * 1.33 * Math.sin(getRadian(this.vector + 45));
  this.cp7x = this.x - (this.size - this.distance / 33) * Math.cos(getRadian(this.vector + 90));
  this.cp7y = this.y - (this.size - this.distance / 33) * Math.sin(getRadian(this.vector + 90));
  this.cp8x = width / 2 - (this.size - this.distance / 33) * Math.cos(getRadian(this.vector + 60));
  this.cp8y = height - (this.size - this.distance / 33) * Math.sin(getRadian(this.vector + 60));
  this.cp9x = width / 2 + this.size * 1.5;
  this.cp9y = height + 10;
  
  this.cpin1x = width / 2 - 7 - this.size * 0.75 * 1.5;
  this.cpin1y = height + 10;
  this.cpin2x = width / 2 - 7 - (this.size - this.distance / 33) * 0.75 * Math.cos(getRadian(this.vector - 60));
  this.cpin2y = height - (this.size - this.distance / 33) * 0.75 * Math.sin(getRadian(this.vector - 60));
  this.cpin3x = this.x - 5 - (this.size - this.distance / 33) * 0.75 * Math.cos(getRadian(this.vector - 90));
  this.cpin3y = this.y - (this.size - this.distance / 33) * 0.75 * Math.sin(getRadian(this.vector - 90));
  this.cpin4x = this.x - 5 - (this.size - this.distance / 33) * 0.75 * 1.33 * Math.cos(getRadian(this.vector - 45));
  this.cpin4y = this.y - (this.size - this.distance / 33) * 0.75 * 1.33 * Math.sin(getRadian(this.vector - 45));
  this.cpin5x = this.x - 5 - (this.size - this.distance / 33) * 0.75 * Math.cos(getRadian(this.vector));
  this.cpin5y = this.y - (this.size - this.distance / 33) * 0.75 * Math.sin(getRadian(this.vector));
  this.cpin6x = this.x - 5 - (this.size - this.distance / 33) * 0.75 * 1.33 * Math.cos(getRadian(this.vector + 45));
  this.cpin6y = this.y - (this.size - this.distance / 33) * 0.75 * 1.33 * Math.sin(getRadian(this.vector + 45));
  this.cpin7x = this.x - 5 - (this.size - this.distance / 33) * 0.75 * Math.cos(getRadian(this.vector + 90));
  this.cpin7y = this.y - (this.size - this.distance / 33) * 0.75 * Math.sin(getRadian(this.vector + 90));
  this.cpin8x = width / 2 - 7 - (this.size - this.distance / 33) * 0.75 * Math.cos(getRadian(this.vector + 60));
  this.cpin8y = height - (this.size - this.distance / 33) * 0.75 * Math.sin(getRadian(this.vector + 60));
  this.cpin9x = width / 2 - 7 + this.size * 0.75 * 1.5;
  this.cpin9y = height + 10;
  
  this.lpx = this.x - (this.size * 0.65 - this.distance / 33) * Math.cos(getRadian(this.vector + 45));
  this.lpy = this.y - (this.size * 0.65 - this.distance / 33) * Math.sin(getRadian(this.vector + 45));
};

animeObj.prototype.render = function() {
  switch(renderType) {
    case 'Full':
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#708b75';
      
      ctx.beginPath();
      ctx.moveTo(this.cp1x, this.cp1y);
      ctx.quadraticCurveTo(this.cp2x, this.cp2y, this.cp3x, this.cp3y);
      ctx.quadraticCurveTo(this.cp4x, this.cp4y, this.cp5x, this.cp5y);
      ctx.quadraticCurveTo(this.cp6x, this.cp6y, this.cp7x, this.cp7y);
      ctx.quadraticCurveTo(this.cp8x, this.cp8y, this.cp9x, this.cp9y);
      ctx.fillStyle = '#8fcc9b';
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(this.cpin1x, this.cpin1y);
      ctx.quadraticCurveTo(this.cpin2x, this.cpin2y, this.cpin3x, this.cpin3y);
      ctx.quadraticCurveTo(this.cpin4x, this.cpin4y, this.cpin5x, this.cpin5y);
      ctx.quadraticCurveTo(this.cpin6x, this.cpin6y, this.cpin7x, this.cpin7y);
      ctx.quadraticCurveTo(this.cpin8x, this.cpin8y, this.cpin9x, this.cpin9y);
      ctx.fillStyle = '#ade3b7';
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.lpx, this.lpy, this.size / 5, 0, getRadian(360), false);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
      ctx.closePath();
      break;
    default:
      break;
  }
};

animeObj.prototype.judgeGliped = function() {
  if(getDistance(pointGlip.x, pointGlip.y, this.x, this.y) < this.size && isTouched === true) {
    isGliped = true;
  };
  isTouched = false;
};
animeObjArr.push(new animeObj());

var render = function() {
  ctx.clearRect(0, 0, width, height);
  
  for (var i = 0; i < animeObjArr.length; i++) {
    animeObjArr[i].move();
    animeObjArr[i].render();
    animeObjArr[i].judgeGliped();
  };
};

var renderloop = function() {
  var now = +new Date();
  requestAnimationFrame(renderloop);
  if (now - lastTime < frameTime) return;
  render();
};
renderloop();

document.addEventListener('mousedown', function(event) {
  isTouched = true;
  pointGlip.x = event.x * 2;
  pointGlip.y = event.y * 2;
}, false);

document.addEventListener('touchstart', function(event) {
  event.preventDefault();
  isTouched = true;
  pointGlip.x = event.touches[0].pageX * 2;
  pointGlip.y = event.touches[0].pageY * 2;
}, false);

document.addEventListener('mousemove', function(event) {
  if (!isGliped) return;
  pointGlip.x = event.x * 2;
  pointGlip.y = event.y * 2;
  document.getElementById('strain').play();
}, false);

document.addEventListener('touchmove', function(event) {
  event.preventDefault();
  if (!isGliped) return;
  pointGlip.x = event.touches[0].pageX * 2;
  pointGlip.y = event.touches[0].pageY * 2;
  document.getElementById('strain').play();
}, false);

document.addEventListener('mouseup', function(event) {
  isGliped = false;
  document.getElementById('strain').pause();
  randomSound();
}, false);

document.addEventListener('mouseout', function(event) {
  isGliped = false;
  document.getElementById('strain').pause();
}, false);

document.addEventListener('touchend', function(event) {
  event.preventDefault();
  isGliped = false;
  document.getElementById('strain').pause();
  randomSound();
}, false);

selector.addEventListener('change', function(event) {
  var index = this.selectedIndex;
  var value = this.options[index].value;
  renderType = value;
}, false);