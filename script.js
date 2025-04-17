// Main JavaScript for Sustaina website

// DOM Content Loaded - Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initScrollAnimations();
    initAuthSystem();
    initHabitTracker();
    initQuoteGenerator();
    initProfileSystem();
    loadDietExercisePlanner();
    checkRewards();
    
    // Add active class to current nav item
    highlightCurrentNavItem();
});

// Scroll animations for landing page
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
}

// Authentication System (Sign Up / Login)
function initAuthSystem() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const authSection = document.getElementById('auth-section');
    
    // Skip if not on a page with auth
    if (!authSection) return;
    
    // Toggle between login/signup forms
    if (loginToggle && signupToggle) {
        loginToggle.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        });
        
        signupToggle.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
    }
    
    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            if (username && password) {
                // Store in localStorage (for demo purposes only - not secure)
                localStorage.setItem('sustaina_username', username);
                localStorage.setItem('sustaina_logged_in', 'true');
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showNotification('Please fill in all fields', 'error');
            }
        });
    }
    
    // Handle signup
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;
            
            if (username && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    showNotification('Passwords do not match', 'error');
                    return;
                }
                
                // Store user data (for demo purposes only - not secure)
                localStorage.setItem('sustaina_username', username);
                localStorage.setItem('sustaina_email', email);
                localStorage.setItem('sustaina_logged_in', 'true');
                
                // Initialize user profile
                initUserProfile(username);
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showNotification('Please fill in all fields', 'error');
            }
        });
    }
    
    // Check login status
    checkLoginStatus();
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
    const habitList = document.getElementById('habit-list');
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

// Toggle habit completion
function toggleHabitCompletion(habitId) {
    const userData = JSON.parse(localStorage.getItem('sustaina_user_data'));
    const habit = userData.habits.find(h => h.id === habitId);
    
    if (!habit) return;
    
    // Update completion status
    habit.completed = !habit.completed;
    
    if (habit.completed) {
        // Increment streak
        habit.streak += 1;
        
        // Add XP for completing a habit
        userData.xp += 10;
        
        // Check if user leveled up
        checkLevelUp(userData);
        
        showNotification(`${habit.name} completed! +10 XP`, 'success');
    } else {
        // Reset streak if uncompleting
        habit.streak -= 1;
        if (habit.streak < 0) habit.streak = 0;
        
        // Remove XP
        userData.xp -= 10;
        if (userData.xp < 0) userData.xp = 0;
        
        showNotification(`${habit.name} marked incomplete`, 'info');
    }
    
    // Save updated user data
    localStorage.setItem('sustaina_user_data', JSON.stringify(userData));
    
    // Refresh habit tracker display
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
    const quoteContainer = document.getElementById('quote-container');
    if (!quoteContainer) return;
    
    const quotes = [
        {
            text: "The greatest threat to our planet is the belief that someone else will save it.",
            author: "Robert Swan"
        },
        {
            text: "We don't need a handful of people doing zero waste perfectly. We need millions doing it imperfectly.",
            author: "Anne-Marie Bonneau"
        },
        {
            text: "Health is a state of complete physical, mental and social well-being.",
            author: "World Health Organization"
        },
        {
            text: "Take care of your body. It's the only place you have to live.",
            author: "Jim Rohn"
        },
        {
            text: "The Earth is what we all have in common.",
            author: "Wendell Berry"
        },
        {
            text: "One step at a time is all it takes to get you there.",
            author: "Emily Dickinson"
        },
        {
            text: "Small changes can make a big difference.",
            author: "Sustainably Yours"
        },
        {
            text: "The best time to plant a tree was 20 years ago. The second best time is now.",
            author: "Chinese Proverb"
        },
        {
            text: "Your health is an investment, not an expense.",
            author: "Anonymous"
        },
        {
            text: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
            author: "Jane Goodall"
        }
    ];
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Update quote display
    quoteContainer.innerHTML = `
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-author">— ${quote.author}</p>
    `;
    
    // Refresh quote button
    const refreshQuoteBtn = document.getElementById('refresh-quote');
    if (refreshQuoteBtn) {
        refreshQuoteBtn.addEventListener('click', initQuoteGenerator);
    }
}

// Diet and Exercise Planner
function loadDietExercisePlanner() {
    const plannerContainer = document.getElementById('planner-container');
    if (!plannerContainer) return;
    
    // Default exercise plans
    const exercises = [
        { day: 'Monday', activity: 'Cardio (30 min)', intensity: 'Medium' },
        { day: 'Tuesday', activity: 'Strength Training', intensity: 'High' },
        { day: 'Wednesday', activity: 'Yoga/Stretching', intensity: 'Low' },
        { day: 'Thursday', activity: 'Rest Day', intensity: 'None' },
        { day: 'Friday', activity: 'HIIT Training', intensity: 'High' },
        { day: 'Saturday', activity: 'Outdoor Walk/Run', intensity: 'Medium' },
        { day: 'Sunday', activity: 'Active Recovery', intensity: 'Low' }
    ];
    
    // Default diet plan
    const meals = [
        { meal: 'Breakfast', suggestion: 'Oatmeal with berries', ecoImpact: 'Low' },
        { meal: 'Lunch', suggestion: 'Grain bowl with vegetables', ecoImpact: 'Low' },
        { meal: 'Dinner', suggestion: 'Plant-based protein with vegetables', ecoImpact: 'Low' },
        { meal: 'Snacks', suggestion: 'Nuts, fruits, vegetables', ecoImpact: 'Low' }
    ];
    
    // Create exercise table
    const exerciseTable = document.createElement('div');
    exerciseTable.className = 'planner-table';
    exerciseTable.innerHTML = `
        <h3>Weekly Exercise Plan</h3>
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Activity</th>
                    <th>Intensity</th>
                </tr>
            </thead>
            <tbody id="exercise-tbody">
                ${exercises.map(ex => `
                    <tr>
                        <td>${ex.day}</td>
                        <td>${ex.activity}</td>
                        <td>${ex.intensity}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Create meal table
    const mealTable = document.createElement('div');
    mealTable.className = 'planner-table';
    mealTable.innerHTML = `
        <h3>Daily Meal Plan</h3>
        <table>
            <thead>
                <tr>
                    <th>Meal</th>
                    <th>Suggestion</th>
                    <th>Eco Impact</th>
                </tr>
            </thead>
            <tbody id="meal-tbody">
                ${meals.map(m => `
                    <tr>
                        <td>${m.meal}</td>
                        <td>${m.suggestion}</td>
                        <td>${m.ecoImpact}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    // Add tables to planner container
    plannerContainer.innerHTML = '';
    plannerContainer.appendChild(exerciseTable);
    plannerContainer.appendChild(mealTable);
    
    // Add customize button
    const customizeBtn = document.createElement('button');
    customizeBtn.className = 'btn btn-primary';
    customizeBtn.textContent = 'Customize Plan';
    customizeBtn.addEventListener('click', function() {
        showNotification('Customization feature coming soon!', 'info');
    });
    
    plannerContainer.appendChild(customizeBtn);
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
        }, 300);
    }, 3000);
}

// Highlight current navigation item
function highlightCurrentNavItem() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.includes(linkPath) && linkPath !== '#' && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPage.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (currentPage.endsWith('index.html') && linkPath === 'index.html') {
            link.classList.add('active');
        }
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