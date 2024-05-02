const INITIAL_VELOCITY = .03;
const VELOCITY_INCREASE = 0.00007
export default class Ball {
  constructor(balllElem) {
    this.balllElem = balllElem;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.balllElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.balllElem?.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.balllElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.balllElem?.style.setProperty("--y", value);
  }


  rect() {
    return this.balllElem?.getBoundingClientRect()
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELOCITY
  }
  update(delta, paddRects) {
    this.velocity = Math.abs(this.velocity)
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE
    if(this.velocity >= 0.15) {
      this.velocity = 0.09
      this.y = 50
      this.x = 50
      this.direction.x *= -1
      this.direction.y * -1
    }
    const rect = this.rect()

    if(rect?.bottom >= window.innerHeight || rect?.top <= 0) {
      this.direction.y *= -1
    }

    if(paddRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1
    }
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(r1, r2) {
return (
  r1.left <= r2.right &&
  r1.right >= r2.left &&
  r1.top <= r2.bottom &&
  r1.bottom >= r2.top
)
}