<<<<<<< HEAD
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
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

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
});

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
=======
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
document.addEventListener('DOMContentLoaded', function() {
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
        completeBtn.addEventListener('click', function() {
            toggleHabitCompletion(habit.id);
        });
    });
    
    // Add New Habit Button
    const addHabitBtn = document.getElementById('add-habit-btn');
    const addHabitForm = document.getElementById('add-habit-form');
    const addHabitModal = document.getElementById('addHabitModal');
    const closeAddHabitModal = document.getElementById('closeAddHabitModal');
    
    if (addHabitBtn && addHabitForm) {
        addHabitBtn.addEventListener('click', function() {
            addHabitForm.style.display = addHabitForm.style.display === 'block' ? 'none' : 'block';
        });
        
        // Handle new habit submission
        addHabitForm.addEventListener('submit', function(e) {
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
        claimBtn.addEventListener('click', function() {
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
>>>>>>> ee16b433a43845e8e6e9c532814a5a1e49a222a0
        }, 300);
    }, 3000);
}

<<<<<<< HEAD
// Export functions for use in other modules
window.showToast = showToast;
=======
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
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'logout-btn') {
        logout();
    }
});

// Reset data button (for development purposes)
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'reset-data-btn') {
        localStorage.removeItem('sustaina_user_data');
        localStorage.setItem('sustaina_logged_in', 'false');
        window.location.reload();
    }
});
>>>>>>> ee16b433a43845e8e6e9c532814a5a1e49a222a0
