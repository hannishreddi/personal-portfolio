/**
 * ANUMULLA HANNISH REDDI - PORTFOLIO INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Switcher (Dark / Light mode)
  initThemeToggle();

  // 2. Initialize Typewriter Effect
  initTypewriter();

  // 3. Initialize Sticky Navigation Header & Scrollspy
  initScrollNav();

  // 4. Initialize Mobile Navigation Menu
  initMobileNav();

  // 5. Initialize Project Filtering & Project Details Modal
  initProjectsSection();

  // 6. Initialize Interactive Contact Form
  initContactForm();

  // 7. Update Footer Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('hannish_portfolio_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('hannish_portfolio_theme', newTheme);
    });
  }
}

/* ==========================================================================
   DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const roles = [
    'AI & Machine Learning',
    'Full-Stack Web Development',
    'Data Science & Analytics',
    'Predictive Modeling & NLP',
    'Data Structures & Algorithms'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   STICKY HEADER & ACTIVE SCROLLSPY
   ========================================================================== */
function initScrollNav() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id], main > section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header blur & shadow on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy active highlight
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu upon clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   PROJECTS SECTION (FILTERING & MODAL)
   ========================================================================== */
const projectsData = {
  battery: {
    title: 'Battery Drain Prediction using Machine Learning',
    category: 'AI / Machine Learning',
    stack: 'Python, Scikit-learn, Pandas, Random Forest Regression, Tkinter GUI',
    description: `A comprehensive machine learning predictive pipeline that diagnoses real-time computer hardware stress metrics to accurately estimate battery discharge rates and remaining battery lifespan.`,
    highlights: [
      'Engineered an automated background telemetry logger capturing live CPU consumption, RAM allocation, GPU workload, network I/O packets, background task counts, and battery drain intervals.',
      'Constructed a robust preprocessing pipeline implementing categorical label encoding, feature scaling, and multi-collinearity checks.',
      'Trained and hyper-parameter tuned a Random Forest Regressor, capturing complex non-linear degradation curves with high R² accuracy.',
      'Packaged the trained estimator into a lightweight, non-intrusive Tkinter desktop widget that updates live estimated battery longevity in real time.'
    ],
    github: 'https://github.com',
    status: 'Completed & Deployed Locally'
  },
  storyvault: {
    title: 'StoryVault — Community Story Sharing Platform',
    category: 'Full-Stack Web Development',
    stack: 'React.js, Node.js, Express.js, MongoDB, JWT, Cloudinary, REST APIs, DOMPurify',
    description: `A full-stack, secure, dynamic storytelling web application engineered for authors and readers to create, discover, and interact with long-form rich-text narratives.`,
    highlights: [
      'Developed a responsive, modern frontend architecture using React.js, dynamic client-side routing, and Context API for global state management.',
      'Integrated an intuitive React-Quill WYSIWYG editor paired with DOMPurify sanitization to enable rich formatting while strictly eliminating Cross-Site Scripting (XSS) risks.',
      'Constructed a secure backend using Express.js and MongoDB (Mongoose), featuring JWT-based session management and Bcrypt password hashing.',
      'Configured cloud media pipelines with Cloudinary for automated image compression, caching, and CDN asset delivery.'
    ],
    github: 'https://github.com',
    status: 'Live Full-Stack Project'
  },
  hatespeech: {
    title: 'Hate Speech Detection System',
    category: 'Natural Language Processing (NLP)',
    stack: 'Python, NLP, Scikit-learn, TF-IDF Vectorization, Pandas, NLTK',
    description: `An intelligent Natural Language Processing classifier capable of scanning textual comments, tweets, and social messages to identify and flag toxic, hateful, or offensive language.`,
    highlights: [
      'Engineered text normalization pipelines encompassing regex cleaning, tokenization, stop-word elimination, and Porter stemming.',
      'Extracted n-gram textual features using TF-IDF (Term Frequency-Inverse Document Frequency) vectorization.',
      'Tuned and compared diverse classification algorithms including Multinomial Naive Bayes, Linear Support Vector Machines (SVM), and Logistic Regression.',
      'Optimized classification recall for minority toxic classes using class-weight balancing and cross-validation.'
    ],
    github: 'https://github.com',
    status: 'Completed Research Project (2025)'
  }
};

function initProjectsSection() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Filter project cards by category
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal setup
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.project-details-btn');

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectsData[projKey];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="section-tag" style="margin-bottom: 10px;">${data.category}</span>
        <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">${data.title}</h2>
        <p style="font-family: var(--font-mono); color: var(--accent-secondary); font-size: 0.85rem; margin-bottom: 16px;">
          <i class="fa-solid fa-code"></i> ${data.stack}
        </p>
        <p style="color: var(--text-secondary); font-size: 0.96rem; line-height: 1.65; margin-bottom: 20px;">
          ${data.description}
        </p>
        <h4 style="font-size: 1.05rem; margin-bottom: 12px;"><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Key Architecture Highlights:</h4>
        <ul style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          ${data.highlights.map(h => `<li style="display: flex; gap: 8px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;"><i class="fa-solid fa-arrow-right" style="color: var(--accent-primary); font-size: 0.8rem; margin-top: 4px;"></i> <span>${h}</span></li>`).join('')}
        </ul>
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 18px; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 0.85rem; color: #34d399; font-weight: 600;"><i class="fa-solid fa-circle-dot"></i> ${data.status}</span>
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i>
            <span>View Repository</span>
          </a>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const successBox = document.getElementById('form-success-feedback');
  if (!form) return;

  const fields = [
    {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      validate: (v) => v.trim().length >= 2
    },
    {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
    },
    {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      validate: (v) => v.trim().length >= 3
    },
    {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      validate: (v) => v.trim().length >= 10
    }
  ];

  // Real-time input validation on change
  fields.forEach(field => {
    if (!field.input) return;

    field.input.addEventListener('input', () => {
      const group = field.input.closest('.form-group');
      if (field.validate(field.input.value)) {
        group.classList.remove('has-error');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(field => {
      if (!field.input) return;
      const group = field.input.closest('.form-group');
      if (!field.validate(field.input.value)) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    });

    if (isValid) {
      const submitBtn = document.getElementById('contact-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        if (successBox) {
          successBox.style.display = 'flex';
          setTimeout(() => {
            successBox.style.display = 'none';
          }, 6000);
        }
      }, 1000);
    }
  });
}
