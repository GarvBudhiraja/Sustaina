document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.body.style.visibility = "hidden";
        document.getElementById("preloader").style.visibility = "visible";
    } else {
        document.getElementById("preloader").style.display = "none";
        document.body.style.visibility = "visible";
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavbar();
    initMobileMenu();
    initModals();
    initFeatureTabs();
    initSliders();
    initPasswordToggle();
    initPasswordStrength();
    initBackToTop();
    initDashboardPreview();
    initAnimatedCounters();
    initImpactChart();
    initScrollAnimation();
    initToasts();
    initHealthTracker();
    
    // Update CTA section based on login status
    updateCTASection();

    // Eco-Friendly Challenges Dynamic Rendering
    initChallenges();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
        }, 500);
    });
}

// Navbar
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links (only for hash links)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default and do smooth scroll for hash links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                document.querySelector('.mobile-menu').classList.remove('show');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    // Open mobile menu
    navbarToggle.addEventListener('click', function() {
        mobileMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            e.target !== navbarToggle &&
            !navbarToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Mobile menu links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
    
    // Mobile login and signup buttons
    document.getElementById('loginBtnMobile').addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
        showModal('loginModal');
    });
    
    document.getElementById('signupBtnMobile').addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
        showModal('signupModal');
    });
}

// Modals
function initModals() {
    // Login modal
    document.getElementById('loginBtn').addEventListener('click', function() {
        showModal('loginModal');
    });
    
    // Signup modal
    document.getElementById('signupBtn').addEventListener('click', function() {
        showModal('signupModal');
    });
    
    // Get started buttons
    document.getElementById('getStartedBtn').addEventListener('click', function() {
        showModal('signupModal');
    });
    
    document.getElementById('getStartedBtnSteps').addEventListener('click', function() {
        showModal('signupModal');
    });
    
    document.getElementById('ctaSignupBtn').addEventListener('click', function() {
        showModal('signupModal');
    });
    
    // Forgot password link
    document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllModals();
        showModal('forgotPasswordModal');
    });
    
    // Switch between login and signup
    document.getElementById('switchToSignup').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllModals();
        showModal('signupModal');
    });
    
    document.getElementById('switchToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllModals();
        showModal('loginModal');
    });
    
    // Back to login from forgot password
    document.getElementById('backToLogin').addEventListener('click', function(e) {
        e.preventDefault();
        hideAllModals();
        showModal('loginModal');
    });
    
    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            hideAllModals();
        });
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            hideAllModals();
        });
    });
    
    // Handle form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // For demo purposes, show dashboard preview
        if (email && password) {
            hideAllModals();
            
            // Set user name in dashboard
            const firstName = email.split('@')[0];
            document.getElementById('dashboardUserName').textContent = firstName;
            document.getElementById('welcomeUserName').textContent = firstName;
            
            // Show dashboard
            document.getElementById('dashboardPreview').classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Show success toast
            showToast('success', 'Login Successful', 'Welcome back to Sustaina!');
        }
    });
    
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // For demo purposes, show success modal
        if (name && email && password) {
            hideAllModals();
            
            // Set success message
            document.getElementById('successMessage').textContent = 'Your account has been created successfully!';
            
            // Set user name in dashboard
            const firstName = name.split(' ')[0];
            document.getElementById('dashboardUserName').textContent = firstName;
            document.getElementById('welcomeUserName').textContent = firstName;
            
            // Show success modal
            showModal('successModal');
            
            // Set success button action
            document.getElementById('successModalButton').onclick = function() {
                hideAllModals();
                
                // Show dashboard
                document.getElementById('dashboardPreview').classList.add('show');
                document.body.style.overflow = 'hidden';
                
                // Show success toast
                showToast('success', 'Account Created', 'Welcome to Sustaina!');
            };
        }
    });
    
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        
        // For demo purposes, show success modal
        if (email) {
            hideAllModals();
            
            // Set success message
            document.getElementById('successMessage').textContent = 'Password reset link has been sent to your email!';
            
            // Show success modal
            showModal('successModal');
            
            // Set success button action
            document.getElementById('successModalButton').onclick = function() {
                hideAllModals();
                
                // Show login modal
                showModal('loginModal');
                
                // Show success toast
                showToast('success', 'Email Sent', 'Check your inbox for the reset link');
            };
        }
    });
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Hide all modals
function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = '';
}

