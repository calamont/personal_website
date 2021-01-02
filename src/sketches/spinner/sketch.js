import Spinner from "./Spinner"

const sketch = (s) => {

  var Engine = window.Matter.Engine,
    // Render = window.Matter.Render,
    World = window.Matter.World,
    Bodies = window.Matter.Bodies;

  var engine;
  var world;
  var spinners = [];
  var mConstraint;
  var filled;
  let dragged;


  s.setup = () => {
    let canvas = s.createCanvas(800, 400);
    filled = false;
    dragged = true;
    // create an engine
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 3;
    Engine.run(engine);

    for (let i = 200; i > 0; i -= 5) {
      spinners.push(new Spinner(400, 200, i, i, world))
    }
    World.add(world, spinners)

    // Connect spinner objects together
    for (let i = 1; i < spinners.length; i++) {
      let options = {
        bodyA: spinners[i - 1].body,
        bodyB: spinners[i].body,
        length: 0,
        stiffness: 0.1,
        damping: 0
      }
      let constraint = window.Matter.Constraint.create(options)
      World.add(world, constraint)
    }

    let canvasMouse = window.Matter.Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = s.pixelDensity();
    let options = {
      mouse: canvasMouse
    }
    mConstraint = window.Matter.MouseConstraint.create(engine, options)
    World.add(world, mConstraint)
  };

  s.mouseClicked = () => {
    if (!dragged) {
      filled = !filled;
    }
    dragged = false;
  }

  s.mouseDragged = () => {
    dragged = true;
  }

  s.draw = () => {
    s.background(255);
    for (let i = 0; i < spinners.length; i++) {
      spinners[i].show(s, filled)
    }

    if (mConstraint.body) {
      console.log("anothes")
    }
  };
};

// let myp5 = new window.p5(sketch);

export default sketch;
