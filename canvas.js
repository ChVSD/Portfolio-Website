let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let maxR = 40;

let colorArr = [
    '#026E81',
    '#00ABBD',
    '#FF9933',
    '#0099DD',
    '#A1C7E0'
];

window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
})

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minR = r;
    // this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.color = '#dadada';
    // this.color = 'rgba(208, 208, 208, 0.5)';
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.r > innerWidth || this.x - this.r < 0)
        {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0)
        {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
        {
            if (this.r < maxR)
            {
                this.r += 1;
            }
        }
        else if (this.r > this.minR)
        {
            this.r -= 1;
        }

        this.draw();
    }
}

let circleArr = [];

function init() {
    circleArr = [];
    for (let i = 0; i < 400; i++)
    {
        let r = Math.random() * 8 + 1;
        let x = Math.random() * (window.innerWidth - r * 2) + r;
        let y = Math.random() * (window.innerHeight - r * 2) + r;
        let dx = Math.random() - 0.5;
        let dy = Math.random() - 0.5;
        circleArr.push(new Circle(x, y, dx, dy, r));
    }
}

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArr.length; i++)
    {
        circleArr[i].update();
    }
}

init();
animate();
