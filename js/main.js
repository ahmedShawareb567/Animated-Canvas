
let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    bubble,
    bubbles,
    ch,
    cw,
    i,
    g,
    mouse;

    //MOUSE DIMENSTIONS
    mouse = {
        x: 'undefined',
        y: 'undefined'
    };

    //BUBBLES ARRAY
    bubbles = [];

    //GET CANVAS WIDTH && HEIGHT
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;

    //WIDTH && HEIGHT WHEN RESIZE WINDOW
    window.addEventListener('resize', () => {
        cw = canvas.width = window.innerWidth;
        ch = canvas.height = window.innerHeight;
    });

    //CLASS BUBBLE
    bubble = function (x, y, r, vx, vy){

        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.color = "#ff7315";
        this.current = r;

        //DRAW CANVAS
        this.draw = () => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.5;
            ctx.arc(this.x, this.y, this.r, 0 , 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        };
        
        //UPDATE CANVAS
        this.update = () => {

            if (this.x + this.vx > cw - this.r || this.vx + this.x < this.r) {
                this.vx = -this.vx;
            }
            if (this.y + this.vy > ch - this.r || this.vy + this.y < this.r) {
                this.vy = -this.vy;
            }
            if (mouse.x - this.x < 100 && mouse.x - this.x > -100
                && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
                    if (this.r > 20) {
                        this.r -= 1;
                    }
                } else {
                    if (this.r < this.current) {
                        this.r += 1;
                    }
                }
            this.x += this.vx;
            this.y += this.vy;
            //CALL DRAW FUNCTION
            this.draw();
        };
    };

    //GENERATE BUBBLES
    (function generateFun() {
        for (i = 0; i < 10; i++) {

            let x  = Math.random() * cw,
                y  = Math.random() * ch,
                r  = Math.random() * 100,
                vx = Math.random(),
                vy = Math.random();
                bubbles.push(new bubble(x, y, r, vx, vy));
        }
    }());

    //ANIMATED BUBBLES :)..|| ::(
    (function animatedFunc(){
        ctx.clearRect(0, 0, cw, ch);
        for (h = 0; h <bubbles.length; h++) {
            bubbles[h].update();
        }
        requestAnimationFrame(animatedFunc);
    }());

    //CANVAS DIMENSIONS
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });