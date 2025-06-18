// Global Variables
let currentSlide = 0;
let currentGalleryImage = 0;
let slideInterval;

// Gallery Images Data
const galleryImages = [
    {
        url: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Современные здания кампуса'
    },
    {
        url: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Современные лаборатории'
    },
    {
        url: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Библиотека и учебные зоны'
    },
    {
        url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Церемонии выпуска'
    },
    {
        url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Студенческая деятельность'
    },
    {
        url: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Технологические центры'
    }
];

// Search Data
const searchData = [
    'Программа информатики',
    'Бизнес-администрирование',
    'Инженерные курсы',
    'Изучение здравоохранения',
    'Требования к поступлению',
    'Процесс подачи заявления',
    'Студенческий портал',
    'Академический календарь',
    'Информация о преподавателях',
    'Объекты кампуса',
    'Ресурсы библиотеки',
    'Контактная информация',
    'Стипендии',
    'Финансовая помощь',
    'Каталог курсов',
    'Регистрация',
    'Требования к выпуску',
    'События кампуса',
    'Студенческие услуги',
    'Карьерные услуги'
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeSearch();
    initializeNavigation();
    initializeForms();
    initializeGallery();
    updateCurrentYear();
    initializeSpecializations();
    initializeFAQ();
});

// Slider Functions
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length > 0) {
        // Auto-advance slides
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
        
        // Pause on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    changeSlide(1);
                }, 5000);
            });
        }
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.remove('active');
    }
    
    // Calculate next slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0 || index < 0 || index >= slides.length) return;
    
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.remove('active');
    }
    
    // Set new slide
    currentSlide = index;
    
    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

// Navigation Functions
function initializeNavigation() {
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    const mobileNav = document.querySelector('.nav-mobile');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && menuBtn) {
        mobileNav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    }
}

// Search Functions
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearch();
            }
        });
    }
}

function openSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    
    if (searchModal && searchInput) {
        searchModal.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }
}

function closeSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchModal) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (searchResults) {
        searchResults.innerHTML = '<div class="search-placeholder">Начните печатать для поиска...</div>';
    }
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    if (query === '') {
        searchResults.innerHTML = '<div class="search-placeholder">Начните печатать для поиска...</div>';
        return;
    }
    
    const filteredResults = searchData.filter(item =>
        item.toLowerCase().includes(query)
    );
    
    if (filteredResults.length > 0) {
        const resultsHTML = `
            <h3 style="font-size: 0.9rem; font-weight: 600; color: #666; margin-bottom: 12px;">Результаты поиска</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${filteredResults.map(result => `
                    <div class="search-result-item">${result}</div>
                `).join('')}
            </div>
        `;
        searchResults.innerHTML = resultsHTML;
    } else {
        searchResults.innerHTML = `<div class="search-placeholder">Результаты не найдены для "${query}"</div>`;
    }
}

// Form Functions
function initializeForms() {
    // Add form validation and submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#f44336';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

function submitApplication(event) {
    event.preventDefault();
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Заявление успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        event.target.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 2000);
}

function submitContactForm(event) {
    event.preventDefault();
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        event.target.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 2000);
}

function loginStudent(event) {
    event.preventDefault();
    
    // Simulate login
    const loginBtn = event.target.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    
    loginBtn.innerHTML = 'Вход...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        alert('Вход выполнен успешно! Перенаправление в студенческий портал...');
        event.target.reset();
        loginBtn.disabled = false;
        loginBtn.innerHTML = originalText;
    }, 2000);
}

// Gallery Functions
function initializeGallery() {
    if (document.getElementById('mainGalleryImage')) {
        updateGalleryImage();
    }
}

function changeGalleryImage(direction) {
    currentGalleryImage = (currentGalleryImage + direction + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
}

function selectGalleryImage(index) {
    currentGalleryImage = index;
    updateGalleryImage();
}

function updateGalleryImage() {
    const mainImage = document.getElementById('mainGalleryImage');
    const caption = document.getElementById('galleryCaption');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && galleryImages[currentGalleryImage]) {
        mainImage.src = galleryImages[currentGalleryImage].url;
        mainImage.alt = galleryImages[currentGalleryImage].caption;
    }
    
    if (caption && galleryImages[currentGalleryImage]) {
        caption.textContent = galleryImages[currentGalleryImage].caption;
    }
    
    // Update thumbnail active state
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === currentGalleryImage);
    });
}

// Specializations Functions
function initializeSpecializations() {
    // Set default active specialization
    const defaultBtn = document.querySelector('.specialization-btn');
    if (defaultBtn) {
        selectSpecialization('computer-science', defaultBtn);
    }
}

function selectSpecialization(specializationId, buttonElement) {
    // Remove active class from all buttons and content
    const buttons = document.querySelectorAll('.specialization-btn');
    const contents = document.querySelectorAll('.specialization-content');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected button and content
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    
    const selectedContent = document.getElementById(specializationId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
}

// FAQ Functions
function initializeFAQ() {
    // Add click handlers to FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            const allFaqItems = document.querySelectorAll('.faq-item');
            allFaqItems.forEach(item => item.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Timetable Functions
function changeWeek(weekValue) {
    // This would typically update the timetable data
    // For now, we'll just show a message
    console.log('Changed to week:', weekValue);
}

// Utility Functions
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const searchModal = document.getElementById('searchModal');
    
    if (searchModal && event.target === searchModal) {
        closeSearch();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileNav = document.querySelector('.nav-mobile');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        if (menuBtn) {
            menuBtn.classList.remove('active');
        }
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    const target = event.target.closest('a[href^="#"]');
    if (target) {
        event.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states to buttons
document.addEventListener('click', function(event) {
    const button = event.target.closest('button[type="submit"]');
    if (button && !button.disabled) {
        // Add loading state visual feedback
        button.style.opacity = '0.8';
        setTimeout(() => {
            button.style.opacity = '1';
        }, 200);
    }
});

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.quick-link-card, .program-card, .mission-card, .achievement-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes modals
    if (event.key === 'Escape') {
        closeSearch();
    }
    
    // Arrow keys for slider navigation
    if (event.key === 'ArrowLeft' && document.querySelector('.hero-slider')) {
        changeSlide(-1);
    }
    if (event.key === 'ArrowRight' && document.querySelector('.hero-slider')) {
        changeSlide(1);
    }
    
    // Arrow keys for gallery navigation
    if (event.key === 'ArrowLeft' && document.querySelector('.gallery-section')) {
        changeGalleryImage(-1);
    }
    if (event.key === 'ArrowRight' && document.querySelector('.gallery-section')) {
        changeGalleryImage(1);
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Error handling for images
document.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        event.target.style.display = 'none';
        console.warn('Failed to load image:', event.target.src);
    }
}, true);

// Add focus management for accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Add visible focus indicators
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Remove focus indicators when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Console welcome message
console.log('%cWelcome to Example College Website!', 'color: #2196F3; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern web technologies for optimal performance and accessibility.', 'color: #666; font-size: 12px;');