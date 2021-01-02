// Matter = window.Matter;

class Spinner {

  Matter = window.Matter;

  constructor(x, y, w, h, world) {
    this.body = window.Matter.Bodies.rectangle(x, y / 2, w, h);
    this.body.collisionFilter.group = -1;
    this.body.friction = 0;
    this.body.frictionAir = 0.01;
    this.body.frictionStatic = 0;
    this.w = w;
    this.h = h;
    // window.Matter.World.add(world, this.body)

    let options = {
      pointA: { x: x, y: y / 2 },
      bodyB: this.body,
      pointB: { x: -(w / 2), y: (-h / 2) },
      length: 0,
      stiffness: 0.9
    }
    this.constraint = window.Matter.Constraint.create(options);
    window.Matter.World.add(world, [this.body, this.constraint])
  }

  show = function (s, filled) {
    let pos = this.body.position;
    let angle = this.body.angle;

    s.push();
    s.translate(pos.x, pos.y);
    s.rotate(angle);
    s.rectMode(s.CENTER);
    if (filled) {
      s.fill(153, 0, 0, 5);
      s.strokeWeight(0);
    } else {
      s.fill(255, 0);
      s.strokeWeight(1);
    }
    s.rect(0, 0, this.w, this.h);
    s.pop();
  }
}

export default Spinner;