// Feature Tabs
function initFeatureTabs() {
    const tabButtons = document.querySelectorAll('.features-tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab panes
            document.querySelectorAll('.features-tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show selected tab pane
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Sliders
function initSliders() {
    // Showcase slider
    const showcaseSlider = new Swiper('.showcase-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.showcase-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.showcase-slider-next',
            prevEl: '.showcase-slider-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
    
    // Testimonials slider
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonials-slider .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// Password Toggle
function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password Strength
function initPasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text span');
    
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) {
            strength += 1;
        }
        
        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        
        // Number check
        if (/[0-9]/.test(password)) {
            strength += 1;
        }
        
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }
        
        // Update strength meter
        strengthMeter.setAttribute('data-strength', strength);
        
        // Update strength text
        if (strength === 0) {
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#dc3545';
        } else if (strength === 1) {
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#dc3545';
        } else if (strength === 2) {
            strengthText.textContent = 'Medium';
            strengthText.style.color = '#ffc107';
        } else if (strength === 3) {
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#17a2b8';
        } else {
            strengthText.textContent = 'Very Strong';
            strengthText.style.color = '#28a745';
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dashboard Preview
function initDashboardPreview() {
    const dashboardPreview = document.getElementById('dashboardPreview');
    const dashboardPreviewClose = document.getElementById('dashboardPreviewClose');
    
    // Close dashboard preview
    dashboardPreviewClose.addEventListener('click', function() {
        dashboardPreview.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Dashboard habit checkboxes
    document.querySelectorAll('.dashboard-habit-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Update progress bar
            updateHabitProgress();
            
            if (this.checked) {
                // Show success toast
                showToast('success', 'Habit Completed', 'You earned XP for completing this habit!');
            }
        });
    });
    
    // Dashboard logout button
    document.querySelector('.dashboard-logout').addEventListener('click', function() {
        dashboardPreview.classList.remove('show');
        document.body.style.overflow = '';
        
        // Show success toast
        showToast('success', 'Logged Out', 'You have been successfully logged out');
    });
}

// Update habit progress
function updateHabitProgress() {
    const totalHabits = document.querySelectorAll('.dashboard-habit-item').length;
    const completedHabits = document.querySelectorAll('.dashboard-habit-item input[type="checkbox"]:checked').length;
    
    // Update progress text
    document.querySelector('.dashboard-progress-info span:last-child').textContent = `${completedHabits}/${totalHabits}`;
    
    // Update progress bar
    const progressPercentage = (completedHabits / totalHabits) * 100;
    document.querySelector('.dashboard-progress-fill').style.width = `${progressPercentage}%`;
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.hero-stat-number, .about-stat-number');
    
    const animateCounter = (counter, target) => {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/,/g, ''));
                counter.textContent = '0';
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Impact Chart
function initImpactChart() {
    const ctx = document.getElementById('impactChart');
    
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Eco Score',
                data: [65, 78, 52, 91, 85, 79, 95],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            return `Eco Score: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#666'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666'
                    }
                }
            }
        }
    });
}

// Scroll Animation
function initScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate__animated');
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.classList.contains('animate__delay-1s') ? 100 :
                              element.classList.contains('animate__delay-2s') ? 200 :
                              element.classList.contains('animate__delay-3s') ? 300 : 0;
                
                setTimeout(() => {
                    element.style.visibility = 'visible';
                    element.style.opacity = '1';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Toast Notifications
function initToasts() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Show toast notification
function showToast(type, title, message) {
    const toastContainer = document.querySelector('.toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set toast icon based on type
    let iconClass = '';
    switch (type) {
        case 'success':
            iconClass = 'fas fa-check-circle success';
            break;
        case 'error':
            iconClass = 'fas fa-times-circle error';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-circle warning';
            break;
        case 'info':
            iconClass = 'fas fa-info-circle info';
            break;
        default:
            iconClass = 'fas fa-info-circle info';
    }
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-icon ${type}">
            <i class="${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Add close event listener
    toast.querySelector('.toast-close').addEventListener('click', function() {
        toast.remove();
    });
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Health Tracker
function initHealthTracker() {
    let editIndex = -1;
    let date = JSON.parse(localStorage.getItem("date")) || [];
    let water = JSON.parse(localStorage.getItem("water")) || [];
    let exercise = JSON.parse(localStorage.getItem("exercise")) || [];
    let bloodsugar = JSON.parse(localStorage.getItem("bloodsugar")) || [];
    
    const wInput = document.getElementById("water");
    const eInput = document.getElementById("exercise");
    const bInput = document.getElementById("bloodsugerlevel");
    const submitButton = document.getElementById("submit");
    const editSection = document.getElementById("editSection");
    
    // Fill table with existing data
    fillTable();
    
    // Submit button event listener
    submitButton.addEventListener("click", () => {
        const w = wInput.value || null;
        const e = eInput.value || null;
        const b = bInput.value || null;
        
        if (w === null || e === null || b === null) {
            alert("Please enter all the fields.");
            return;
        }
        
        const d = new Date().toLocaleDateString();
        date = [d, ...date];
        water = [w, ...water];
        exercise = [e, ...exercise];
        bloodsugar = [b, ...bloodsugar];
        
        clearInputs();
        fillTable();
        addToLocalStorage();
    });
    
    // Clear inputs
    function clearInputs() {
        wInput.value = "";
        eInput.value = "";
        bInput.value = "";
    }
    
    // Add data to local storage
    function addToLocalStorage() {
        localStorage.setItem("date", JSON.stringify(date));
        localStorage.setItem("water", JSON.stringify(water));
        localStorage.setItem("exercise", JSON.stringify(exercise));
        localStorage.setItem("bloodsugar", JSON.stringify(bloodsugar));
    }
    
    // Fill table with data
    function fillTable() {
        const tableBody = document.querySelector("#healthTrackerTable tbody");
        tableBody.innerHTML = "";
        
        for (let i = 0; i < date.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${date[i]}</td>
                <td>${water[i]}</td>
                <td>${exercise[i]}</td>
                <td>${bloodsugar[i]}</td>
                <td>
                    <button class="edit-btn" data-index="${i}">Edit</button>
                    <button class="delete-btn" data-index="${i}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
        
        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editIndex = index;
                editSection.style.display = 'block';
                wInput.value = water[index];
                eInput.value = exercise[index];
                bInput.value = bloodsugar[index];
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                date.splice(index, 1);
                water.splice(index, 1);
                exercise.splice(index, 1);
                bloodsugar.splice(index, 1);
                fillTable();
                addToLocalStorage();
            });
        });
    }
    
    // Edit section
    document.getElementById('editSubmit').addEventListener('click', function() {
        if (editIndex !== -1) {
            date[editIndex] = new Date().toLocaleDateString();
            water[editIndex] = wInput.value;
            exercise[editIndex] = eInput.value;
            bloodsugar[editIndex] = bInput.value;
            
            clearInputs();
            editSection.style.display = 'none';
            editIndex = -1;
            fillTable();
            addToLocalStorage();
        }
    });
    
    document.getElementById('editCancel').addEventListener('click', function() {
        clearInputs();
        editSection.style.display = 'none';
        editIndex = -1;
    });
}

// Function to update CTA section based on login status
function updateCTASection() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    const user = JSON.parse(localStorage.getItem('user'));
    const ctaContent = ctaSection.querySelector('.cta-content');
    
    if (user && user.name) {
        // User is logged in, show welcome message
        ctaContent.innerHTML = `
            <h2>Welcome back, ${user.name}!</h2>
            <p>Continue your journey towards a sustainable future with Sustaina.</p>
            <div class="cta-actions">
                <a href="dashboard.html" class="btn btn-primary">Go to Dashboard</a>
                <a href="profile.html" class="btn btn-outline">View Profile</a>
            </div>
        `;
    } else {
        // User is not logged in, show sign up CTA
        ctaContent.innerHTML = `
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of people who are already making a positive impact on our planet.</p>
            <div class="cta-actions">
                <a href="register.html" class="btn btn-primary">Sign Up Now</a>
                <a href="about.html" class="btn btn-outline">Learn More</a>
            </div>
        `;
    }
}

// AI Tracking Functionality
const voiceInput = document.getElementById('voiceInput');
if (voiceInput) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Process eco-action from voice input
    };

    voiceInput.addEventListener('click', () => {
        recognition.start();
    });
}

// Barcode Scanner Simulation
document.getElementById('barcodeScan').addEventListener('click', () => {
    const barcode = prompt('Enter product barcode:');
    if (barcode) {
        // Handle barcode lookup
    }
});

// Score Calculator
function calculateEcoScore() {
    // Add scoring logic based on user activities
    return {
        total: 83,
        categories: {
            waste: 75,
            energy: 85,
            water: 90
        }
    };
}

// Store and display tracked actions
const actionHistoryList = document.getElementById('actionHistoryList');
let actions = JSON.parse(localStorage.getItem('ecoActions')) || [];

function addAction(action) {
    actions.unshift({ action, date: new Date().toLocaleString() });
    localStorage.setItem('ecoActions', JSON.stringify(actions));
    renderActions();
}

function renderActions() {
    if (!actionHistoryList) return;
    actionHistoryList.innerHTML = actions.map((a, i) =>
        `<li>
            <i class="fas fa-leaf"></i> ${a.action}
            <span style="float:right;font-size:0.9em;color:#888">${a.date}</span>
            <button onclick="deleteAction(${i})" style="float:right;margin-right:10px;background:none;border:none;color:#c00;cursor:pointer;">Delete</button>
        </li>`
    ).join('');
}
window.deleteAction = function(i) {
    actions.splice(i, 1);
    localStorage.setItem('ecoActions', JSON.stringify(actions));
    renderActions();
};

// Hook up quick track input
document.querySelector('.quick-track button').addEventListener('click', function() {
    const input = document.querySelector('.quick-track input');
    if (input.value.trim()) {
        addAction(input.value.trim());
        input.value = '';
    }
});

// Hook up voice and barcode to add actions
if (voiceInput) {
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        addAction(`Voice: ${transcript}`);
    };
}
document.getElementById('barcodeScan').addEventListener('click', () => {
    const barcode = prompt('Enter product barcode:');
    if (barcode) addAction(`Scanned product: ${barcode}`);
});
document.getElementById('photoUpload').addEventListener('click', function() {
    this.querySelector('input[type="file"]').click();
});
document.getElementById('photoUpload').querySelector('input[type="file"]').addEventListener('change', function(e) {
    if (e.target.files.length) addAction(`Photo uploaded: ${e.target.files[0].name}`);
});

// Add after renderActions()
function renderChart() {
    if (!document.getElementById('actionsChart')) return;
    // Count actions per day
    const counts = {};
    actions.forEach(a => {
        const d = a.date.split(',')[0];
        counts[d] = (counts[d] || 0) + 1;
    });
    const labels = Object.keys(counts).slice(-7);
    const data = labels.map(l => counts[l]);
    // Simple chart using Chart.js (already used in your code)
    if (window.actionsChartInstance) window.actionsChartInstance.destroy();
    window.actionsChartInstance = new Chart(document.getElementById('actionsChart').getContext('2d'), {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Actions', data, backgroundColor: '#4CAF50' }] },
        options: { plugins: { legend: { display: false } } }
    });
}
renderChart();
const oldAddAction = addAction;
addAction = function(action) {
    oldAddAction(action);
    renderChart();
};

// Eco-Friendly Challenges Dynamic Rendering
(function() {
    const challenges = [
        {
            icon: 'fas fa-bicycle',
            badge: 'POPULAR',
            badgeColor: '#7ed957',
            title: '30-Day Car-Free Challenge',
            description: 'Reduce your carbon footprint by using alternative transportation for 30 days.',
            participants: '1,245',
            daysLeft: 15
        },
        {
            icon: 'fas fa-lock',
            badge: 'NEW',
            badgeColor: '#7ed957',
            title: 'Zero Waste Week',
            description: 'Minimize your waste production and find creative ways to reuse and recycle.',
            participants: '876',
            daysLeft: 7
        },
        {
            icon: 'fas fa-seedling',
            badge: 'FEATURED',
            badgeColor: '#7ed957',
            title: 'Plant 100 Trees',
            description: 'Join our community effort to plant 100 trees in your local area this month.',
            participants: '2,103',
            daysLeft: 22
        }
    ];

    function renderChallenges() {
        const section = document.getElementById('challenges');
        if (!section) return;
        const cardsRow = section.querySelector('.challenges-cards-row');
        if (!cardsRow) return;
        cardsRow.innerHTML = challenges.map(challenge => `
            <div class="challenge-card" style="flex: 1 1 300px; max-width: 350px; min-width: 260px; background: #fff; border-radius: 1.25rem; box-shadow: 0 2px 16px rgba(0,0,0,0.04); padding: 2rem 1.5rem; display: flex; flex-direction: column; align-items: center;">
                <div style="margin-bottom: 0.5rem;">
                    <span class="badge" style="background: ${challenge.badgeColor}; color: #fff; font-size: 0.85em; padding: 0.25em 1em; border-radius: 1em; font-weight: 600;">${challenge.badge}</span>
                </div>
                <div style="font-size: 2.5rem; color: #7ed957; margin-bottom: 0.5rem;"><i class="${challenge.icon}"></i></div>
                <h3 style="font-size: 1.25rem; font-weight: 700; text-align: center; margin-bottom: 0.5rem;">${challenge.title}</h3>
                <p style="text-align: center; color: #444; margin-bottom: 1.25rem;">${challenge.description}</p>
                <div style="display: flex; justify-content: center; align-items: center; gap: 1.2em; font-size: 0.98em; color: #222; margin-bottom: 1.25rem;">
                    <span><i class="fas fa-users" style="color:#7ed957;"></i> ${challenge.participants} participants</span>
                    <span><i class="fas fa-clock" style="color:#7ed957;"></i> ${challenge.daysLeft} days left</span>
                </div>
                <button class="btn btn-outline join-challenge-btn" style="width: 100%;">Join Challenge</button>
            </div>
        `).join('');
    }

    // Initial render
    document.addEventListener('DOMContentLoaded', renderChallenges);

    // Example: Add event listeners for join buttons (future use)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('join-challenge-btn')) {
            alert('You joined the challenge!');
        }
    });
})();
