export default class Paddle {
  constructor(PaddleElem) {
    this.PaddleElem = PaddleElem;
    this.reset();
    this.speed = 0.003
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.PaddleElem).getPropertyValue("--position")
    );
  }

  rect() {
    return this.PaddleElem?.getBoundingClientRect();
  }

  set position(value) {
    this.PaddleElem?.style.setProperty("--position", value);
  }
  reset() {
    this.position = 50;
  }
  update(delta, ballH) {
    this.position += this.speed * delta * (ballH - this.position)
  }
}
