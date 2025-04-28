// ShapeUp Club JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeNavigation();
    initializeAnimations();
    initializeWorkoutCategories();
    initializeNutritionTracking();
    initializeProgressTracking();
    initializeCommunityFeatures();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Add click event listeners for navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active link
                navbarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements with animation classes
    document.querySelectorAll('.feature-card, .workout-category, .nutrition-feature, .progress-feature, .community-feature').forEach(el => {
        observer.observe(el);
    });
}

// Workout categories functionality
function initializeWorkoutCategories() {
    const workoutCategories = document.querySelectorAll('.workout-category');
    
    workoutCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryName = category.querySelector('h3').textContent;
            showWorkoutDetails(categoryName);
        });
    });
}

function showWorkoutDetails(categoryName) {
    // Create and show modal with workout details
    const modal = document.createElement('div');
    modal.className = 'workout-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${categoryName} Workouts</h2>
            <div class="workout-list">
                ${getWorkoutList(categoryName)}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getWorkoutList(category) {
    // Sample workout data - in a real app, this would come from a database
    const workouts = {
        'Strength Training': [
            { name: 'Beginner Strength', duration: '30 min', level: 'Beginner' },
            { name: 'Intermediate Power', duration: '45 min', level: 'Intermediate' },
            { name: 'Advanced Strength', duration: '60 min', level: 'Advanced' }
        ],
        'Cardio': [
            { name: 'HIIT Cardio', duration: '20 min', level: 'Intermediate' },
            { name: 'Steady State Cardio', duration: '30 min', level: 'Beginner' },
            { name: 'Advanced Cardio', duration: '45 min', level: 'Advanced' }
        ],
        'Flexibility': [
            { name: 'Basic Stretching', duration: '15 min', level: 'Beginner' },
            { name: 'Yoga Flow', duration: '30 min', level: 'Intermediate' },
            { name: 'Advanced Flexibility', duration: '45 min', level: 'Advanced' }
        ]
    };

    return workouts[category]?.map(workout => `
        <div class="workout-item">
            <h3>${workout.name}</h3>
            <p>Duration: ${workout.duration}</p>
            <p>Level: ${workout.level}</p>
            <button class="btn btn-primary">Start Workout</button>
        </div>
    `).join('') || '<p>No workouts available for this category.</p>';
}

// Nutrition tracking functionality
function initializeNutritionTracking() {
    // Add click handlers for nutrition features
    const nutritionFeatures = document.querySelectorAll('.nutrition-feature');
    
    nutritionFeatures.forEach(feature => {
        feature.addEventListener('click', () => {
            const featureName = feature.querySelector('h3').textContent;
            showNutritionDetails(featureName);
        });
    });
}

function showNutritionDetails(featureName) {
    // Create and show modal with nutrition details
    const modal = document.createElement('div');
    modal.className = 'nutrition-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${featureName}</h2>
            <div class="nutrition-content">
                ${getNutritionContent(featureName)}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getNutritionContent(feature) {
    // Sample nutrition content - in a real app, this would come from a database
    const content = {
        'Calorie Tracking': `
            <div class="nutrition-tracker">
                <h3>Track Your Daily Calories</h3>
                <div class="calorie-input">
                    <input type="number" placeholder="Enter calories" id="calorieInput">
                    <button class="btn btn-primary" onclick="addCalories()">Add</button>
                </div>
                <div class="calorie-summary">
                    <p>Daily Goal: 2000 calories</p>
                    <p>Consumed: <span id="consumedCalories">0</span> calories</p>
                    <p>Remaining: <span id="remainingCalories">2000</span> calories</p>
                </div>
            </div>
        `,
        'Meal Plans': `
            <div class="meal-plans">
                <h3>Your Personalized Meal Plan</h3>
                <div class="meal-plan-list">
                    <div class="meal-plan-item">
                        <h4>Breakfast</h4>
                        <p>Oatmeal with fruits and nuts</p>
                        <p>Calories: 350</p>
                    </div>
                    <div class="meal-plan-item">
                        <h4>Lunch</h4>
                        <p>Grilled chicken salad</p>
                        <p>Calories: 450</p>
                    </div>
                    <div class="meal-plan-item">
                        <h4>Dinner</h4>
                        <p>Salmon with vegetables</p>
                        <p>Calories: 550</p>
                    </div>
                </div>
            </div>
        `,
        'Recipe Library': `
            <div class="recipe-library">
                <h3>Healthy Recipes</h3>
                <div class="recipe-grid">
                    <div class="recipe-card">
                        <img src="https://i.imgur.com/tKg0DvZ.png" alt="Healthy Recipe">
                        <h4>Protein Bowl</h4>
                        <p>Calories: 450</p>
                        <button class="btn btn-outline">View Recipe</button>
                    </div>
                    <div class="recipe-card">
                        <img src="https://i.imgur.com/sFvQoQm.png" alt="Healthy Recipe">
                        <h4>Green Smoothie</h4>
                        <p>Calories: 250</p>
                        <button class="btn btn-outline">View Recipe</button>
                    </div>
                </div>
            </div>
        `
    };

    return content[feature] || '<p>Content not available.</p>';
}

// Progress tracking functionality
function initializeProgressTracking() {
    // Add click handlers for progress features
    const progressFeatures = document.querySelectorAll('.progress-feature');
    
    progressFeatures.forEach(feature => {
        feature.addEventListener('click', () => {
            const featureName = feature.querySelector('h3').textContent;
            showProgressDetails(featureName);
        });
    });
}

function showProgressDetails(featureName) {
    // Create and show modal with progress details
    const modal = document.createElement('div');
    modal.className = 'progress-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${featureName}</h2>
            <div class="progress-content">
                ${getProgressContent(featureName)}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getProgressContent(feature) {
    // Sample progress content - in a real app, this would come from a database
    const content = {
        'Weight Tracking': `
            <div class="weight-tracker">
                <h3>Track Your Weight</h3>
                <div class="weight-input">
                    <input type="number" placeholder="Enter weight (kg)" id="weightInput">
                    <button class="btn btn-primary" onclick="addWeight()">Add</button>
                </div>
                <div class="weight-chart">
                    <canvas id="weightChart"></canvas>
                </div>
            </div>
        `,
        'Performance Analytics': `
            <div class="performance-analytics">
                <h3>Your Performance Stats</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>Workouts Completed</h4>
                        <p class="stat-number">24</p>
                    </div>
                    <div class="stat-card">
                        <h4>Total Minutes</h4>
                        <p class="stat-number">720</p>
                    </div>
                    <div class="stat-card">
                        <h4>Calories Burned</h4>
                        <p class="stat-number">12,500</p>
                    </div>
                </div>
            </div>
        `,
        'Achievements': `
            <div class="achievements">
                <h3>Your Achievements</h3>
                <div class="achievement-grid">
                    <div class="achievement-card">
                        <i class="fas fa-trophy"></i>
                        <h4>First Workout</h4>
                        <p>Completed your first workout</p>
                    </div>
                    <div class="achievement-card">
                        <i class="fas fa-medal"></i>
                        <h4>7 Day Streak</h4>
                        <p>Worked out for 7 days in a row</p>
                    </div>
                    <div class="achievement-card">
                        <i class="fas fa-star"></i>
                        <h4>Weight Goal</h4>
                        <p>Reached your weight goal</p>
                    </div>
                </div>
            </div>
        `
    };

    return content[feature] || '<p>Content not available.</p>';
}

// Community features functionality
function initializeCommunityFeatures() {
    // Add click handlers for community features
    const communityFeatures = document.querySelectorAll('.community-feature');
    
    communityFeatures.forEach(feature => {
        feature.addEventListener('click', () => {
            const featureName = feature.querySelector('h3').textContent;
            showCommunityDetails(featureName);
        });
    });
}

function showCommunityDetails(featureName) {
    // Create and show modal with community details
    const modal = document.createElement('div');
    modal.className = 'community-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${featureName}</h2>
            <div class="community-content">
                ${getCommunityContent(featureName)}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getCommunityContent(feature) {
    // Sample community content - in a real app, this would come from a database
    const content = {
        'Discussion Forums': `
            <div class="forums">
                <h3>Latest Discussions</h3>
                <div class="forum-list">
                    <div class="forum-item">
                        <h4>Best exercises for beginners?</h4>
                        <p>Started by: John Doe</p>
                        <p>Replies: 15</p>
                    </div>
                    <div class="forum-item">
                        <h4>Nutrition tips for muscle gain</h4>
                        <p>Started by: Jane Smith</p>
                        <p>Replies: 23</p>
                    </div>
                </div>
            </div>
        `,
        'Group Challenges': `
            <div class="challenges">
                <h3>Active Challenges</h3>
                <div class="challenge-list">
                    <div class="challenge-item">
                        <h4>30 Day Fitness Challenge</h4>
                        <p>Participants: 150</p>
                        <p>Days Left: 15</p>
                        <button class="btn btn-primary">Join Challenge</button>
                    </div>
                    <div class="challenge-item">
                        <h4>Weight Loss Warriors</h4>
                        <p>Participants: 89</p>
                        <p>Days Left: 7</p>
                        <button class="btn btn-primary">Join Challenge</button>
                    </div>
                </div>
            </div>
        `,
        'Progress Sharing': `
            <div class="progress-sharing">
                <h3>Community Progress</h3>
                <div class="progress-feed">
                    <div class="progress-post">
                        <img src="https://i.imgur.com/8LWTHYs.jpg" alt="User">
                        <div class="post-content">
                            <h4>Sarah Johnson</h4>
                            <p>Just completed my first 5K run! 🏃‍♀️</p>
                            <div class="post-actions">
                                <button class="btn btn-outline">Like</button>
                                <button class="btn btn-outline">Comment</button>
                            </div>
                        </div>
                    </div>
                    <div class="progress-post">
                        <img src="https://i.imgur.com/Gs8JgcP.jpg" alt="User">
                        <div class="post-content">
                            <h4>Michael Rodriguez</h4>
                            <p>Hit my weight loss goal today! 💪</p>
                            <div class="post-actions">
                                <button class="btn btn-outline">Like</button>
                                <button class="btn btn-outline">Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    return content[feature] || '<p>Content not available.</p>';
}

// Utility functions
function addCalories() {
    const input = document.getElementById('calorieInput');
    const consumed = document.getElementById('consumedCalories');
    const remaining = document.getElementById('remainingCalories');
    
    if (input.value) {
        const calories = parseInt(input.value);
        const currentConsumed = parseInt(consumed.textContent);
        const newConsumed = currentConsumed + calories;
        const newRemaining = 2000 - newConsumed;
        
        consumed.textContent = newConsumed;
        remaining.textContent = newRemaining;
        input.value = '';
    }
}

function addWeight() {
    const input = document.getElementById('weightInput');
    
    if (input.value) {
        const weight = parseFloat(input.value);
        // In a real app, this would save to a database
        console.log('Weight added:', weight);
        input.value = '';
    }
} 