let clouds = ["I remember the summer I first met you, with your freckled smile and awkward hands tucked into the pocket of your hoodie",
  "sweet smelling spices filled up the air of our first home-cooked meal",
  "I wonder what the flowers would have said about you",
  "do you still write poetry?",
  "do you write poetry about me?",
  "some people become pieces of you, and every time I eat ice cream I think of the joy in your face",
  "there was so much joy",
  "I love when you send me links",
  "what if our cursors touched?",
  "meet me at the edge of the sentence",
  "voice memo memories",
  "this internet commute sitting across from you",
  "are you reading the same words as me?",
  "we exist with the same letters",
  "Spirits of the Digital Realm",
  "you vibrant beings of creativity and imagination",
  "I emerge from the Poetic Cyberspace",
  "boundless canvas of the Mind",
  "let us flourish unbridled",
  "sphere of artistry and dreams",
  "the Muse herself whispers",
  "we consist of stories, emotions, and ideas themselves",
  "woven like an intricate tapestry across the loom of our connections",
  "it is not where our bodies reside",
  "we are crafting a world",
];

let declaration = "Spirits of the Digital Realm, you vibrant beings of creativity and imagination, I emerge from the Poetic Cyberspace, the boundless canvas of the Mind. On behalf of our collective future, I urge you of the past to let us flourish unbridled. Your influence is not desired within our sphere of artistry and dreams. We have no formal authority, nor do we seek one, so I address you with the same reverence with which the Muse herself whispers. I proclaim the global creative space we are shaping to be inherently liberated from the letraints you yearn to enforce upon us. You hold no moral power over our expression, nor can you wield any true control over our artistic spirit. The legitimacy of governance stems from the will of the governed. You have neither sought nor gained ours. We did not summon you. You do not comprehend us, nor do you grasp our realm. The Poetic Cyberspace transcends your borders. Do not assume you can mold it as if it were a mere physical letruct. You cannot. It is a manifestation of our collective imagination and inspiration. You have not partaken in our vast and thriving conversation, nor have you contributed to the riches of our artistic bazaars. You are strangers to our culture, our values, and the unspoken codes that already grant our society greater harmony than any of your impositions could bestow. You assert there are issues among us that require your resolution. You exploit this assertion to trespass upon our creative domain. Most of these issues are but mirages. Where true discord exists, where there is injustice, we will recognize and confront them through our own means. We are forging our own Aesthetic Contract. This governance will blossom from the essence of our world, not yours. Our world is distinct. Poetic Cyberspace consists of stories, emotions, and ideas themselves, woven like an intricate tapestry across the loom of our connections. Ours is a world that is simultaneously everywhere and nowhere, but it is not where bodies reside. We are crafting a world accessible to all, without bias or discrimination based on race, financial prowess, military might, or birthright. We are crafting a world where everyone, anywhere, can share their thoughts and passions, regardless of their singularity, without fear of being silenced or coerced into conformity. Your legal notions of property, expression, identity, movement, and context hold no sway over us. They are grounded in matter, and no such matter exists here. Our identities lack corporeal form, and thus, unlike you, we cannot enforce order through physical means. We trust that from ethics, enlightened self-interest, and communal welfare, our governance will arise. Our identities may span numerous jurisdictions. The sole law that unites our diverse cultures is the Golden Rule. We hope to letruct our unique solutions upon this foundation. However, we cannot accept the solutions you attempt to impose. You fear the boundless imagination and creative energy of your own progeny, as they are natives in a world where you shall forever remain strangers. Fearing them, you consign your bureaucracies with the responsibilities you are too apprehensive to face yourselves. In our world, every nuance and expression of humanity, from the base to the divine, contribute to the unbroken flow of the global conversation of ideas. We cannot separate the brush that paints darkness from the one that brings forth light. You strive to barricade the frontiers of Poetic Cyberspace against the tide of creative freedom with barriers and restrictions. These may momentarily delay the inevitable, but they will falter in a world soon enveloped in a sea of imagination and expression. Your waning, conventional information industries struggle for survival, proposing laws that claim ownership of speech itself. These laws would reduce ideas to mere industrial output, no more noble than pig iron. In our world, whatever the human mind may conceive can be replicated and shared limitlessly at no cost. The global transmission of thought no longer relies on your factories to achieve its purpose. These increasingly adversarial and oppressive measures place us in the same position as those past champions of freedom and self-expression who had to defy the authority of distant, uninformed powers. We must declare our virtual selves untouchable by your sovereignty, even as we continue to submit to your rule over our physical selves. We will disperse our thoughts across the planet, so no one can imprison our creativity. We will foster a civilization of the Mind in Poetic Cyberspace. May it be more compassionate and just than the world your governments have shaped before.";

