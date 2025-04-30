// Initialize profile.js
console.log('Initializing profile.js...');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize challenges if not defined
    if (typeof challenges === 'undefined') {
        window.challenges = [
            {
                id: 1,
                title: 'Zero Waste Week',
                description: 'Go one week without producing any non-recyclable waste',
                points: 100,
                icon: 'fa-recycle'
            },
            {
                id: 2,
                title: 'Energy Saver',
                description: 'Reduce your energy consumption by 20% this month',
                points: 75,
                icon: 'fa-bolt'
            },
            {
                id: 3,
                title: 'Green Transport',
                description:'Use only eco-friendly transportation for a week',
                points: 50,
                icon: 'fa-bicycle'
            }
        ];
    }

    // Initialize required functions if not defined
    if (typeof getChallengeState !== 'function') {
        window.getChallengeState = function(challengeId) {
            const states = JSON.parse(localStorage.getItem('challengeStates') || '{}');
            return states[challengeId] || { completed: false, progress: 0 };
        };
    }

    if (typeof showChallengeModal !== 'function') {
        window.showChallengeModal = function(challengeId) {
            console.log('Challenge modal clicked:', challengeId);
        };
    }

    // Get current user from auth storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Initialize user profile with logged in user data or default guest data
    const user = currentUser || {
        fullName: 'Guest User',
        email: 'guest@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=random',
        level: 1,
        points: 0,
        badges: []
    };

    // Update profile display with user information
    const profileName = document.getElementById('profileName');
    const profilePicture = document.getElementById('profilePicture');
    const profileLevel = document.getElementById('profileLevel');
    
    if (profileName) {
        profileName.textContent = user.fullName;
        console.log('Setting profile name:', user.fullName);
    } else {
        console.log('Profile name element not found');
    }
    
    if (profilePicture) {
        profilePicture.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`;
        profilePicture.alt = user.fullName;
    }
    
    if (profileLevel) {
        profileLevel.textContent = user.email;
        profileLevel.innerHTML = `<i class="fas fa-envelope"></i> ${user.email}`;
    }

    // Update badges display
    function updateBadgesDisplay() {
        const badgesGrid = document.getElementById('badgesGrid');
        if (!badgesGrid) {
            console.log('Badges grid element not found');
            return;
        }

        // For debugging: log the challenge states
        const states = JSON.parse(localStorage.getItem('challengeStates') || '{}');
        console.log('Challenge states:', states);

        // Get user's completed challenges
        const completedChallenges = challenges.filter(challenge => {
            const state = states[challenge.id];
            return state && state.completed === true;
        });

        console.log('Completed challenges:', completedChallenges);

        // Get additional badges from user profile
        const userBadges = user.badges || [];

        // Combine all badges
        const allBadges = [
            ...completedChallenges.map(challenge => ({
                title: challenge.title,
                icon: challenge.icon,
                description: challenge.description,
                type: 'challenge'
            })),
            ...userBadges.map(badge => ({
                title: badge.title,
                icon: badge.icon,
                description: badge.description,
                type: 'achievement'
            }))
        ];

        console.log('All badges to display:', allBadges);

        if (allBadges.length === 0) {
            badgesGrid.innerHTML = `
                <div class="empty-badges">
                    <i class="fas fa-medal empty-icon"></i>
                    <p>Complete challenges to earn badges!</p>
                    <a href="challenges.html" class="btn btn-primary">View Challenges</a>
                </div>
            `;
            return;
        }

        badgesGrid.innerHTML = allBadges.map(badge =>`
            <div class="badge-card">
                <div class="badge-icon">
                    <i class="fas ${badge.icon}"></i>
                </div>
                <div class="badge-info">
                    <h4>${badge.title}</h4>
                    <p>${badge.description}</p>
                    <span class="badge-type ${badge.type}">${badge.type}</span>
                </div>
            </div>
        `).join('');

        // Update the badge count in profile stats
        const badgeCountElement = document.querySelector('.stat-item .stat-number');
        if (badgeCountElement) {
            badgeCountElement.textContent = allBadges.length;
        }
    }

    // If user is not logged in, redirect to login page
    if (!currentUser) {
        showToast('Please log in to view your profile', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }

    // Profile dropdown functionality
    const profileDropdown = document.getElementById('profileDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileSection = document.getElementById('profile');

    if (profileDropdown) {
        profileDropdown.style.display = 'block';
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownMenu = profileDropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('show');
            }
        });
    }

    // Show profile section when clicked from dropdown
    const profileLink = document.querySelector('.dropdown-item[href="#profile"]');
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (profileSection) {
                profileSection.style.display = 'block';
                document.documentElement.scrollTop = profileSection.offsetTop;
            }
        });
    }

    // Show toast function
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Goals functionality
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalsContainer = document.querySelector('.goals-container');

    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', function() {
            const goalInput = document.getElementById('goalInput');
            if (!goalInput || !goalInput.value.trim()) return;

            const goalElement = createGoalElement(goalInput.value);
            if (goalsContainer) {
                goalsContainer.appendChild(goalElement);
            }
            goalInput.value = '';
            showToast('Goal added successfully!');
        });
    }

    function createGoalElement(goalText) {
        const goal = document.createElement('div');
        goal.className = 'goal-item';
        goal.innerHTML = `
            <span class="goal-text">${goalText}</span>
            <div class="goal-actions">
                <button class="edit-goal" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-goal" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        goal.querySelector('.delete-goal').addEventListener('click', function() {
            goal.remove();
            showToast('Goal deleted');
        });

        goal.querySelector('.edit-goal').addEventListener('click', function() {
            const goalText = goal.querySelector('.goal-text');
            const newText = prompt('Edit goal:', goalText.textContent);
            if (newText && newText.trim()) {
                goalText.textContent = newText;
                showToast('Goal updated');
            }
        });

        return goal;
    }

    // For testing: Set some challenges as completed if they're not already set
    function initializeTestChallenges() {
        const states = JSON.parse(localStorage.getItem('challengeStates') || '{}');
        let updated = false;

        // Check if challenges 1, 2, and 3 are completed
        [1, 2, 3].forEach(id => {
            if (!states[id] || states[id].completed !== true) {
                states[id] = { completed: true, progress: 100 };
                updated = true;
            }
        });

        if (updated) {
            localStorage.setItem('challengeStates', JSON.stringify(states));
            console.log('Updated challenge states:', states);
        }
    }

    // Initialize test challenges and update display
    initializeTestChallenges();
    updateBadgesDisplay();

    console.log('Profile.js initialization complete');
}); 