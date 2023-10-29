let barriers = [];
let ray;
let particle;
const WIDTH = 1000, HEIGHT = 1000, NUM_BARS = 10;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < NUM_BARS; i++) {
    const x1 = random(WIDTH);
    const x2 = random(WIDTH);
    const y1 = random(HEIGHT);
    const y2 = random(HEIGHT);
    barriers[i] = new Barrier(createVector(x1, y1), createVector(x2, y2));
  }
}

function draw() {
  background(0);
  particle = new Particle(createVector(mouseX, mouseY));

  for (let i = 0; i < NUM_BARS; i++) {
    barriers[i].show();
  }

  particle.look(barriers);

}

// TODO: Add a slider to change the number of barriers
// TODO: Add a slider to change the number of rays