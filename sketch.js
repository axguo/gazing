let clouds = ["I remember the summer I first met you, with your freckled smile and awkward hands tucked into the pocket of your hoodie",
  "sweet smelling spices filled up the air of our first home-cooked meal",
  "I wonder what the flowers would have said about you",
  "do you still write poetry?",
  "do you write poetry about me?",
  "some people become pieces of you, and every time I eat ice cream I think of the joy in your face",
  "there was so much joy",
  "In the warm embrace of sunset, we laughed as the sky painted itself orange and pink",
  "the secrets we whispered beneath the moon's watchful gaze",
  "our laughter danced through the air like fireflies on a summer night",
  "you taught me how to find solace in the quiet moments, amidst life's relentless noise",
  "we strolled hand in hand, our steps in sync, as the world blurred around us",
  "your voice was like a balm to my soul, soothing the jagged edges of my heart",
  "we shared our dreams and fears, as the stars bore witness to our confessions",
  "under the canopy of an old oak tree, our fingers traced stories in the bark",
  "the cool breeze carried the echoes of our love, as if it was a secret between the wind and us",
  "like wildflowers, we grew together, entwined and inseparable",
  "you showed me the beauty of imperfection, in every scar and blemish",
  "the way the rain washed away our worries, leaving only the soft patter of droplets on our skin",
  "our love was like the ocean, vast and deep, as we navigated its ebb and flow",
  "we built a fortress from blankets and pillows, where our dreams could take flight",
  "on lazy afternoons, we lost ourselves in the pages of books, seeking adventure in the tales of others",
  "your laughter was like sunshine, brightening even the darkest of days",
  "as the seasons changed, so did we, growing stronger with each new experience",
  "we carved our names in the sand, knowing the tide would eventually wash it away",
  "but the memory of that moment, etched forever in our hearts",
  "we danced in the moonlight, the world a blur of shadows and silhouettes",
  "our love was like a symphony, a harmony of notes blending together to create a masterpiece",
  "as the autumn leaves fell, we wove them into crowns, kings and queens of our own making",
  "we painted our love on the canvas of the sky, the colors bleeding into one another",
  "the silence between us spoke volumes, comfortable and unbroken",
  "we whispered our love to the wind, sending it off to the corners of the earth",
  "the fireflies that surrounded us were like tiny sparks of magic, illuminating our path",
  "our love blossomed like a rose, beautiful and delicate, yet resilient and strong",
  "your presence was a balm to my soul, a comfort in the midst of chaos",
  "we found solace in the embrace of each other, a shelter from the storms of life",
  "we were like two lost souls, finding our way home in each other's arms",
  "our love was a tapestry, woven from the threads of our shared experiences",
  "your words were like sweet nectar, nourishing my spirit and filling my heart",
  "the warmth of your touch was a beacon of light, guiding me through the darkness",
  "we walked together through fields of wildflowers, the world a palette of colors and scents",
  "our love was like a garden, nurtured by the warmth of our hearts and the strength of our devotion",
  "as the sun set on the horizon, we let our dreams take flight, soaring towards the stars",
  "your love was a river, gentle and constant, carving a path through the landscape of my heart",
  "we shared the simple joys of life, content in the knowledge that we were together",
  "our laughter filled the air, like the sweetest of melodies, carried away on the wings of the wind",
  "we spoke of our love in whispers, the words too precious to be spoken aloud",
  "your love was like a flame, burning bright and fierce"
];

let poem = "asdfsdfasfdsfasdfsdf";

let words = [];
let numWords = 50;

// room
let room;
let msk;
let sideMargin = 60;
let topMargin = 0;
// let bottomMargin = 0;
let bottomMargin = 80;
let topPers = 20;
let bottomPers = 20;
let roomColors;

// // wall
let left;
let right;
let bottom;
let topy;

// windows
let numWindows;
let windows = [];
let ww = 170;
let wh = 200;
let overlapping = false;

// font
let font;

// sounds
let birds;

// test
let drawroom = true;
// let drawroom = false;

function preload() {
  font = loadFont("assets/fonts/EBGaramond-Regular.ttf");

  soundFormats('mp3');
  birds = loadSound('assets/sounds/birds');
}

function setup() {
  createCanvas(800, 550);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(RGB, 255, 255, 255, 1);

  textSize(30);
  textFont(font);
  textAlign(CENTER, TOP);

  noCursor();
  setupWords(numWords);
  console.log(words);

  numWindows = Math.floor(random() * 4 + 5);

  roomColors = [color(214, 174, 182), color(126, 166, 85), color(117, 72, 81)];
  room = createGraphics(width, height);

  // frameRate(30);
}

function randomWord(wordsList) {
  let ind = Math.floor(Math.random() * wordsList.length);
  const word = wordsList[ind];
  const w = {
    text: word,
    x: Math.random() * width * 2,
    y: Math.random() * height,
    speed: Math.random() + 1,
    size: Math.floor(Math.random() * 16) + 15,
    opacity: Math.random(),
    width: Math.floor(Math.random() * 100) + 150
  };

  return w;
}

function setupWords(numWords) {
  for (let i = 0; i < numWords; i++) {
    let w = randomWord(clouds);
    words.push(w);
  }
}

function getRoomColors(c) {
  // given wall color, get side and top/floor colors
}

