let barriers = [];
let ray;
let particle;
let offset = 0;
let pos;
const vel = 5;
const WIDTH = 2000, HEIGHT = 1000, NUM_BARS = 5;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < NUM_BARS; i++) {
    const x1 = random(WIDTH / 2);
    const x2 = random(WIDTH / 2);
    const y1 = random(HEIGHT);
    const y2 = random(HEIGHT);
    barriers[i] = new Barrier(createVector(x1, y1), createVector(x2, y2));
    pos = createVector(10, 10);
  }
  particle = new Particle(pos, 720, WIDTH / 2, HEIGHT);
}

function draw() {
  background(0);

  for (let i = 0; i < NUM_BARS; i++) {
    barriers[i].show();
  }

  fill(255, 50, 255);
  line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
  particle.look(barriers);
  particle.render_rays();

}

// TODO: Add a slider to change the number of barriers
// TODO: Add a slider to change the number of rays