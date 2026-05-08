const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const fab = document.getElementById('fab');
const scrollProgress = document.getElementById('scroll-progress');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Theme Toggle Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateButtonText(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonText(newTheme);
});

function updateButtonText(theme) {
  themeToggle.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Scroll Handling: Reveal & FAB & Progress Bar
window.addEventListener('scroll', () => {
  // Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('active');
    }
  });

  // FAB Visibility
  if (window.scrollY > 300) {
    fab.classList.add('show');
  } else {
    fab.classList.remove('show');
  }

  // Progress Bar
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// Initial check for reveal
window.dispatchEvent(new Event('scroll'));

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
  });
});

// AJAX Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const submitBtn = document.getElementById('submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = '보내는 중...';
    formStatus.className = '';
    formStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = '문의가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        const result = await response.json();
        formStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '문의 보내기';
    }
  });
}
