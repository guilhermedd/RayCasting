let barriers = [];
let ray;
let particle;
const WIDTH = 2000, HEIGHT = 1000, NUM_BARS = 10;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < NUM_BARS; i++) {
    const x1 = random(WIDTH/2);
    const x2 = random(WIDTH/2);
    const y1 = random(HEIGHT);
    const y2 = random(HEIGHT);
    barriers[i] = new Barrier(createVector(x1, y1), createVector(x2, y2));
  }
}

function draw() {
  background(0);
  let pos = (mouseX <= WIDTH/2)? createVector(mouseX, mouseY) : createVector(WIDTH/2, mouseY);
  particle = new Particle(pos, 360, WIDTH/2);
  
  for (let i = 0; i < NUM_BARS; i++) {
    barriers[i].show();
  }
  
  particle.look(barriers);
  particle.render_rays();
  line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);

}

// TODO: Add a slider to change the number of barriers
// TODO: Add a slider to change the number of rays