function drawRoom() {
  

  

  left = sideMargin;
  right = width - sideMargin;
  bottom = height - bottomMargin;
  topy = topMargin;


  // wall
  // room.fill(lerpColor(color(0), roomColors[0], map(numWindows, 6, 0, 0, 1)));
  room.fill(0);
  room.stroke(0);
  room.strokeWeight(1);
  room.text(poem, 0, 0);
  room.fill(255);
  room.noStroke();
  room.rect(0, 0, width, height);

  // // sides
  // room.fill(lerpColor(color(0), roomColors[1], map(numWindows, 6, 0, 0, 1)));
  // // left
  // room.rect(0, 0, left, height);
  // // right
  // room.rect(width, 0, -left, height);
  // // top
  // room.quad(topPers, 0, left, top, right, top, width - topPers, 0);
  // // bottom
  // room.fill(lerpColor(color(0), roomColors[2], map(numWindows, 6, 0, 0, 1)));
  // room.quad(bottomPers, height, left, bottom, right, bottom, width - bottomPers, height);
}

function noOverlap(r1, r2) {
  return r1.x > r2.x + r2.w ||
    r2.x > r1.x + r1.w ||
    r1.y > r2.y + r2.h ||
    r2.y > r1.y + r1.h;
}

function onWall(w) {
  return w.x >= left && w.x + w.w <= right && w.y >= topy && w.y + w.h <= bottom;
}

function canPlaceWindow(newWindow) {
  // if (!onWall(newWindow)) {
  //   return false;
  // }
  for (let i = 0; i < windows.length; i++) {
    w = windows[i];
    if (!noOverlap(w, newWindow)) {
      return false;
    }
  }
  return true;
}

function scootWindowOnWall(w) {
  let x = Math.max(left, w.x);
  let y = Math.max(topy, w.y);
  x = Math.min(x, right - ww);
  y = Math.min(y, bottom - wh);
  return { x: x, y: y, w: ww, h: wh };
}

function drawWindows() {
  //punch a hole in the shapes
  msk = createGraphics(width, height);
  msk.background(0);
  msk.erase();
  msk.noStroke();

  stroke(0);
  noFill();

  // draw current potential window
  if (numWindows > 0) {
    let window = {
      x: mouseX - ww / 2,
      y: mouseY - wh / 2,
      w: ww,
      h: wh,
    };
    let w = scootWindowOnWall(window);
    strokeWeight(5);
    stroke(0);
    rect(w.x, w.y, w.w, w.h);
    msk.rect(w.x, w.y, w.w, w.h);
    strokeWeight(3);
    // line(w.x + w.w / 2, w.y, w.x + w.w / 2, w.y + w.h);
    // line(w.x, w.y + w.h / 2, w.x + w.w, w.y + w.h / 2);
    // fill(128, 126, 125);
    // line(w.x, w.y + w.h, w.x + w.w, w.y + w.h);

  }

  // draw placed windows
  strokeWeight(2);
  for (let i = 0; i < windows.length; i++) {
    let w = windows[i];
    drawWindow(w);
  }
}

function drawWindow(w) {
  noFill();
  stroke(0);
  strokeWeight(5);
  rect(w.x, w.y, w.w, w.h);
  msk.rect(w.x, w.y, w.w, w.h);
  strokeWeight(3);
  // line(w.x + ww / 2, w.y, w.x + ww / 2, w.y + wh);
  // line(w.x, w.y + wh / 2, w.x + ww, w.y + wh / 2);




  // room.strokeWeight(10);
  // room.stroke(230);
  // room.strokeCap(SQUARE);
  // room.line(w.x - 5, w.y + w.h, w.x + w.w + 5, w.y + w.h);
  // strokeWeight(10);
  // stroke(230);
  // line(w.x - 5, w.y + w.h, w.x + w.w + 5, w.y + w.h);
}

function drawScenery() {
  // passing poem

  fill(0);
  noStroke();
  text(poem, -frameCount % width, 0, width * 2, height);
}

function drawCloudScene() {
  // background(0);
  drawGradientBackground();
  noStroke();

  for(let i =0; i < words.length; i++) {
    let w = words[i];
    w.x -= w.speed;
    fill(0, 0, 0, w.opacity);
    textSize(w.size);
    text(w.text, w.x, w.y, w.width);
    if (w.x + w.width < 0) {
      w = randomWord(clouds);
      w.x = width + random() * width;
    }
  }

  drawBlob(width - 100, 100, 150);
  
}

function drawGradientBackground() {
  // const bottomColor = color(149, 192, 245);
  // const topColor = color(73, 128, 222);
  

  // for (let y = 0; y < height; y++) {
  //   const lineColor = lerpColor(topColor, bottomColor, y / height);

  //   stroke(lineColor);
  //   line(0, y, width, y);
  // }
  // background(120, 255, 255);
  clear();
}

function draw() {
  background(255);

  // drawScenery();
  drawCloudScene();
  
  
  if (drawroom) {
    //draw on external canvas

    drawRoom();
    drawWindows();


    roomImage = room.get();
    // cut out window mask
    let mskImage = msk.get();
    roomImage.mask(mskImage);
    // draw room overlay
    image(roomImage, 0, 0);
  }


  //   noLoop();
}

function mousePressed() {
  let window = {
    x: mouseX - ww / 2,
    y: mouseY - wh / 2,
    w: ww,
    h: wh,
  };
  if (numWindows > 0 && canPlaceWindow(window)) {
    windows.push(scootWindowOnWall(window));
    numWindows -= 1;
    birds.setVolume(map(numWindows, 6, 0, 0, 1));
    if (!birds.isPlaying()) {
      birds.loop();
    }
  }
}

function windowResized() {
  resizeCanvas(Math.max(windowWidth, width), Math.max(windowHeight, height));
  console.log(generateToBe());
}







function drawBlob(x, y, radius) {
  let inc;
  if (radius < 50) {
    inc = 1;
  } else {
    inc = 2;
  }
  for (let r = 0; r < radius; r += inc) {
    noStroke();
    fill(255, 255, 201, 0.02);
    circle(x, y, r);
  }
}

