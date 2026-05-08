const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
    
    // Optional: Close other items when one is opened
    // const otherItems = document.querySelectorAll('.faq-item');
    // otherItems.forEach(oi => {
    //   if (oi !== item) oi.classList.remove('active');
    // });
  });
});
