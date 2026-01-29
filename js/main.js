/* ================================================
   LEGITA - Main JavaScript
   ================================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initHeader();
  initSlider();
  initMobileMenu();
  initPricingTabs();
  initFAQ();
  initSmoothScroll();
  initAnimations();
});

/* ========== Header Scroll Effect ========== */
function initHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

/* ========== Mobile Menu ========== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  if (mobileNav && mobileMenuBtn) {
    mobileNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
  }
}

/* ========== Pricing Tabs ========== */
function initPricingTabs() {
  const tabs = document.querySelectorAll('.pricing-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));

      // Add active to clicked tab
      this.classList.add('active');

      // Show/hide content
      const tabName = this.getAttribute('data-tab');
      const allGrids = document.querySelectorAll('.pricing-grid');

      allGrids.forEach(grid => {
        if (grid.id === 'tab-' + tabName) {
          grid.style.display = 'grid';
          // Add fade-in animation
          grid.style.opacity = '0';
          grid.style.transform = 'translateY(20px)';
          setTimeout(() => {
            grid.style.transition = 'all 0.4s ease';
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
          }, 10);
        } else {
          grid.style.display = 'none';
        }
      });
    });
  });
}

/* ========== FAQ Accordion ========== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
      // Check if this item is already active
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));

      // If wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ========== Smooth Scroll ========== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ========== Scroll Animations ========== */
function initAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements with 'reveal' class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el, index) => {
    // Add staggered delay only for the INITIAL reveal
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });

  // Observe FAQ items separately if they don't have reveal class
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 5) * 0.05}s`;
    item.classList.add('reveal'); // Ensure FAQ items have the reveal base styles
    observer.observe(item);
  });
}

/* ========== Price Counter Animation ========== */
function animatePrice(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString('id-ID');
  }, 20);
}

/* ========== Form Validation (for future use) ========== */
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

/* ========== WhatsApp Click Tracking (for future analytics) ========== */
document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]').forEach(btn => {
  btn.addEventListener('click', function () {
    // Track WhatsApp click event
    console.log('WhatsApp button clicked');
    // Future: Add analytics tracking here
  });
});

/* ========== Hero Slider ========== */
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.nav-dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 7000);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startInterval();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      showSlide(parseInt(this.dataset.index));
      startInterval();
    });
  });

  // Touch events for swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slides[currentSlide].parentElement.parentElement.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slides[currentSlide].parentElement.parentElement.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped left
      nextSlide();
      startInterval();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped right
      showSlide(currentSlide - 1);
      startInterval();
    }
  }

  startInterval();
}
