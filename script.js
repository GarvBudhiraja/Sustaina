
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.body.style.visibility = "hidden";
        document.getElementById("preloader").style.visibility = "visible";
    } else {
        document.getElementById("preloader").style.display = "none";
        document.body.style.visibility = "visible";
    }
};

document.addEventListener('DOMContentLoaded', function () {
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
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hide');
        }, 500);
    });
}

// Navbar
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-link');

    // Change navbar style on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link based on scroll position
    window.addEventListener('scroll', function () {
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
        link.addEventListener('click', function (e) {
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

    // Main script.js file for Sustaina website

    // Initialize Swiper for testimonials
    const testimonialsSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
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

    // Initialize Swiper for showcase
    const showcaseSwiper = new Swiper('.showcase-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.showcase-slider-next',
            prevEl: '.showcase-slider-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Mobile menu functionality
    document.addEventListener('DOMContentLoaded'), () => {

        const navbarToggle = document.getElementById('navbarToggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');


        // Open mobile menu
        navbarToggle.addEventListener('click', function () {
            mobileMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        // Close mobile menu
        mobileMenuClose.addEventListener('click', function () {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
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
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            });
        });

        // Mobile login and signup buttons
        document.getElementById('loginBtnMobile').addEventListener('click', function () {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
            showModal('loginModal');
        });

        document.getElementById('signupBtnMobile').addEventListener('click', function () {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
            showModal('signupModal');
        });
    }

    // Modals
    function initModals() {
        // Login modal
        document.getElementById('loginBtn').addEventListener('click', function () {
            showModal('loginModal');
        });

        // Signup modal
        document.getElementById('signupBtn').addEventListener('click', function () {
            showModal('signupModal');
        });

        // Get started buttons
        document.getElementById('getStartedBtn').addEventListener('click', function () {
            showModal('signupModal');
        });

        document.getElementById('getStartedBtnSteps').addEventListener('click', function () {
            showModal('signupModal');
        });

        document.getElementById('ctaSignupBtn').addEventListener('click', function () {
            showModal('signupModal');
        });

        // Forgot password link
        document.getElementById('forgotPasswordLink').addEventListener('click', function (e) {
            e.preventDefault();
            hideAllModals();
            showModal('forgotPasswordModal');
        });

        // Switch between login and signup
        document.getElementById('switchToSignup').addEventListener('click', function (e) {
            e.preventDefault();
            hideAllModals();
            showModal('signupModal');
        });

        document.getElementById('switchToLogin').addEventListener('click', function (e) {
            e.preventDefault();
            hideAllModals();
            showModal('loginModal');
        });

        // Back to login from forgot password
        document.getElementById('backToLogin').addEventListener('click', function (e) {
            e.preventDefault();
            hideAllModals();
            showModal('loginModal');
        });

        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', function () {
                hideAllModals();
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function () {
                hideAllModals();
            });
        });

        // Handle form submissions
        document.getElementById('loginForm').addEventListener('submit', function (e) {
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

        document.getElementById('signupForm').addEventListener('submit', function (e) {
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
                document.getElementById('successModalButton').onclick = function () {
                    hideAllModals();

                    // Show dashboard
                    document.getElementById('dashboardPreview').classList.add('show');
                    document.body.style.overflow = 'hidden';

                    // Show success toast
                    showToast('success', 'Account Created', 'Welcome to Sustaina!');
                };
            }
        });

        document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
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
                document.getElementById('successModalButton').onclick = function () {
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
            button.addEventListener('click', function () {
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
            toggle.addEventListener('click', function () {
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

        passwordInput.addEventListener('input', function () {
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

        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function () {
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
        dashboardPreviewClose.addEventListener('click', function () {
            dashboardPreview.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Dashboard habit checkboxes
        document.querySelectorAll('.dashboard-habit-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                // Update progress bar
                updateHabitProgress();

                if (this.checked) {
                    // Show success toast
                    showToast('success', 'Habit Completed', 'You earned XP for completing this habit!');
                }
            });
        });

        // Dashboard logout button
        document.querySelector('.dashboard-logout').addEventListener('click', function () {
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
                            title: function (tooltipItems) {
                                return tooltipItems[0].label;
                            },
                            label: function (context) {
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
        toast.querySelector('.toast-close').addEventListener('click', function () {
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
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    editIndex = index;
                    editSection.style.display = 'block';
                    wInput.value = water[index];
                    eInput.value = exercise[index];
                    bInput.value = bloodsugar[index];
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function () {
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
        document.getElementById('editSubmit').addEventListener('click', function () {
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

        document.getElementById('editCancel').addEventListener('click', function () {
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
    window.deleteAction = function (i) {
        actions.splice(i, 1);
        localStorage.setItem('ecoActions', JSON.stringify(actions));
        renderActions();
    };

    // Hook up quick track input
    document.querySelector('.quick-track button').addEventListener('click', function () {
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
    document.getElementById('photoUpload').addEventListener('click', function () {
        this.querySelector('input[type="file"]').click();
    });
    document.getElementById('photoUpload').querySelector('input[type="file"]').addEventListener('change', function (e) {
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
    addAction = function (action) {
        oldAddAction(action);
        renderChart();
    };

    // Eco-Friendly Challenges Dynamic Rendering
    (function () {
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
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('join-challenge-btn')) {
                alert('You joined the challenge!');
            }
        });
    })();


    navbarToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
};

// Features tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.features-tab-btn');
    const tabPanes = document.querySelectorAll('.features-tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
});

// Preloader functionality
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toast notification system
const toastContainer = document.getElementById('toastContainer');

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);

            // Main JavaScript for Sustaina website

            // DOM Content Loaded - Initialize everything
            document.addEventListener('DOMContentLoaded', function () {
                initScrollAnimations();
                initAuthSystem();
                initHabitTracker();
                initQuoteGenerator();
                loadDietExercisePlanner();
                highlightCurrentNavItem();
            });

            // Scroll animations for landing page
            function initScrollAnimations() {
                const reveals = document.querySelectorAll('.reveal');
                window.addEventListener('scroll', function () {
                    reveals.forEach(reveal => {
                        const windowHeight = window.innerHeight;
                        const revealTop = reveal.getBoundingClientRect().top;
                        if (revealTop < windowHeight - 100) {
                            reveal.classList.add('active');
                        }
                    });
                });
            }

            // Authentication System (Login/Signup)
            function initAuthSystem() {
                const loginForm = document.getElementById('loginForm');
                const signupForm = document.getElementById('signupForm');
                const loginToggle = document.getElementById('login-toggle');
                const signupToggle = document.getElementById('signup-toggle');
                const loginBtn = document.getElementById('login-btn');
                const signupBtn = document.getElementById('signup-btn');

                // Toggle between login and signup forms
                if (loginToggle && signupToggle) {
                    loginToggle.addEventListener('click', function (e) {
                        e.preventDefault();
                        loginForm.style.display = 'block';
                        signupForm.style.display = 'none';
                    });

                    signupToggle.addEventListener('click', function (e) {
                        e.preventDefault();
                        loginForm.style.display = 'none';
                        signupForm.style.display = 'block';
                    });
                }

                // Handle login
                if (loginForm) {
                    loginForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const username = document.getElementById('login-username').value;
                        const password = document.getElementById('login-password').value;

                        const storedUsername = localStorage.getItem('sustaina_username');
                        const storedPassword = localStorage.getItem('sustaina_password');

                        if (username === storedUsername && password === storedPassword) {
                            localStorage.setItem('sustaina_logged_in', 'true');
                            alert('Login successful!');
                            window.location.href = 'dashboard.html'; // Redirect to dashboard
                        } else {
                            alert('Invalid username or password.');
                        }
                    });
                }

                // Handle signup
                if (signupForm) {
                    signupForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const username = document.getElementById('signup-username').value;
                        const email = document.getElementById('signup-email').value;
                        const password = document.getElementById('signup-password').value;
                        const confirmPassword = document.getElementById('signup-confirm').value;

                        if (password !== confirmPassword) {
                            alert('Passwords do not match.');
                            return;
                        }

                        localStorage.setItem('sustaina_username', username);
                        localStorage.setItem('sustaina_email', email);
                        localStorage.setItem('sustaina_password', password);
                        alert('Signup successful! Please log in.');
                        loginForm.style.display = 'block';
                        signupForm.style.display = 'none';
                    });
                }
            }

            // Initialize user profile with default values
            function initUserProfile(username) {
                const userData = {
                    username: username,
                    level: 1,
                    xp: 0,
                    xpToNextLevel: 100,
                    title: 'Eco Novice',
                    streakDays: 0,
                    habits: [
                        { id: 1, name: 'Drink 2L water', category: 'health', completed: false, streak: 0 },
                        { id: 2, name: 'Use reusable bottle', category: 'eco', completed: false, streak: 0 },
                        { id: 3, name: '15 min exercise', category: 'health', completed: false, streak: 0 },
                        { id: 4, name: 'Reduce plastic', category: 'eco', completed: false, streak: 0 }
                    ],
                    rewards: []
                };

                localStorage.setItem('sustaina_user_data', JSON.stringify(userData));
            }

            // Check if user is logged in
            function checkLoginStatus() {
                const loggedIn = localStorage.getItem('sustaina_logged_in') === 'true';
                const authLinks = document.getElementById('auth-links');
                const userLinks = document.getElementById('user-links');
                const loginPage = document.querySelector('.auth-container');
                const dashboardPage = document.querySelector('.dashboard-container');

                if (authLinks && userLinks) {
                    if (loggedIn) {
                        authLinks.style.display = 'none';
                        userLinks.style.display = 'flex';

                        // Update username display
                        const usernameDisplay = document.getElementById('username-display');
                        if (usernameDisplay) {
                            usernameDisplay.textContent = localStorage.getItem('sustaina_username');
                        }
                    } else {
                        authLinks.style.display = 'flex';
                        userLinks.style.display = 'none';
                    }
                }

                // Redirect if needed
                if (loginPage && loggedIn) {
                    window.location.href = 'dashboard.html';
                }

                if (dashboardPage && !loggedIn) {
                    window.location.href = 'login.html';
                }
            }

            // Logout functionality
            function logout() {
                localStorage.setItem('sustaina_logged_in', 'false');
                window.location.href = 'index.html';
            }

            // Add logout event listener
            document.addEventListener('DOMContentLoaded', function () {
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', logout);
                }
            });

            // Habit Tracker System
            function initHabitTracker() {
                const habitList = document.getElementById('habitsList'); // Corrected ID
                if (!habitList) return;

                // Load user data
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data')) || {};

                if (!userData.habits) return;

                // Clear existing habits
                habitList.innerHTML = '';

                // Add habits to the list
                userData.habits.forEach(habit => {
                    const habitItem = document.createElement('div');
                    habitItem.className = `habit-item ${habit.category}`;
                    habitItem.dataset.id = habit.id;

                    // Get streak emoji
                    const streakEmoji = getStreakEmoji(habit.streak);

                    habitItem.innerHTML = `
            <div class="habit-info">
                <h3>${habit.name}</h3>
                <div class="habit-streak">
                    <span class="streak-emoji">${streakEmoji}</span>
                    <span class="streak-count">${habit.streak} day${habit.streak !== 1 ? 's' : ''}</span>
                </div>
            </div>
            <div class="habit-actions">
                <button class="habit-complete-btn ${habit.completed ? 'completed' : ''}">
                    ${habit.completed ? 'Completed' : 'Complete'}
                </button>
            </div>
        `;

                    habitList.appendChild(habitItem);

                    // Add event listener to complete button
                    const completeBtn = habitItem.querySelector('.habit-complete-btn');
                    completeBtn.addEventListener('click', function () {
                        toggleHabitCompletion(habit.id);
                    });
                });

                // Add New Habit Button
                const addHabitBtn = document.getElementById('add-habit-btn');
                const addHabitForm = document.getElementById('add-habit-form');
                const addHabitModal = document.getElementById('addHabitModal');
                const closeAddHabitModal = document.getElementById('closeAddHabitModal');

                if (addHabitBtn && addHabitForm) {
                    addHabitBtn.addEventListener('click', function () {
                        addHabitForm.style.display = addHabitForm.style.display === 'block' ? 'none' : 'block';
                    });

                    // Handle new habit submission
                    addHabitForm.addEventListener('submit', function (e) {
                        e.preventDefault();

                        const habitName = document.getElementById('habit-name').value;
                        const habitCategory = document.getElementById('habit-category').value;

                        if (habitName && habitCategory) {
                            addNewHabit(habitName, habitCategory);
                            addHabitForm.style.display = 'none';
                            document.getElementById('habit-name').value = '';
                        }
                    });
                }
            }

            // Add Habit Modal Functionality
            document.addEventListener('DOMContentLoaded', function () {
                const addHabitBtn = document.getElementById('addHabitBtn');
                const addHabitModal = document.getElementById('addHabitModal');
                const closeAddHabitModal = document.getElementById('closeAddHabitModal');

                if (addHabitBtn && addHabitModal && closeAddHabitModal) {
                    addHabitBtn.addEventListener('click', () => {
                        addHabitModal.style.display = 'flex';
                    });

                    closeAddHabitModal.addEventListener('click', () => {
                        addHabitModal.style.display = 'none';
                    });

                    window.addEventListener('click', (e) => {
                        if (e.target === addHabitModal) {
                            addHabitModal.style.display = 'none';
                        }
                    });
                }
            });

            // Toggle Habit Completion
            function toggleHabitCompletion(habitId) {
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data'));
                const habit = userData.habits.find(h => h.id === habitId);

                if (!habit) return;

                habit.completed = !habit.completed;
                habit.streak = habit.completed ? habit.streak + 1 : Math.max(habit.streak - 1, 0);

                userData.xp += habit.completed ? 10 : -10;
                userData.xp = Math.max(userData.xp, 0);

                localStorage.setItem('sustaina_user_data', JSON.stringify(userData));
                initHabitTracker();
                updateProfileInfo();
            }

            // Add a new habit
            function addNewHabit(name, category) {
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data'));

                // Get the next habit ID
                const nextId = userData.habits.length > 0 ?
                    Math.max(...userData.habits.map(h => h.id)) + 1 : 1;

                // Create new habit object
                const newHabit = {
                    id: nextId,
                    name: name,
                    category: category,
                    completed: false,
                    streak: 0
                };

                // Add to user data
                userData.habits.push(newHabit);

                // Save updated user data
                localStorage.setItem('sustaina_user_data', JSON.stringify(userData));

                // Refresh habit tracker display
                initHabitTracker();
                showNotification('New habit added!', 'success');
            }

            // Get streak emoji based on streak count
            function getStreakEmoji(streak) {
                if (streak === 0) return '🌱'; // New
                if (streak < 3) return '🌱'; // New
                if (streak < 7) return '🌿'; // 3-day
                if (streak < 30) return '🪴'; // 7-day
                return '🌳'; // 30-day
            }

            // Check if user leveled up
            function checkLevelUp(userData) {
                if (userData.xp >= userData.xpToNextLevel) {
                    userData.level += 1;
                    userData.xp -= userData.xpToNextLevel;
                    userData.xpToNextLevel = Math.floor(userData.xpToNextLevel * 1.5);

                    // Update user title based on level
                    updateUserTitle(userData);

                    // Add rewards for level up
                    addLevelUpReward(userData);

                    showNotification(`Congratulations! You've reached level ${userData.level}!`, 'success');
                }
            }

            // Update user title based on level
            function updateUserTitle(userData) {
                const titles = [
                    'Eco Novice',
                    'Green Apprentice',
                    'Sustainability Initiate',
                    'Eco Warrior',
                    'Earth Guardian',
                    'Sustainability Champion',
                    'Planet Protector',
                    'Eco Master',
                    'Environmental Guru',
                    'Sustainability Legend'
                ];

                const titleIndex = Math.min(userData.level - 1, titles.length - 1);
                userData.title = titles[titleIndex];
            }

            // Add level up reward
            function addLevelUpReward(userData) {
                const rewards = [
                    '15% off eco-friendly products',
                    'Free reusable water bottle',
                    '20% off organic groceries',
                    'Free yoga class pass',
                    'Eco-friendly tote bag',
                    'Plant a tree in your name',
                    'Free month of meditation app',
                    'Sustainable snack box',
                    'Bamboo utensil set',
                    'Solar phone charger'
                ];

                // Get a reward based on level
                const rewardIndex = (userData.level - 1) % rewards.length;
                const newReward = {
                    id: userData.rewards.length + 1,
                    name: rewards[rewardIndex],
                    claimed: false
                };

                userData.rewards.push(newReward);
            }

            // Check rewards section
            function checkRewards() {
                const rewardsContainer = document.getElementById('rewards-container');
                if (!rewardsContainer) return;

                // Load user data
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data')) || {};

                if (!userData.rewards || userData.rewards.length === 0) {
                    rewardsContainer.innerHTML = '<p>Level up to earn rewards!</p>';
                    return;
                }

                // Clear existing rewards
                rewardsContainer.innerHTML = '';

                // Add rewards
                userData.rewards.forEach(reward => {
                    const rewardItem = document.createElement('div');
                    rewardItem.className = `reward-item ${reward.claimed ? 'claimed' : ''}`;
                    rewardItem.dataset.id = reward.id;

                    rewardItem.innerHTML = `
            <h3>${reward.name}</h3>
            <button class="reward-claim-btn" ${reward.claimed ? 'disabled' : ''}>
                ${reward.claimed ? 'Claimed' : 'Claim'}
            </button>
        `;

                    rewardsContainer.appendChild(rewardItem);

                    // Add event listener to claim button
                    const claimBtn = rewardItem.querySelector('.reward-claim-btn');
                    claimBtn.addEventListener('click', function () {
                        claimReward(reward.id);
                    });
                });
            }

            // Claim a reward
            function claimReward(rewardId) {
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data'));
                const reward = userData.rewards.find(r => r.id === rewardId);

                if (!reward || reward.claimed) return;

                // Mark as claimed
                reward.claimed = true;

                // Save updated user data
                localStorage.setItem('sustaina_user_data', JSON.stringify(userData));

                // Refresh rewards display
                checkRewards();
                showNotification('Reward claimed! Check your profile for details.', 'success');
            }

            // Update profile information
            function updateProfileInfo() {
                const profileContainer = document.getElementById('profile-container');
                if (!profileContainer) return;

                // Load user data
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data')) || {};

                // Calculate XP percentage for progress bar
                const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;

                // Update profile info
                const usernameDisplay = document.getElementById('profile-username');
                const levelDisplay = document.getElementById('profile-level');
                const titleDisplay = document.getElementById('profile-title');
                const streakDisplay = document.getElementById('profile-streak');
                const xpProgressBar = document.getElementById('xp-progress-bar');
                const xpText = document.getElementById('xp-text');

                if (usernameDisplay) usernameDisplay.textContent = userData.username || 'User';
                if (levelDisplay) levelDisplay.textContent = userData.level || 1;
                if (titleDisplay) titleDisplay.textContent = userData.title || 'Eco Novice';

                if (streakDisplay) {
                    // Calculate longest streak
                    const longestStreak = userData.habits && userData.habits.length > 0 ?
                        Math.max(...userData.habits.map(h => h.streak)) : 0;

                    const streakEmoji = getStreakEmoji(longestStreak);
                    streakDisplay.innerHTML = `${streakEmoji} ${longestStreak} day${longestStreak !== 1 ? 's' : ''}`;
                }

                if (xpProgressBar) xpProgressBar.style.width = `${xpPercentage}%`;
                if (xpText) xpText.textContent = `${userData.xp} / ${userData.xpToNextLevel} XP`;
            }

            // Profile system initialization
            function initProfileSystem() {
                // Check if user data exists
                const userData = JSON.parse(localStorage.getItem('sustaina_user_data'));
                if (!userData && localStorage.getItem('sustaina_logged_in') === 'true') {
                    // Create default profile if logged in but no data
                    initUserProfile(localStorage.getItem('sustaina_username'));
                }

                // Update profile info
                updateProfileInfo();
            }

            // Quote Generator
            function initQuoteGenerator() {
                const quotes = [
                    { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
                    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" }
                ];

                const quoteContainer = document.getElementById('dailyQuote');
                const newQuoteBtn = document.getElementById('newQuoteBtn');

                function displayRandomQuote() {
                    const randomIndex = Math.floor(Math.random() * quotes.length);
                    const quote = quotes[randomIndex];
                    quoteContainer.innerHTML = `"${quote.text}" — ${quote.author}`;
                }

                if (newQuoteBtn) {
                    newQuoteBtn.addEventListener('click', displayRandomQuote);
                }

                displayRandomQuote();
            }

            // Diet and Exercise Planner
            function loadDietExercisePlanner() {
                const plannerTabs = document.querySelectorAll('.planner-tab');
                const dietPlanner = document.getElementById('dietPlanner');
                const exercisePlanner = document.getElementById('exercisePlanner');

                if (plannerTabs && dietPlanner && exercisePlanner) {
                    plannerTabs.forEach(tab => {
                        tab.addEventListener('click', () => {
                            plannerTabs.forEach(t => t.classList.remove('active'));
                            tab.classList.add('active');

                            if (tab.dataset.planner === 'diet') {
                                dietPlanner.classList.add('active');
                                exercisePlanner.classList.remove('active');
                            } else {
                                exercisePlanner.classList.add('active');
                                dietPlanner.classList.remove('active');
                            }
                        });
                    });
                }
            }

            // Show notification
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.textContent = message;

                // Add to body
                document.body.appendChild(notification);

                // Show notification
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);

                // Remove after 3 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                        ee16b433a43845e8e6e9c532814a5a1e49a222a0
                    }, 300);
                }, 3000);
            }


            // Export functions for use in other modules
            window.showToast = showToast;

            // Highlight current navigation item
            function highlightCurrentNavItem() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-links a');

                window.addEventListener('scroll', () => {
                    let currentSection = '';

                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 60; // Adjust for navbar height
                        if (window.scrollY >= sectionTop) {
                            currentSection = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').includes(currentSection)) {
                            link.classList.add('active');
                        }
                    });
                });
            }

            // Logout button event listener
            document.addEventListener('click', function (e) {
                if (e.target && e.target.id === 'logout-btn') {
                    logout();
                }
            });

            // Reset data button (for development purposes)
            document.addEventListener('click', function (e) {
                if (e.target && e.target.id === 'reset-data-btn') {
                    localStorage.removeItem('sustaina_user_data');
                    localStorage.setItem('sustaina_logged_in', 'false');
                    window.location.reload();
                }
            });
