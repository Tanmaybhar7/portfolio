/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPT - TANMAY BHAR (ITSVG.IN AESTHETICS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. UI AUDIO SFX SYNTHESIZER
  // --------------------------------------------------------------------------
  let sfxEnabled = false;
  const sfxToggleBtn = document.getElementById('sfx-toggle');

  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxToggleBtn.classList.toggle('sfx-active', sfxEnabled);
      showToast(sfxEnabled ? 'UI Sound Effects enabled 🔊' : 'UI Sound Effects muted 🔇');
      if (sfxEnabled) playClickSynth(800, 0.05);
    });
  }

  function playClickSynth(freq = 600, duration = 0.04) {
    if (!sfxEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {
      // Ignore audio context errors
    }
  }

  // Play subtle SFX on interactive button clicks
  document.querySelectorAll('button, .pill-action-btn, .nav-a, .social-icon-btn').forEach(btn => {
    btn.addEventListener('click', () => playClickSynth(650, 0.03));
  });

  // --------------------------------------------------------------------------
  // 2. THEME TOGGLE SYSTEM (LIGHT / DARK MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 3. RADIO LOFI PLAYER WITH EQUALIZER ANIMATION & ACTIVE DOT
  // --------------------------------------------------------------------------
  const radioBtn = document.getElementById('radio-player-btn');
  const radioAudio = document.getElementById('radio-audio');
  const radioStatus = document.getElementById('radio-status');
  const eqBars = document.querySelectorAll('.eq-bar');
  let isPlayingRadio = false;

  if (radioBtn && radioAudio) {
    radioBtn.addEventListener('click', () => {
      if (!isPlayingRadio) {
        radioAudio.play().then(() => {
          isPlayingRadio = true;
          if (radioStatus) radioStatus.textContent = 'Playing Lofi';
          radioBtn.classList.add('is-playing');
          eqBars.forEach((bar, idx) => bar.classList.add(`eq-bar-${(idx % 3) + 1}`));
        }).catch(err => {
          console.log('Audio playback fallback triggered:', err);
          playSynthLoFi();
        });
      } else {
        radioAudio.pause();
        isPlayingRadio = false;
        if (radioStatus) radioStatus.textContent = 'Radio Lofi';
        radioBtn.classList.remove('is-playing');
        eqBars.forEach((bar, idx) => bar.classList.remove(`eq-bar-${(idx % 3) + 1}`));
      }
    });
  }

  function playSynthLoFi() {
    isPlayingRadio = !isPlayingRadio;
    if (radioStatus) radioStatus.textContent = isPlayingRadio ? 'Playing Lofi' : 'Radio Lofi';
    if (isPlayingRadio) {
      radioBtn.classList.add('is-playing');
      eqBars.forEach((bar, idx) => bar.classList.add(`eq-bar-${(idx % 3) + 1}`));
    } else {
      radioBtn.classList.remove('is-playing');
      eqBars.forEach((bar, idx) => bar.classList.remove(`eq-bar-${(idx % 3) + 1}`));
    }
  }

  // --------------------------------------------------------------------------
  // 4. AUDIO PRONUNCIATION / SPEECH SYNTHESIS
  // --------------------------------------------------------------------------
  const soundBtn = document.getElementById('sound-pronounce');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Tanmay Bhar");
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. LIVE CODE SNIPPET WIDGET SWITCHER & COPY TO CLIPBOARD
  // --------------------------------------------------------------------------
  const codeTabs = document.querySelectorAll('.code-tab');
  const codeContentBlock = document.getElementById('code-content-block');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  const snippets = {
    react: `<span class="code-kw">import</span> React <span class="code-kw">from</span> <span class="code-str">'react'</span>;

<span class="code-kw">export default function</span> <span class="code-fn">DeveloperProfile</span>() {
  <span class="code-kw">const</span> developer = {
    name: <span class="code-str">'Tanmay Bhar'</span>,
    role: <span class="code-str">'Full Stack & Mobile Engineer'</span>,
    techStack: [<span class="code-str">'React'</span>, <span class="code-str">'Node.js'</span>, <span class="code-str">'PHP'</span>, <span class="code-str">'MySQL'</span>],
    status: <span class="code-str">'Ready for high-impact projects'</span>
  };

  <span class="code-kw">return</span> (
    &lt;<span class="code-tag">div</span> <span class="code-attr">className</span>=<span class="code-str">"dev-card"</span>&gt;
      &lt;<span class="code-tag">h2</span>&gt;{developer.name}&lt;/<span class="code-tag">h2</span>&gt;
      &lt;<span class="code-tag">p</span>&gt;{developer.role}&lt;/<span class="code-tag">p</span>&gt;
    &lt;/<span class="code-tag">div</span>&gt;
  );
}`,
    node: `<span class="code-kw">const</span> express = <span class="code-fn">require</span>(<span class="code-str">'express'</span>);
<span class="code-kw">const</span> app = <span class="code-fn">express</span>();
<span class="code-kw">const</span> PORT = process.env.PORT || <span class="code-num">8080</span>;

app.<span class="code-fn">get</span>(<span class="code-str">'/api/developer'</span>, (req, res) =&gt; {
  res.<span class="code-fn">json</span>({
    developer: <span class="code-str">'Tanmay Bhar'</span>,
    skills: [<span class="code-str">'API Architecture'</span>, <span class="code-str">'Database Design'</span>, <span class="code-str">'Express'</span>],
    contact: <span class="code-str">'bhartanmay@gmail.com'</span>
  });
});

app.<span class="code-fn">listen</span>(PORT, () =&gt; console.<span class="code-fn">log</span>(<span class="code-str">\`Server active on port \${PORT}\`</span>));`,
    sql: `<span class="code-kw">CREATE TABLE</span> <span class="code-fn">projects</span> (
  id <span class="code-kw">INT AUTO_INCREMENT PRIMARY KEY</span>,
  title <span class="code-kw">VARCHAR</span>(<span class="code-num">255</span>) <span class="code-kw">NOT NULL</span>,
  category <span class="code-kw">VARCHAR</span>(<span class="code-num">100</span>) <span class="code-kw">NOT NULL</span>,
  developer <span class="code-kw">VARCHAR</span>(<span class="code-num">100</span>) <span class="code-kw">DEFAULT</span> <span class="code-str">'Tanmay Bhar'</span>,
  created_at <span class="code-kw">TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span>
);`
  };

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang');
      if (snippets[lang] && codeContentBlock) {
        codeContentBlock.innerHTML = snippets[lang];
      }
    });
  });

  if (copyCodeBtn && codeContentBlock) {
    copyCodeBtn.addEventListener('click', () => {
      const textToCopy = codeContentBlock.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Code snippet copied to clipboard! 📋');
      }).catch(err => console.error('Failed to copy code:', err));
    });
  }

  // --------------------------------------------------------------------------
  // 6. HIRE ME MODAL DIALOG
  // --------------------------------------------------------------------------
  const hireHeroBtn = document.getElementById('hire-me-hero-btn');
  const hireModal = document.getElementById('hire-modal');
  const hireModalClose = document.getElementById('hire-modal-close');

  if (hireHeroBtn && hireModal) {
    hireHeroBtn.addEventListener('click', () => {
      hireModal.classList.add('active');
    });
  }

  if (hireModalClose && hireModal) {
    hireModalClose.addEventListener('click', () => {
      hireModal.classList.remove('active');
    });
  }

  if (hireModal) {
    hireModal.addEventListener('click', (e) => {
      if (e.target === hireModal) hireModal.classList.remove('active');
    });
  }

  // --------------------------------------------------------------------------
  // 7. DOWNLOAD CV BUTTONS & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const cvNavBtn = document.getElementById('download-cv-nav-btn');
  const cvHeroBtn = document.getElementById('download-cv-hero-btn');

  function triggerCvDownload() {
    showToast('CV download initiated for Tanmay Bhar! 📄');
    const tempLink = document.createElement('a');
    tempLink.href = 'certificates/cert1.png';
    tempLink.download = 'Tanmay_Bhar_CV.pdf';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  if (cvNavBtn) cvNavBtn.addEventListener('click', triggerCvDownload);
  if (cvHeroBtn) cvHeroBtn.addEventListener('click', triggerCvDownload);

  function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 3200);
    }
  }

  // --------------------------------------------------------------------------
  // 8. DRAGGABLE TERMINAL WINDOW & INTERACTIVE CLI + QUICK ACTION CHIPS
  // --------------------------------------------------------------------------
  const terminalWindow = document.getElementById('terminal-window');
  const terminalHeader = document.getElementById('terminal-header');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (terminalWindow && terminalHeader) {
    makeElementDraggable(terminalWindow, terminalHeader);
  }

  function makeElementDraggable(elm, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      if (window.innerWidth < 768) return;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elm.style.top = (elm.offsetTop - pos2) + "px";
      elm.style.left = (elm.offsetLeft - pos1) + "px";
      elm.style.position = "relative";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Terminal Quick Chip Buttons
  document.querySelectorAll('.term-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeTerminalCommand(cmd);
    });
  });

  // Terminal Input Parser
  if (terminalInput && terminalBody) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        executeTerminalCommand(command);
        terminalInput.value = '';
      }
    });
  }

  function executeTerminalCommand(cmd) {
    if (!terminalBody || !terminalInput) return;
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    lineDiv.innerHTML = `<span class="terminal-prompt">tanmay@portfolio:~$</span> <span class="terminal-cmd">${escapeHTML(cmd)}</span>`;
    terminalBody.insertBefore(lineDiv, terminalInput.parentElement);

    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';

    switch(cmd) {
      case 'help':
        outputDiv.innerHTML = `Available Commands:
  • <span style="color:#fbc138">about</span>        - Display summary bio & profile
  • <span style="color:#fbc138">skills</span>       - List technical stack & languages
  • <span style="color:#fbc138">projects</span>     - Display featured projects
  • <span style="color:#fbc138">certificates</span> - List earned credentials
  • <span style="color:#fbc138">contact</span>      - View email & social links
  • <span style="color:#fbc138">whoami</span>       - Print current user session
  • <span style="color:#fbc138">date</span>         - Display current date and time
  • <span style="color:#fbc138">theme</span>        - Toggle between dark/light mode
  • <span style="color:#fbc138">clear</span>        - Clear terminal logs`;
        break;
      case 'about':
        outputDiv.textContent = `Tanmay Bhar | Full Stack Web & Mobile App Developer\nSpecialized in React, Node.js, PHP, MySQL, JavaScript, and Android app engineering. Currently pursuing BCA at Brainware University.`;
        break;
      case 'skills':
        outputDiv.textContent = `Frontend: React 19, Vite, JavaScript (ES6+), HTML5, CSS3, Bootstrap\nBackend & DB: Node.js, Express.js, PHP, MySQL, REST APIs\nTools: Git, GitHub, Android Ecosystem`;
        break;
      case 'projects':
        outputDiv.textContent = `1. MyTarakeswar (Tourism & Guide Platform)\n2. Pharmacy Stock & Expiry Tracker\n3. Skill Mapping & Gap Analysis System\n4. MySkyPulse Mobile Weather App`;
        break;
      case 'certificates':
        outputDiv.textContent = `1. Fundamentals of ML & AI (AWS Training & Certification)\n2. Web Development Internship (Prodigy InfoTech)\n3. Python Programming (Reliance Foundation Skilling Academy)\n4. Web Development Virtual Internship (CodSoft)\n5. Sustainable Computing Conference ICSCI 2025 (Brainware University)\n6. Software Engineering Job Simulation (Accenture)\n7. Events and Workflows Pre-assessment (AWS)\n8. Solutions Architecture Job Simulation (AWS / Forage)\n9. TCS iON Career Edge - IT for Non-IT (TCS / TATA)`;
        break;
      case 'contact':
        outputDiv.textContent = `Email: bhartanmay@gmail.com\nPhone: +91 7501228282\nGitHub: https://github.com/Tanmaybhar7\nLinkedIn: https://linkedin.com/in/tanmaybhar7`;
        break;
      case 'whoami':
        outputDiv.textContent = `visitor@tanmay-portfolio (Guest User)`;
        break;
      case 'date':
        outputDiv.textContent = new Date().toString();
        break;
      case 'theme':
        if (themeToggleBtn) themeToggleBtn.click();
        outputDiv.textContent = `Theme toggled to ${document.documentElement.getAttribute('data-theme')}`;
        break;
      case 'clear':
        const lines = terminalBody.querySelectorAll('.terminal-line, .terminal-output');
        lines.forEach(line => line.remove());
        return;
      case '':
        return;
      default:
        outputDiv.innerHTML = `<span style="color:#ef4444">Command not recognized: '${escapeHTML(cmd)}'. Type '<span style="color:#fbc138">help</span>' for available options.</span>`;
    }

    terminalBody.insertBefore(outputDiv, terminalInput.parentElement);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }

  // --------------------------------------------------------------------------
  // 9. PROJECT CATEGORY FILTER TABS & INSTANT SEARCH BAR
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const projectSearchInput = document.getElementById('project-search-input');
  const projectCards = document.querySelectorAll('.neo-card-wrapper');

  function applyProjectFilters() {
    const activeTab = document.querySelector('.filter-tab-btn.active');
    const filterValue = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const searchQuery = projectSearchInput ? projectSearchInput.value.toLowerCase().trim() : '';

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.neo-project-title')?.textContent.toLowerCase() || '';
      const cardSub = card.querySelector('.neo-project-sub')?.textContent.toLowerCase() || '';

      const matchesCategory = (filterValue === 'all' || categories.includes(filterValue));
      const matchesSearch = (!searchQuery || cardTitle.includes(searchQuery) || cardSub.includes(searchQuery) || categories.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (!matchesCategory || !matchesSearch) card.style.display = 'none';
        }, 200);
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyProjectFilters();
    });
  });

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', applyProjectFilters);
  }

  // --------------------------------------------------------------------------
  // 10. EXPERIENCE TIMELINE CATEGORY FILTER
  // --------------------------------------------------------------------------
  const timelineFilterBtns = document.querySelectorAll('.timeline-filter-btn');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  timelineFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const typeFilter = btn.getAttribute('data-timeline-filter');

      timelineNodes.forEach(node => {
        const nodeType = node.getAttribute('data-node-type');
        if (typeFilter === 'all' || nodeType === typeFilter) {
          node.style.display = 'block';
          node.style.opacity = '1';
        } else {
          node.style.opacity = '0';
          setTimeout(() => {
            if (!btn.classList.contains('active') || typeFilter !== 'all') {
              node.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 11. DEV VISA CARD 3D PARALLAX TILT & SHINE SWEEP
  // --------------------------------------------------------------------------
  const visaCard = document.getElementById('visa-card');
  if (visaCard) {
    visaCard.addEventListener('mousemove', (e) => {
      const rect = visaCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      visaCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    visaCard.addEventListener('mouseleave', () => {
      visaCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  }

  // --------------------------------------------------------------------------
  // 12. FLOATING SCROLL TO TOP WITH PROGRESS RING
  // --------------------------------------------------------------------------
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const progressCircle = document.getElementById('progress-ring-circle');

  if (scrollToTopBtn && progressCircle) {
    const circumference = 2 * Math.PI * 20; // r=20
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      const offset = circumference - (scrollPercent * circumference);

      progressCircle.style.strokeDashoffset = offset;

      if (scrollTop > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 13. CERTIFICATE LIGHTBOX MODAL DIALOG
  // --------------------------------------------------------------------------
  const certModal = document.getElementById('cert-lightbox-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalContainer = document.getElementById('cert-modal-view-container');

  const certDetails = {
    aws: {
      title: "Fundamentals of Machine Learning and Artificial Intelligence",
      issuer: "AWS Training & Certification • July 19, 2025",
      img: "certificates/cert1.png",
      details: "Completion Certificate awarded to Tanmay by AWS Training & Certification (Director: Michelle Vaz) for mastering Fundamentals of Machine Learning and Artificial Intelligence."
    },
    prodigy: {
      title: "Web Development Internship Certificate",
      issuer: "Prodigy InfoTech • Aug 25, 2025",
      img: "certificates/cert2.png",
      details: "Certificate of Completion awarded to Tanmay Bhar for successfully completing a 1-month internship from July 15 to August 15, 2025 in Web Development (CIN: PIT/JUL25/11138) at Prodigy InfoTech."
    },
    reliance: {
      title: "Python Programming Certificate of Completion",
      issuer: "Reliance Foundation Skilling Academy • July 01, 2025",
      img: "certificates/cert3.png",
      details: "Awarded to Tanmay Bhar for completing Python Programming (Certificate ID: RFSA000238280) by Reliance Foundation Skilling Academy."
    },
    codsoft: {
      title: "Web Development Virtual Internship Certificate",
      issuer: "CodSoft • Sept 28, 2025",
      img: "certificates/cert4.png",
      details: "Awarded to Tanmay Bhar for completing 4 weeks of virtual internship program in Web Development (C.ID: 034ef3b) with wonderful remarks at CodSoft."
    },
    icsci: {
      title: "International Conference Certificate of Participation (ICSCI 2025)",
      issuer: "Brainware University • May 24, 2025",
      img: "certificates/cert5.png",
      details: "Awarded to Tanmay Bhar for participating in the International Conference on Sustainable Computing for Industry (ICSCI 2025), hosted by Dept. of Computational Sciences & ECE, Brainware University."
    },
    accenture: {
      title: "Software Engineering Job Simulation Certificate",
      issuer: "Accenture (Forage) • June 30, 2025",
      img: "certificates/cert7.png",
      details: "Awarded to Tanmay Bhar by Accenture & Forage for completing practical tasks in System Architecture, Security, Programming, Testing, and Agile development (Verification: E7NpFuRPHg32Lr9tj)."
    },
    awsevents: {
      title: "Events and Workflows Pre-assessment Completion Certificate",
      issuer: "AWS Training & Certification • June 30, 2025",
      img: "certificates/cert8.png",
      details: "Completion Certificate awarded to Tanmay by AWS Training & Certification (Director: Michelle Vaz) for mastering AWS Events and Workflows Pre-assessment."
    },
    awssolutions: {
      title: "Solutions Architecture Job Simulation Certificate",
      issuer: "AWS (Forage) • June 29, 2025",
      img: "certificates/cert9.png",
      details: "Awarded to Tanmay Bhar by AWS & Forage for completing practical tasks in designing simple, scalable, hosting architecture (Verification: oCpaHSPvvDTYHyye7)."
    },
    tcsion: {
      title: "TCS iON Career Edge - IT for Non-IT Certificate of Achievement",
      issuer: "Tata Consultancy Services • July 05, 2025",
      img: "certificates/cert10.png",
      details: "Awarded to Tanmay Bhar by TCS iON (Global Delivery Head: Mehul Mehta) for completing TCS iON Career Edge covering IT Industry Overview, IT Job Tools, Industry Elements, and Trending Technologies (Cert ID: 8739-28521337-1016)."
    }
  };

  document.querySelectorAll('.cert-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = btn.getAttribute('data-type');
      const data = certDetails[type];
      if (data && certModal && certModalContainer) {
        certModalTitle.textContent = data.title;
        certModalContainer.innerHTML = `
          <div style="width: 100%; max-height: 480px; overflow: hidden; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); margin-bottom: 1.25rem;">
            <img src="${data.img}" alt="${data.title}" style="width: 100%; height: auto; display: block; object-fit: contain; max-height: 480px; background: #fff;" />
          </div>
          <p style="font-size: 0.95rem; color: var(--accent-yellow); font-weight: 700; margin-bottom: 0.5rem;">${data.issuer}</p>
          <p style="font-size: 0.9rem; color: #cbd5e1; max-width: 600px; line-height: 1.5; margin: 0 auto;">${data.details}</p>
        `;
        certModal.classList.add('active');
      }
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', () => certModal.classList.remove('active'));
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) certModal.classList.remove('active');
    });
  }

  // --------------------------------------------------------------------------
  // 14. PROJECT DETAILS MODAL DIALOG
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTech = document.getElementById('modal-project-tech');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  const modalGithubBtn = document.getElementById('modal-github-btn');
  const modalClose = document.getElementById('modal-close-btn');

  const projectData = {
    mytarakeswar: {
      title: "MyTarakeswar - Tourism & Guide Platform",
      desc: "A complete tourism guide platform featuring destination information, hotel listings, restaurant listings, temple history, maps, authentication, admin dashboard and database integration.",
      tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "MySQL", "Express.js"],
      demo: "#",
      github: "https://github.com/Tanmaybhar7/MyTarakeswar"
    },
    pharmacy: {
      title: "Pharmacy Stock & Expiry Tracker",
      desc: "Comprehensive inventory management system for pharmacies with stock monitoring, automated expiry alerts, medicine management and reporting dashboard.",
      tech: ["React", "Vite", "JavaScript", "PHP", "MySQL"],
      demo: "#",
      github: "https://github.com/Tanmaybhar7"
    },
    skillgap: {
      title: "Skill Mapping & Gap Analysis System",
      desc: "Web platform that analyzes employee/student skills, compares them with required competencies and generates personalized skill gap reports.",
      tech: ["React", "Vite", "JavaScript", "PHP", "MySQL"],
      demo: "#",
      github: "https://github.com/Tanmaybhar7"
    },
    myskypulse: {
      title: "MySkyPulse Mobile Weather App",
      desc: "Modern weather application with elegant mobile UI, real-time forecasts, weather insights, interactive animations, and REST API integration.",
      tech: ["Android App", "Mobile UI", "JavaScript", "REST API"],
      demo: "#",
      github: "https://github.com/Tanmaybhar7"
    }
  };

  document.querySelectorAll('.neo-card-wrapper').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      const data = projectData[key];
      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalTech.innerHTML = data.tech.map(t => `<span class="pill-badge pill-trends" style="font-size:0.75rem">${t}</span>`).join(' ');
        if (modalDemoBtn) modalDemoBtn.href = data.demo;
        if (modalGithubBtn) modalGithubBtn.href = data.github;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 15. REAL EMAIL SENDING HANDLER (FormSubmit AJAX + Fallback)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const contactBtn = document.getElementById('contact-submit-btn');
  const contactStatus = document.getElementById('contact-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) return;

      if (contactBtn) {
        contactBtn.disabled = true;
        contactBtn.style.opacity = '0.7';
        contactBtn.innerHTML = `
          <span>Sending Message...</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
          </svg>
        `;
      }

      if (contactStatus) {
        contactStatus.style.display = 'block';
        contactStatus.style.color = 'var(--accent-yellow)';
        contactStatus.textContent = 'Sending message to bhartanmay@gmail.com...';
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/bhartanmay@gmail.com', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `⚡ Portfolio Contact Message from ${name}`
          })
        });

        const result = await response.json();

        if (response.ok || result.success === 'true' || result.success === true) {
          if (contactStatus) {
            contactStatus.style.color = '#10B981';
            contactStatus.innerHTML = `
              <span style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" fill="rgba(16, 185, 129, 0.15)"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                Message sent successfully! Tanmay will receive it in bhartanmay@gmail.com.
              </span>
            `;
          }
          contactForm.reset();
        } else {
          throw new Error('FormSubmit API response failed');
        }
      } catch (err) {
        console.warn('FormSubmit API fallback triggered:', err);
        const mailtoUrl = `mailto:bhartanmay@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        window.location.href = mailtoUrl;

        if (contactStatus) {
          contactStatus.style.color = '#10B981';
          contactStatus.innerHTML = '✉️ Opening email client to send to bhartanmay@gmail.com...';
        }
      } finally {
        if (contactBtn) {
          contactBtn.disabled = false;
          contactBtn.style.opacity = '1';
          contactBtn.innerHTML = `
            <span>Send Message</span>
            <svg class="icon-rocket-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-1.5 1.76-2.34L17.5 8.91a2.828 2.828 0 0 0-4-4L5.26 13.16c-.84.5-1.63 1.05-2.34 1.76z"/>
              <path d="M15 9l-1 1M9 15l-1 1M14 4l5 5"/>
            </svg>
          `;
        }
      }
    });
  }

});
