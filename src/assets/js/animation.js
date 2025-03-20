const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particleArray = [];
let hue = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.size = Math.random() * 5 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

        if (this.size > 0.2) this.size -= 0.01;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = particleArray[i].size / 10;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }

        if (particleArray[i].size <= 0.5) {
            particleArray.splice(i, 1);
            i--;
        }
    }
}

// Generate new particles every few seconds
setInterval(() => {
    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
}, 350);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate);
}

createParticles();
animate();
