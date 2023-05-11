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


let initial = true;
let words = [];
let numWords = 50;

// room
let room;
let msk;
let img;
let bg;

// windows
let numWindows;
let initialWindows = 7;
let windows = [];
let ww = 200;
let wh = 230;
let overlapping = false;
let borderWeight = 5;
let crossWeight = 3;
let numGlows = 1;

// font
let font;
let ifont;

// sounds
let birds;

// transitions
let currColor;
let targetColor;
let state;
let nextState;

let states = [];

let transitionTime = 50;
let transitionLeft;
let inTransition = false;

function preload() {
  font = loadFont("assets/fonts/EBGaramond-Regular.ttf");
  ifont = loadFont("assets/fonts/PTMono-Regular.ttf");

  img = loadImage(
    'fake_google.png',
  );

  soundFormats('mp3');
  birds = loadSound('assets/sounds/birds');
}

function setupStates() {
  let cloudState = {
    name: "clouds",
    bg: color(101, 119, 133)
  }

  let declarationState = {
    name: "declaration",
    bg: color(38, 38, 38)
  }

  states = [cloudState, declarationState];
}

function setupWords(numWords) {
  for (let i = 0; i < numWords; i++) {
    let w = randomWord(clouds);
    words.push(w);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(RGB, 255, 255, 255, 1);

  textSize(30);
  textFont(font);
  textAlign(CENTER, TOP);

  noCursor();
  setupWords(numWords);

  numWindows = initialWindows;
  

  setupStates();

  state = states[0];

  console.log(state)

  bg = state.bg;

  // console.log(bg);
  drawRoom();
}

function drawRoom() {
  room = createGraphics(width, height);
  room.pixelDensity(pixelDensity());
  room.colorMode(RGB, 255, 255, 255, 1);

  if (initial) {
    room.image(img, 0, 0, width, height);
  }

  if (inTransition) {
    transitionLeft -= 1;
    let color = lerpColor(currColor, targetColor, map(transitionLeft, transitionTime, 0, 0, 1));
    let opacity = 1;
    if (initial) {
      opacity = map(transitionLeft, transitionTime, 0, 0.6, 1);
    }
    room.fill(color.levels[0], color.levels[1], color.levels[2], opacity);

    console.log("still transitioning?")
    if (transitionLeft == 0) {
      finishTransition();
    }
  } else {
    if (initial) {
      room.fill(bg.levels[0], bg.levels[1], bg.levels[2], map(numWindows, initialWindows, 0, 0, 0.6));
    } else {
      room.fill(bg.levels[0], bg.levels[1], bg.levels[2], 1);
    }
    
  }
  room.rect(0, 0, width, height);

  for (let i = 0; i < windows.length; i++) {
    let w = windows[i];
    w.glow = false;
    w.glowsLeft = numGlows;
  }
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

function noOverlap(r1, r2) {
  return r1.x > r2.x + r2.w ||
    r2.x > r1.x + r1.w ||
    r1.y > r2.y + r2.h ||
    r2.y > r1.y + r1.h;
}

function canPlaceWindow(newWindow) {
  for (let i = 0; i < windows.length; i++) {
    w = windows[i];
    if (!noOverlap(w, newWindow)) {
      return false;
    }
  }
  return true;
}

function drawWindows() {
  //punch a hole in the shapes
  msk = createGraphics(width, height);
  msk.background(0);
  msk.erase();
  msk.noStroke();

  noFill();

  // draw current potential window
  if (numWindows > 0) {
    let w = {
      x: mouseX - ww / 2,
      y: mouseY - wh / 2,
      w: ww,
      h: wh,
      glow: false
    };
    strokeWeight(borderWeight);
    stroke(255);
    rect(w.x, w.y, w.w, w.h);
    msk.rect(w.x, w.y, w.w, w.h);
    strokeWeight(crossWeight);
    line(w.x + w.w / 2, w.y, w.x + w.w / 2, w.y + w.h);
    line(w.x, w.y + w.h / 2, w.x + w.w, w.y + w.h / 2);
  }

  // draw placed windows
  for (let i = 0; i < windows.length; i++) {
    let w = windows[i];
    drawWindow(w);
  }
}

function drawWindow(w) {
  noFill();
  stroke(255);
  strokeWeight(borderWeight);
  rect(w.x, w.y, w.w, w.h);
  msk.rect(w.x, w.y, w.w, w.h);
  strokeWeight(crossWeight);
  line(w.x + ww / 2, w.y, w.x + ww / 2, w.y + wh);
  line(w.x, w.y + wh / 2, w.x + ww, w.y + wh / 2);

  if (!w.glow && !w.done) {
    room.fill(255);
    room.noStroke();
    // room.noFill();
    // room.stroke(255);
    // room.strokeWeight(4);

    room.drawingContext.shadowBlur = 70;
    room.drawingContext.shadowColor = color(255, 255, 255);
    room.rect(w.x, w.y, w.w, w.h);
    w.glowsLeft -= 1;
    if (w.glowsLeft == 0) {
      w.glow = true;
      w.done = true;
    }

    // noFill();
    // stroke(255);
    // strokeWeight(3);
    // drawingContext.shadowBlur = 10;
    // drawingContext.shadowColor = color(255, 255, 255);
    // rect(w.x - 2, w.y - 2, w.w + 4, w.h + 4);
    // drawingContext.shadowBlur = 0;

  }

  if (w.done && w.glowsLeft > 0) {
    for (let i = 0; i < w.glowsLeft; i++) {
      room.fill(255);
      // room.noFill();
      room.stroke(255);
      // room.strokeWeight(4);
      room.noStroke();

      room.drawingContext.shadowBlur = 70;
      room.drawingContext.shadowColor = color(255, 255, 255);
      room.rect(w.x, w.y, w.w, w.h);

      // noFill();
      // stroke(255);
      // strokeWeight(3);
      // drawingContext.shadowBlur = 10;
      // drawingContext.shadowColor = color(255, 255, 255);
      // rect(w.x - 2, w.y - 2, w.w + 4, w.h + 4);
      // drawingContext.shadowBlur = 0;
    }
    w.glowsLeft = 0;
    w.glow = true;
  }

}

function drawCloudScene() {
  clear();
  noStroke();

  for (let i = 0; i < words.length; i++) {
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

function drawScene() {
  if (inTransition) {
    console.log("transitioning!");
  } else if (state.name == "cloud") {
    drawCloudScene();
  }
}

function draw() {
  drawScene();

  if (inTransition) {
    drawRoom();
    console.log("are we drawing")
  }

////////////////////////////////////
// do i need to draw windows every time now that they're done?
////////////////////////////////

  //draw on external canvas
  drawWindows();


  roomImage = room.get();
  // cut out window mask
  let mskImage = msk.get();
  roomImage.mask(mskImage);
  // draw room overlay
  image(roomImage, 0, 0);
  // image(img, 0, 0, width, height)

}

function mousePressed() {
  let window = {
    x: mouseX - ww / 2,
    y: mouseY - wh / 2,
    w: ww,
    h: wh,
    glow: false,
    glowsLeft: numGlows,
    done: false,
  };

  if (numWindows > 0 && canPlaceWindow(window)) {
    // if (numWindows %2 == 0) {
    //   numGlows += 1;
    // }

    windows.push(window);
    numWindows -= 1;
    birds.setVolume(map(numWindows, initialWindows, 0, 0, 1));
    if (!birds.isPlaying()) {
      birds.loop();
    }
    drawRoom();

    if (numWindows == 0) {
      fadeGoogle();
      transition(states[0], states[1]);
    }
  }
}

function fadeGoogle() {

}

function transition(from, to) {
  console.log("TRANSITIONING");
  currColor = from.bg;
  targetColor = to.bg;

  transitionLeft = transitionTime;
  inTransition = true;
}

function finishTransition() {
  bg = targetColor;
  inTransition = false;
  intial = false;
}

function windowResized() {
  if (windowWidth > width || windowHeight > height) {
    resizeCanvas(Math.max(windowWidth, width), Math.max(windowHeight, height));
    drawRoom();
  }
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

