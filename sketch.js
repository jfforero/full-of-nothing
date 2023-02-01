// Todo está tan lleno de nada.
// Jorge Forero.
// 2023

let input_text;
let words;
let newPhrases = [];
let phrases = [];
let speech;
let playing = false;
let x_dim;
let y_dim;


function windowResized() {
  x_dim = windowWidth*0.75;
  y_dim = windowHeight*0.75;
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  x_dim = windowWidth*0.75;
  y_dim = windowHeight*0.75;
  createCanvas(x_dim, y_dim);
  
  let clearButton = createButton("Clear");
  clearButton.mousePressed(clearCanvas);
  clearButton.size (60, 25);
  clearButton.position(10,10);


  input_text = createInput("Todo está tan lleno de nada");
  input_text.changed(processWords);
  input_text.size (200, 20);
  input_text.position(80,10 );
  //let startButton = createButton("Start");
  //startButton.mousePressed(startSpeech);
  
  //let stopButton = createButton("Stop");
  //stopButton.mousePressed(stopSpeech);

  processWords();
  startSpeech();

  function processWords() {
    words = input_text.value().split(' ');
    newPhrases = [];

    for (let i = 0; i < words.length; i++) {
      let phrase = words[i];
      for (let j = i + 1; j < words.length; j++) {
        phrase += ' ' + words[j];
        newPhrases.push(phrase);
      }
    }

    speech = new p5.Speech();
  }

  function startSpeech() {
    playing = true;
  }

  function stopSpeech() {
    playing = false;
    speech.stop();
  }

  function clearCanvas() {
    phrases = [];
  }
}

function draw() {
  background(255);
  for (let i = phrases.length - 1; i >= 0; i--) {
    let mouse = createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(phrases[i].pos, mouse);
    let d = direction.mag();
    direction.normalize();
    d = constrain(d, 0, 50);
    let strength = (50 - d) * 0.01;
    direction.mult(strength);
    phrases[i].applyForce(direction);
    phrases[i].move();
    phrases[i].display();

    if (phrases[i].isOutOfCanvas()) {
      phrases.splice(i, 1);
    }
  }

  if (playing) {
    setTimeout(function () {
      let randomPhrase = newPhrases[floor(random(newPhrases.length))];
      speech.speak(randomPhrase);
      let p = new Phrase(randomPhrase);
      phrases.push(p);
    }, 5000);
  }
}

class Phrase {
  constructor(text) {
    this.text = text;
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.acc = createVector(0, 0);
    this.life = 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life++;
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -0.5;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -0.5;
    }
  }

  display() {
    text(this.text, this.pos.x, this.pos.y);
  }
}

function draw() {
  background(255);

  for (let i = phrases.length - 1; i >= 0; i--) {
    let mouse = createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(phrases[i].pos, mouse);
    let d = direction.mag();
    direction.normalize();
    d = constrain(d, 0, 50);
    let strength = (50 - d) * 0.01;
    direction.mult(strength);
    phrases[i].applyForce(direction);
    phrases[i].move();
    phrases[i].display();

    if (phrases[i].life > 400) {
      phrases.splice(i, 1);
    }
  }

  if (playing) {
    setTimeout(function () {
      let randomPhrase = newPhrases[floor(random(newPhrases.length))];
      speech.speak(randomPhrase);
      let p = new Phrase(randomPhrase);
      phrases.push(p);
    }, 5000);
  }
}





