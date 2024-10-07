let domReplay = document.querySelector("#replay");
let domScore = document.querySelector("#score");
let domCanvas = document.createElement("canvas");
document.querySelector(".canvas").appendChild(domCanvas);
let ctx = domCanvas.getContext("2d");

const W = (domCanvas.width = 400);
const H = (domCanvas.height = 400);

let snake,
  food,
  currentHue,
  cells = 20,
  cellSize,
  isGameOver = false,
  score = 0,
  maxScore = window.localStorage.getItem("maxScore") || undefined,
  particles = [],
  splashingParticleCount = 20,
  cellsCount,
  requestID;

let helpers = {
  Vec: class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
    }
    mult(v) {
      if (v instanceof helpers.Vec) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
      } else {
        this.x = x;
        this.y = y;
        return this;
      }
    }
  },
  isCollision(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  },
  garbageCollector() {
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].size <= 0) {
        particles.splice(i, 1);
      }
    }
  },
  drawGrid() {
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = "#232323";
    ctx.shadowBlur = 0;
    for (let i = 1; i < cells; i++) {
      let f = (W / cells) * i;
      ctx.beginPath();
      ctx.moveTo(f, 0);
      ctx.lineTo(f, H);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, f);
      ctx.lineTo(W, f);
      ctx.stroke();
      ctx.closePath();
    }
  },
  randHue() {
    return ~~(Math.random() * 360);
  },
  hs12rgb(hue, saturation, lightness) {
    if (hue === undefined) {
      return [0, 0, 0];
    }
    var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    var huePrime = hue / 60;
    var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    huePrime = ~~huePrime;
    var red;
    var green;
    var blue;

    if (huePrime === 0) {
      red = chroma;
      green = secondComponent;
      blue = 0;
    } else if (huePrime === 1) {
      red = secondComponent;
      green = chroma;
      blue = 0;
    } else if (huePrime === 2) {
      red = 0;
      green = chroma;
      blue = secondComponent;
    } else if (huePrime === 3) {
      red = 0;
      green = secondComponent;
      blue = chroma;
    } else if (huePrime === 4) {
      red = secondComponent;
      green = 0;
      blue = chroma;
    } else if (huePrime === 5) {
      red = chroma;
      green = 0;
      blue = secondComponent;
    }

    var lightnessAdjustment = lightness - chroma / 2;
    red += lightnessAdjustment;
    green += lightnessAdjustment;
    blue += lightnessAdjustment;

    return [
      Math.round(red * 255),
      Math.round(green * 255),
      Math.round(blue * 255),
    ];
  },
  lerp(start, end, t){
    return start * (1-t)+end*t;
  }
};

let KEY ={
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    resetState(){
        this.ArrowUp = false;
        this.ArrowRight = false;
        this.ArrowDown = false;
        this.ArrowLeft = false;
    },
    listen(){
        addEventListener(
            "keydown",
            (e) => {
                if(e.key === "ArrowUp" && this.ArrowUp) return;
                if(e.key === "ArrowRight" && this.ArrowRight) return;
                if(e.key === "ArrowDown" && this.ArrowDown) return;
                if(e.key === "ArrowLeft" && this.ArrowLeft) return;
                this[e.key] = true;
                Object.keys(this).filter((f) => f !== e.key && f != "listen" && f != "resetState")
                .forEach((k) => {
                    this[k] = false;
                });
            },
            false
        );
    }
};

class Snake{
    
}