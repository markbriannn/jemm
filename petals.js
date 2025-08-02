const canvas = document.getElementById("petalCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petals = [];

function Petal() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * -canvas.height;
  this.size = 10 + Math.random() * 10;
  this.speed = 1 + Math.random() * 2;
  this.wind = -0.5 + Math.random();

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 105, 180, 0.7)";
    ctx.fill();
  };

  this.update = function () {
    this.y += this.speed;
    this.x += this.wind;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (petals.length < 100) petals.push(new Petal());
  petals.forEach((petal) => petal.update());
  requestAnimationFrame(animate);
}
animate();
