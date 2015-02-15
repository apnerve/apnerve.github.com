window.Framer.Defaults.DeviceView = {
  "deviceScale" : -1,
  "orientation" : 0,
  "contentScale" : 1,
  "deviceType" : "iphone-5s-silver-hand"
};
window.Framer.Device = new Framer.DeviceView();
Framer.Device.setupContext();







// Please don't judge. Coded in a hurry ;)

// Layers
var page1 = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1048,
  image: 'images/content-1.jpg'
});

var page2 = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1048,
  image: 'images/content-2.jpg',
  originX: 1,
  rotationY: 90
});

var menu1 = new Layer({
  x: 0,
  y: 1048,
  width: 640,
  height: 88,
  image: 'images/menu-1.jpg'
});

var menu2 = new Layer({
  x: 0,
  y: 1140,
  width: 640,
  height: 88,
  image: 'images/menu-2.jpg'
});

// States
page2.states.add({
  show: {
    rotationY: 0
  },
  hide: {
    rotationY: 90
  }
});

menu2.states.add({
  show: {
    y: 1048
  },
  hide: {
    y: 1140
  }
});

// Animation options
page2.states.animationOptions = {curve: "spring(600,30,0)"}
menu2.states.animationOptions = {curve: "spring(1000,10,0)"}

//Events

menu1.on(Events.Click, function() {
  page2.states.switch('show');
  menu2.states.switch('show');
});

menu2.on(Events.Click, function() {
  page2.states.switch('hide');
  menu2.states.switch('hide');
});
