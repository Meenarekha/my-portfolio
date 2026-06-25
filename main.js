// ===== CERTIFICATE FILE MAP =====
// For each cert, provide EITHER:
//   - An image path: 'certificates/nptel.jpg'  (shows in modal)
//   - A PDF path:   'certificates/nptel.pdf'   (opens in new tab)
// Create a folder called "certificates" and put your files inside.
const certFiles = {
    'cert-nptel':   { type: 'pdf',   path: 'Certificates/Big Data Computing.pdf' },
    'cert-tata':    { type: 'pdf', path: 'Certificates/Gen AI powered Data Analytics.pdf' },
    'cert-guvi':    { type: 'image', path: 'Certificates/Gen AI.png' },
    'cert-infosys': { type: 'pdf',   path: 'Certificates/SQL Developer.pdf' },
    'cert-coursera': { type: 'pdf',   path: 'Certificates/Software Engineering Essentials.pdf' },
    'cert-spectov': { type: 'image',   path: 'Certificates/Meena E .png' },
    // Add more below as you add new cert cards:
    // 'cert-aws': { type: 'pdf', path: 'certificates/aws.pdf' },
};

// ===== CERTIFICATE MODAL =====
function openCert(id) {
    const cert = certFiles[id];

    if (!cert) {
        // No file mapped yet — show fallback modal
        showCertFallback();
        return;
    }

    if (cert.type === 'pdf') {
        // PDFs open in a new browser tab
        window.open(cert.path, '_blank');
        return;
    }

    // Images open in the modal
    const modal    = document.getElementById('certModal');
    const img      = document.getElementById('certModalImg');
    const fallback = document.getElementById('certModalFallback');
    img.src = cert.path;
    img.style.display = 'block';
    fallback.style.display = 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function showCertFallback() {
    const modal    = document.getElementById('certModal');
    const img      = document.getElementById('certModalImg');
    const fallback = document.getElementById('certModalFallback');
    img.src = '';
    img.style.display = 'none';
    fallback.style.display = 'block';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCert(e) {
    if (e.target === document.getElementById('certModal')) {
        closeCertBtn();
    }
}
function closeCertBtn() {
    document.getElementById('certModal').classList.remove('open');
    document.body.style.overflow = '';
}
// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertBtn();
});

// ===== VIDEO PLAY OVERLAY =====
function playVideo(overlayEl) {
    const wrapper = overlayEl.parentElement;
    const video   = wrapper.querySelector('video');
    overlayEl.classList.add('hidden');
    video.play();
    video.addEventListener('pause', () => {
        overlayEl.classList.remove('hidden');
    }, { once: false });
    video.addEventListener('ended', () => {
        overlayEl.classList.remove('hidden');
    });
}

// ===== MAIN DOM READY =====
document.addEventListener('DOMContentLoaded', () => {

    // TYPED.JS
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                    "Software Development Enthusiast",
                    "AI & Data Science Student",
                    "Machine Learning Learner",
                    "Problem Solver"
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 1800,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // ACTIVE NAV ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    const highlightNav = () => {
        let scrollY = window.scrollY;
        sections.forEach(section => {
            const top    = section.offsetTop - 110;
            const bottom = top + section.offsetHeight;
            const id     = section.getAttribute('id');
            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });
    };
    window.addEventListener('scroll', highlightNav);

    // MOBILE MENU
    const menuIcon = document.getElementById('menuIcon');
    const navbar   = document.querySelector('.navbar');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('open');
            const icon = menuIcon.querySelector('i');
            icon.className = navbar.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu';
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            const icon = menuIcon && menuIcon.querySelector('i');
            if (icon) icon.className = 'bx bx-menu';
        });
    });

    // SKILLS TABS
    const tabBtns     = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.skills-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(`tab-${btn.dataset.tab}`);
            if (target) {
                target.classList.add('active');
                animateBarsIn(target);
            }
        });
    });

    function animateBarsIn(container) {
        container.querySelectorAll('.skill-fill').forEach(fill => {
            fill.classList.remove('animated');
            void fill.offsetWidth;
            fill.classList.add('animated');
        });
    }

    // SCROLL REVEAL
    const revealEls = document.querySelectorAll(
        '.about-text, .about-img, .skill-card, .project-card, ' +
        '.cert-card, .contact-info, .contact-form, .section-title, ' +
        '.section-eyebrow, .demo-card'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children) : [];
                const delay = siblings.indexOf(entry.target) * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                        setTimeout(() => fill.classList.add('animated'), 200);
                    });
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    // Animate first skills tab on load
    const firstTab = document.querySelector('.skills-content.active');
    if (firstTab) setTimeout(() => animateBarsIn(firstTab), 700);

    // CONTACT FORM
    const form       = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.style.color = '#ff6b6b';
                return;
            }
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                formStatus.textContent = '✓ Message received! I\'ll get back to you soon.';
                formStatus.style.color = '#0ef';
                form.reset();
                btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
                btn.disabled = false;
                setTimeout(() => { formStatus.textContent = ''; }, 5000);
            }, 1500);
        });
    }

    // HEADER SHADOW ON SCROLL
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
    });

});
