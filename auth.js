document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize password toggles
    initPasswordToggles();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize preloader
    initPreloader();

    // Initialize authentication state
    initAuthState();

    // Update CTA section based on login status
    updateCTASection();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) {
                preloader.classList.add('hide');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 500);
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Password Toggle Functionality
function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // Add password strength meter functionality
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
        }
    }
}

// Login Form Handler
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;

    try {
        // Get stored users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user with matching email and password
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Incorrect email or password');
        }
        
        // Store user session if remember is checked
        if (remember) {
            localStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                fullName: user.fullName
            }));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                fullName: user.fullName
            }));
        }
        
        showToast('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Register Form Handler
async function handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms') ? document.getElementById('terms').checked : false
    };

    // Validate form data
    const validationError = validateRegistration(formData);
    if (validationError) {
        showToast(validationError, 'error');
        return;
    }

    try {
        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.some(user => user.email === formData.email)) {
            throw new Error('Email already registered');
        }
        
        // Add new user to users array
        users.push({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password
        });
        
        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        showToast('Registration successful! Redirecting to login...', 'success');
        
        // Redirect to login page after successful registration
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Registration Form Validation
function validateRegistration(data) {
    if (!data.fullName || data.fullName.length < 2) {
        return 'Please enter a valid full name';
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        return 'Please enter a valid email address';
    }
    
    if (!data.password || data.password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    
    if (data.password !== data.confirmPassword) {
        return 'Passwords do not match';
    }
    
    if (data.terms === false) {
        return 'Please accept the terms and conditions';
    }
    
    return null;
}

// Email Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password Strength Checker
function checkPasswordStrength(password) {
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text span');
    
    if (!strengthMeter || !strengthText) return;
    
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains number
    if (/\d/.test(password)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Update UI based on strength
    if (strength <= 2) {
        strengthMeter.className = 'strength-meter-fill weak';
        strengthMeter.style.width = '20%';
        feedback = 'Weak';
    } else if (strength <= 3) {
        strengthMeter.className = 'strength-meter-fill medium';
        strengthMeter.style.width = '40%';
        feedback = 'Medium';
    } else if (strength <= 4) {
        strengthMeter.className = 'strength-meter-fill strong';
        strengthMeter.style.width = '70%';
        feedback = 'Strong';
    } else {
        strengthMeter.className = 'strength-meter-fill very-strong';
        strengthMeter.style.width = '100%';
        feedback = 'Very Strong';
    }
    
    strengthText.textContent = feedback;
}

// Toast Notification
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Remove or comment out the simulateLogin and simulateRegistration functions since we're not using them anymore
// async function simulateLogin(data) { ... }
// async function simulateRegistration(data) { ... }

// Initialize Authentication State
function initAuthState() {
    const user = getCurrentUser();
    updateNavbar(user);
    initProfileDropdown();
}

// Get Current User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
}

// Update Navbar Based on Auth State
function updateNavbar(user) {
    const authButtons = document.querySelector('.navbar-actions');
    const mobileAuthButtons = document.querySelector('.mobile-menu-actions');
    
    if (!authButtons) return;
    
    if (user) {
        // Desktop navbar
        authButtons.innerHTML = `
            <div class="profile-dropdown">
                <button class="profile-button">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random" alt="Profile">
                    <span>${user.fullName.split(' ')[0]}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="profile-menu">
                    <div class="profile-header">
                        <div class="profile-name">${user.fullName}</div>
                        <div class="profile-email">${user.email}</div>
                    </div>
                    <ul class="profile-menu-items">
                        <li class="profile-menu-item">
                            <a href="profile.html" class="profile-menu-link">
                                <i class="fas fa-user"></i>
                                <span>My Profile</span>
                            </a>
                        </li>
                        <li class="profile-menu-item">
                            <a href="settings.html" class="profile-menu-link">
                                <i class="fas fa-cog"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li class="profile-menu-separator"></li>
                        <li class="profile-menu-item">
                            <a href="#" class="profile-menu-link" onclick="handleLogout(event)">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        
        // Mobile menu
        if (mobileAuthButtons) {
            mobileAuthButtons.innerHTML = `
                <div class="mobile-profile-menu">
                    <div class="mobile-profile-header">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random" alt="Profile">
                        <div class="mobile-profile-info">
                            <div class="mobile-profile-name">${user.fullName}</div>
                            <div class="mobile-profile-email">${user.email}</div>
                        </div>
                    </div>
                    <a href="profile.html" class="mobile-menu-link">
                        <i class="fas fa-user"></i>
                        <span>My Profile</span>
                    </a>
                    <a href="settings.html" class="mobile-menu-link">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" class="mobile-menu-link" onclick="handleLogout(event)">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            `;
        }
        
        // Show the profile dropdown
        const profileDropdown = document.querySelector('.profile-dropdown');
        if (profileDropdown) {
            profileDropdown.style.display = 'block';
        }
    } else {
        // Not logged in - show default buttons
        authButtons.innerHTML = `
            <a href="login.html" class="btn btn-login">Login</a>
            <a href="register.html" class="btn btn-primary">Sign Up</a>
        `;
        
        if (mobileAuthButtons) {
            mobileAuthButtons.innerHTML = `
                <a href="login.html" class="btn btn-login-mobile">Login</a>
                <a href="register.html" class="btn btn-primary-mobile">Sign Up</a>
            `;
        }
    }
}

// Initialize Profile Dropdown
function initProfileDropdown() {
    const profileButton = document.querySelector('.profile-button');
    const profileMenu = document.querySelector('.profile-menu');
    
    if (profileButton && profileMenu) {
        profileButton.addEventListener('click', (e) => {
            e.stopPropagation();
            profileButton.classList.toggle('active');
            profileMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileMenu.contains(e.target) && !profileButton.contains(e.target)) {
                profileButton.classList.remove('active');
                profileMenu.classList.remove('active');
            }
        });
    }
}

// Handle Logout
function handleLogout(e) {
    e.preventDefault();
    
    // Clear user session
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Show success message
    showToast('Logged out successfully!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Function to update CTA section based on login status
function updateCTASection() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    // Use the same user storage key as in the login function
    const user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
    const ctaContent = ctaSection.querySelector('.cta-content');
    
    if (user && user.fullName) {
        // User is logged in, show welcome message
        ctaContent.innerHTML = `
            <h2 class="cta-title">Welcome back, ${user.fullName}!</h2>
            <p class="cta-text">
                Continue your journey towards a sustainable future with Sustaina.
            </p>
            <div class="cta-actions">
                <a href="dashboard.html" class="btn btn-light btn-lg">
                    Go to Dashboard <i class="fas fa-arrow-right"></i>
                </a>
                <a href="profile.html" class="btn btn-outline-light btn-lg">
                    View Profile
                </a>
            </div>
        `;
    } else {
        // User is not logged in, show sign up CTA
        ctaContent.innerHTML = `
            <h2 class="cta-title">Ready to Start Your Eco Journey?</h2>
            <p class="cta-text">
                Join thousands of users who are making a positive impact on the planet. Sign up today and get access to all Sustaina features for free.
            </p>
            <div class="cta-actions">
                <a href="register.html" class="btn btn-light btn-lg" id="ctaSignupBtn">
                    Sign Up Now <i class="fas fa-arrow-right"></i>
                </a>
                <a href="about.html" class="btn btn-outline-light btn-lg">
                    Learn More
                </a>
            </div>
        `;
    }
} 