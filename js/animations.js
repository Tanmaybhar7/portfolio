/* ==========================================================================
   ANIMATIONS & INTERACTIVES ENGINE (ULTRA SMOOTH)
   IntersectionObserver, 3D Card Tilt, Counter Animations, Skill Bars, Confetti
   ========================================================================== */

// 1. Scroll Reveal Animations with IntersectionObserver
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        const counters = entry.target.querySelectorAll('.stat-number');
        if (counters.length > 0) {
          counters.forEach(counter => animateCounter(counter));
        }

        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        if (skillBars.length > 0) {
          skillBars.forEach(bar => {
            const val = bar.getAttribute('data-percent');
            bar.style.width = val + '%';
          });
        }
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

// 2. Animated Number Counters with Smooth Ease-Out Curve
function animateCounter(counterEl) {
  if (counterEl.classList.contains('counted')) return;
  counterEl.classList.add('counted');

  const target = parseInt(counterEl.getAttribute('data-target') || counterEl.innerText, 10);
  const suffix = counterEl.getAttribute('data-suffix') || '';
  const duration = 1800;
  const stepTime = 25;
  const totalSteps = duration / stepTime;
  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / totalSteps;
    const currentVal = Math.floor(target * Math.sin(progress * Math.PI / 2));
    counterEl.innerText = currentVal + suffix;

    if (currentStep >= totalSteps) {
      counterEl.innerText = target + suffix;
      clearInterval(timer);
    }
  }, stepTime);
}

// 3. 3D Tilt Card Hover Effect with Inertia
function init3DTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    let requestID;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      if (requestID) cancelAnimationFrame(requestID);
      requestID = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (requestID) cancelAnimationFrame(requestID);
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

// 4. Confetti Launcher FX
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#00f2fe', '#7000ff', '#4facfe', '#00ff9d', '#f43f5e'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  let startTime = Date.now();
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (Date.now() - startTime < 2200) {
      requestAnimationFrame(draw);
    } else {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  }
  draw();
}

window.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  init3DTiltCards();
});
