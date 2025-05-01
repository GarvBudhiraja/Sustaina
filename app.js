// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Initialize forms
    initForms();
});

// Navigation initialization
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Form initialization
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const required = input.hasAttribute('required');
        const type = input.getAttribute('type');
        
        // Remove existing error messages
        const existingError = input.parentElement.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Check required fields
        if (required && !value) {
            showError(input, 'This field is required');
            isValid = false;
            return;
        }
        
        // Check email format
        if (type === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
                return;
            }
        }
    });
    
    return isValid;
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    input.parentElement.appendChild(error);
} 