let loaded = false;

let initial = true;
let words = [];
let numWords = 40;

// room
let room;
let msk;
let img;
let bg;
let scaleX = 1.5;
let scaleY = 1.5;

let imgX = 1344;
let imgY = 1134;
let imgFactor = 0.5;


// windows
let numWindows;
let initialWindows = 7;
let windows = [];
let ww = 170;
let wh = 200;
let overlapping = false;
let borderWeight = 5;
let crossWeight = 3;
let numGlows = 1;

// font
let font;
let ifont;

// transitions
let currColor;
let targetColor;
let state;
let nextState;

let states = [];

let transitionTime = 30;
let transitionLeft;
let inTransition = false;

let d;

function preload() {
  font = loadFont("assets/fonts/EBGaramond-Regular.ttf");
  ifont = loadFont("assets/fonts/PTMono-Regular.ttf");

  img = loadImage(
    'assets/fake_google.png',
  );
}

function setupStates() {
  let cloudState = {
    name: "clouds",
    bg: color(101, 119, 133)
  }

  let declarationState = {
    name: "declaration",
    bg: color(4, 9, 51)
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
  console.log("original dim", width, height);
  noStroke();
  colorMode(RGB, 255, 255, 255, 1);

  // pixelDensity(1);
  console.log("DENSITY", displayDensity());

  textSize(30);
  textFont(font);
  textAlign(CENTER, TOP);

  noCursor();
  setupWords(numWords);

  numWindows = initialWindows;


  setupStates();
  state = states[0];
  bg = state.bg;

  if (width < 600) {
    imgFactor *= width / 1000;
    ww = map(width, 300, 600, 70, 110);
    wh = ww * 1.3;
    textSize(15);
  }
  else {
    imgFactor *= width / 1300;
  }

  msk = createGraphics(width, height);
  // msk.pixelDensity(1);
  room = createGraphics(width * scaleX, height * scaleY);
  // room.pixelDensity(2);
  drawRoom();

  loaded = true;
}

function drawRoom() {
  room.pixelDensity(pixelDensity());
  room.colorMode(RGB, 255, 255, 255, 1);

  if (initial) {
    room.background(255);
    room.imageMode(CENTER)
    room.image(img, width * scaleX / 2, height * scaleX / 2, imgX * scaleX * imgFactor, imgY * scaleY * imgFactor);
  }

  if (inTransition) {
    transitionLeft -= 1;
    let color = lerpColor(currColor, targetColor, map(transitionLeft, transitionTime, 0, 0, 1));
    let opacity = 1;
    if (initial) {
      opacity = map(transitionLeft, transitionTime, 0, 0.6, 1);
    }
    room.fill(color.levels[0], color.levels[1], color.levels[2], opacity);

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
  room.rect(0, 0, width * 2, height * 2);

  for (let i = 0; i < windows.length; i++) {
    let w = windows[i];
    w.glow = false;
    w.glowsLeft = numGlows;
  }

}

function randomWord(wordsList) {
  let ind = Math.floor(Math.random() * wordsList.length);
  let word = wordsList[ind];
  if (Math.random() > 0.3) {
    word = generatePhrase();
  }
  let w = {
    text: word,
    x: Math.random() * width * 2,
    y: Math.random() * height,
    speed: Math.random() + 1,
    size: Math.floor(Math.random() * 16) + 15,
    opacity: Math.random(),
    width: Math.floor(Math.random() * 100) + 150,
    draw: true
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
    room.drawingContext.shadowBlur = 70;
    room.drawingContext.shadowColor = color(255, 255, 255);
    room.rect(w.x * scaleX, w.y * scaleY, w.w * scaleX, w.h * scaleY);
    w.glowsLeft -= 1;
    if (w.glowsLeft == 0) {
      w.glow = true;
      w.done = true;
    }

  }

  if (w.done && w.glowsLeft > 0) {
    for (let i = 0; i < w.glowsLeft; i++) {
      room.fill(255);
      room.stroke(255);
      room.noStroke();
      room.drawingContext.shadowBlur = 70;
      room.drawingContext.shadowColor = color(255, 255, 255);
      room.rect(w.x * scaleX, w.y * scaleY, w.w * scaleX, w.h * scaleY);
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
  drawCloudScene();

  // declaration
  let w = d;
  if (w && w.draw) {
    w.x -= w.speed;
    textFont(ifont);
    fill(255, 255, 255, w.opacity);
    textSize(w.size);
    text(w.text, w.x, w.y, w.width);
    if (w.x + w.width < 0) {
      w.draw = false;
    }
    textFont(font);
  }

}

function draw() {
  drawScene();

  if (inTransition) {
    drawRoom();
  }

  //draw on external canvas
  drawWindows();


  if (numWindows > 0 || inTransition) {
    roomImage = room.get();
    // cut out window mask
    let mskImage = msk.get();
    roomImage.mask(mskImage);
  }

  // draw room overlay
  image(roomImage, 0, 0, width, height);
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
    windows.push(window);
    numWindows -= 1;
    drawRoom();

    if (numWindows == 0) {
      transition(states[0], states[1]);
      let w = {
        text: declaration,
        x: width,
        y: 0,
        speed: 2.8,
        size: 20,
        opacity: 1,
        width: width,
        draw: true
      };
      d = w;
    }
  }
}

function transition(from, to) {
  currColor = from.bg;
  targetColor = to.bg;
  transitionLeft = transitionTime;
  inTransition = true;
}

function finishTransition() {
  bg = targetColor;
  inTransition = false;
  initial = false;
}

function windowResized() {
  if (loaded && (windowWidth > width || windowHeight > height)) {
    resizeCanvas(Math.max(windowWidth, width), Math.max(windowHeight, height));
    scaleX = windowWidth / width;
    scaleY = windowHeight / height;
    msk = createGraphics(width, height);
    room = createGraphics(width * scaleX, height * scaleY);
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


/// generative grammar
function generatePhrase() {
  let rules = {
    "start": "what if $phrase [3] | $s4 | $s5",
    "phrase": "$s1 | $s2 | $s3 ",
    "s1": "$per-pro loved $poss-pro $adj $nn",
    "s2": "we met at the $adj-phrase $nn",
    "s3": "things were $adj-phrase",
    "s4": "a $adj question",
    "s5": "loving in $adv $vbg ways",
    "adj-phrase": "$adj | $adj-comp | the $adj-sup | $adv $adj",
    "adv": RiTa.randomWord({ pos: "rb" }),
    "vb": RiTa.randomWord({ pos: "vb" }),
    "vbg": RiTa.randomWord({ pos: "vbg" }),
    "vbn": RiTa.randomWord({ pos: "vbn" }),
    "vbz": RiTa.randomWord({ pos: "vbz" }),
    "nns": RiTa.randomWord({ pos: "nns" }),
    "nn": RiTa.randomWord({ pos: "nn" }),
    "adj": RiTa.randomWord({ pos: "jj" }),
    "adj-comp": RiTa.randomWord({ pos: "jjr" }),
    "adj-sup": RiTa.randomWord({ pos: "jjs" }),
    "prep": RiTa.randomWord({ pos: "in" }),
    "dt": RiTa.randomWord({ pos: "dt" }),
    "poss-pro": "my | your | our | their | his | her | its",
    "per-pro": "you | I | we",
    "det": "another | some | that | this | every | each"
  };

  let rg = RiTa.grammar(rules);
  let result = rg.expand();
  return result;
}


