window.addEventListener('load', () => {
    const textContainer = document.querySelector('.cinematic-text');
    const curtainContainer = document.querySelector('.curtain-container');
    const text = "SREEVALS R";
    const letters = [];

    // --- Setup Text ---
    textContainer.innerHTML = '';
    [...text].forEach(char => {
        const box = document.createElement('div');
        box.classList.add('letter-box');

        const span = document.createElement('span');
        span.classList.add('letter');
        span.textContent = char === ' ' ? '\u00A0' : char;

        box.appendChild(span);
        textContainer.appendChild(box);
        letters.push({ box, span });
    });

    // --- Setup Curtain Strips ---
    const numStrips = letters.length;
    const strips = [];
    for (let i = 0; i < numStrips; i++) {
        const strip = document.createElement('div');
        strip.classList.add('strip');
        curtainContainer.appendChild(strip);
        strips.push(strip);
    }

    // --- Timeline ---
    const staggerTime = 80;
    const holdTime = 800;

    // 1. Start Entrance Animation (Letters)
    letters.forEach((item, index) => {
        setTimeout(() => {
            item.span.classList.add('enter');
        }, index * staggerTime);
    });

    const totalEntranceTime = (letters.length * staggerTime) + 800;

    // 2. Schedule Exit Animation (Synchronized)
    setTimeout(() => {
        const curtainStagger = 60;
        const count = Math.max(letters.length, strips.length);

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                if (strips[i]) strips[i].classList.add('exit');
                if (letters[i]) letters[i].box.classList.add('exit');
            }, i * curtainStagger);
        }

        const totalCurtainTime = (count * curtainStagger) + 1200;

        setTimeout(() => {
            const container = document.getElementById('intro-container');
            container.style.display = 'none';
        }, totalCurtainTime);

    }, totalEntranceTime + holdTime);


    // --- Sidebar Toggle Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarClose = document.getElementById('sidebarClose');

    if (menuToggle && sidebarMenu && sidebarClose) {
        menuToggle.addEventListener('click', () => {
            sidebarMenu.classList.add('active');
        });

        sidebarClose.addEventListener('click', () => {
            sidebarMenu.classList.remove('active');
        });
    }

    // --- Snowfall Animation ---
    const canvas = document.getElementById('snowCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 2 + 0.5; // Size 0.5 to 2.5
                this.speedY = Math.random() * 1 + 0.5; // Speed 0.5 to 1.5
                this.speedX = Math.random() * 0.5 - 0.25; // Drift
                this.alpha = Math.random() * 0.5 + 0.3; // Opacity
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                if (this.y > height) {
                    this.y = -10;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const particleCount = 100; // Density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        initParticles();
        animate();
    }

});
