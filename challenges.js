// Challenge data structure
const challenges = {
    1: {
        title: "30-Day Car-Free Challenge",
        duration: 30,
        daysLeft: 15,
        participants: 1245,
        instructions: [
            "Use public transportation, cycling, or walking for your daily commute",
            "Track your progress in the app",
            "Share your experience with the community",
            "Complete at least 20 days to earn the badge"
        ],
        badge: {
            name: "Eco-Commuter",
            description: "Awarded for completing 30 days of car-free commuting",
            icon: "🚲"
        }
    },
    2: {
        title: "Zero Waste Week",
        duration:7,
        daysLeft: 7,
        participants: 876,
        instructions: [
            "Carry reusable bags and containers",
            "Compost organic waste",
            "Avoid single-use plastics",
            "Find creative ways to reuse items"
        ],
        badge: {
            name: "Zero Waste Warrior",
            description: "Awarded for completing a week of zero waste living",
            icon: "♻️"
        }
    },
    3: {
        title: "Plant 100 Trees",
        duration: 30,
        daysLeft: 22,
        participants: 2103,
        instructions: [
            "Plant trees in your local area",
            "Document each planting with photos",
            "Share your progress in the community",
            "Complete at least 10 plantings to earn the badge"
        ],
        badge: {
            name: "Tree Guardian",
            description: "Awarded for contributing to reforestation efforts",
            icon: "🌳"
        }
    }
};

// Track user's joined challenges
const userChallenges = new Set();

// Initialize challenge buttons
document.addEventListener('DOMContentLoaded', () => {
    const joinButtons = document.querySelectorAll('.join-challenge-btn');
    joinButtons.forEach(button => {
        const challengeId = button.dataset.challengeId;
        if (userChallenges.has(challengeId)) {
            updateButtonState(button, true);
        }
    });
});

// Handle join challenge button clicks
document.querySelectorAll('.join-challenge-btn').forEach(button => {
    button.addEventListener('click', () => {
        const challengeId = button.dataset.challengeId;
        const challenge = challenges[challengeId];
        
        if (!userChallenges.has(challengeId)) {
            showJoinModal(challengeId, challenge);
        } else {
            showProgressModal(challengeId, challenge);
        }
    });
});

// Show join confirmation modal
function showJoinModal(challengeId, challenge) {
    const modal = document.getElementById('challengeModal');
    const modalBody = document.getElementById('challengeModalBody');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h3>Join ${challenge.title}</h3>
        </div>
        <div class="modal-content">
            <div class="challenge-info">
                <p><strong>Duration:</strong> ${challenge.duration} days</p>
                <p><strong>Days Left:</strong> ${challenge.daysLeft} days</p>
                <p><strong>Participants:</strong> ${challenge.participants}</p>
            </div>
            <div class="instructions">
                <h4>How to Complete:</h4>
                <ul>
                    ${challenge.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ul>
            </div>
            <div class="badge-info">
                <h4>Earn This Badge:</h4>
                <div class="badge-preview">
                    <span class="badge-icon">${challenge.badge.icon}</span>
                    <div>
                        <strong>${challenge.badge.name}</strong>
                        <p>${challenge.badge.description}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary confirm-join-btn" data-challenge-id="${challengeId}">
                Join Challenge
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Handle join confirmation
    document.querySelector('.confirm-join-btn').addEventListener('click', () => {
        userChallenges.add(challengeId);
        const button = document.querySelector(`.join-challenge-btn[data-challenge-id="${challengeId}"]`);
        updateButtonState(button, true);
        modal.style.display = 'none';
        showProgressModal(challengeId, challenge);
    });
}

// Show progress modal
function showProgressModal(challengeId, challenge) {
    const modal = document.getElementById('challengeModal');
    const modalBody = document.getElementById('challengeModalBody');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h3>${challenge.title}</h3>
        </div>
        <div class="modal-content">
            <div class="progress-info">
                <div class="progress-bar">
                    <div class="progress" style="width: ${((challenge.duration - challenge.daysLeft) / challenge.duration) * 100}%"></div>
                </div>
                <p>${challenge.daysLeft} days remaining</p>
            </div>
            <div class="instructions">
                <h4>How to Complete:</h4>
                <ul>
                    ${challenge.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ul>
            </div>
            <div class="badge-info">
                <h4>Earn This Badge:</h4>
                <div class="badge-preview">
                    <span class="badge-icon">${challenge.badge.icon}</span>
                    <div>
                        <strong>${challenge.badge.name}</strong>
                        <p>${challenge.badge.description}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary complete-challenge-btn" data-challenge-id="${challengeId}">
                Mark as Complete
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Handle challenge completion
    document.querySelector('.complete-challenge-btn').addEventListener('click', () => {
        showCompletionModal(challenge);
    });
}

// Show completion modal
function showCompletionModal(challenge) {
    const modal = document.getElementById('challengeModal');
    const modalBody = document.getElementById('challengeModalBody');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h3>Challenge Complete! 🎉</h3>
        </div>
        <div class="modal-content">
            <div class="completion-message">
                <p>Congratulations! You've completed the ${challenge.title}!</p>
            </div>
            <div class="badge-earned">
                <h4>You've Earned:</h4>
                <div class="badge-preview earned">
                    <span class="badge-icon">${challenge.badge.icon}</span>
                    <div>
                        <strong>${challenge.badge.name}</strong>
                        <p>${challenge.badge.description}</p>
                    </div>
                </div>
            </div>
            <div class="profile-notice">
                <p>This badge will appear on your profile page.</p>
            </div>
            <button class="btn btn-primary close-modal-btn">
                Close
            </button>
        </div>
    `;
    
    document.querySelector('.close-modal-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Update button state
function updateButtonState(button, isJoined) {
    if (isJoined) {
        button.innerHTML = `
            <span class="btn-text">In Progress</span>
            <i class="fas fa-check btn-icon"></i>
        `;
        button.classList.add('joined');
    } else {
        button.innerHTML = `
            <span class="btn-text">Join Challenge</span>
            <i class="fas fa-arrow-right btn-icon"></i>
        `;
        button.classList.remove('joined');
    }
}

// Close modal when clicking outside
document.getElementById('challengeModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('challengeModal')) {
        document.getElementById('challengeModal').style.display = 'none';
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('challengeModal').style.display = 'none';
    }
});

// DOM Elements
const challengeModal = document.getElementById('challengeModal');
const closeChallengeModal = document.getElementById('closeChallengeModal');
const modalTitle = document.getElementById('modalTitle');
const challengeDuration = document.getElementById('challengeDuration');
const challengeParticipants = document.getElementById('challengeParticipants');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const challengeInstructions = document.getElementById('challengeInstructions');
const badgeName = document.getElementById('badgeName');
const joinChallengeBtn = document.getElementById('joinChallengeBtn');
const markCompleteBtn = document.getElementById('markCompleteBtn');
const completionMessage = document.getElementById('completionMessage');

// Sample challenge data
const sampleChallenge = {
    title: "7-Day Plastic Free Challenge",
    duration: "7 days",
    participants: 0,
    progress: 0,
    instructions: [
        "Use reusable water bottles instead of plastic ones",
        "Bring your own shopping bags",
        "Avoid single-use plastic straws",
        "Use reusable containers for food storage",
        "Choose products with minimal plastic packaging"
    ],
    badge: "Plastic Free Warrior"
};

// Initialize modal with challenge data
function initializeModal(challenge) {
    modalTitle.textContent = challenge.title;
    challengeDuration.textContent = `Duration: ${challenge.duration}`;
    challengeParticipants.textContent = `Participants: ${challenge.participants}`;
    progressText.textContent = `${challenge.progress}%`;
    progressBar.style.width = `${challenge.progress}%`;
    badgeName.textContent = challenge.badge.name;

    // Clear and populate instructions
    challengeInstructions.innerHTML = '';
    challenge.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        challengeInstructions.appendChild(li);
    });

    // Show appropriate buttons based on progress
    if (challenge.progress === 0) {
        joinChallengeBtn.style.display = 'block';
        markCompleteBtn.style.display = 'none';
        completionMessage.style.display = 'none';
    } else if (challenge.progress === 100) {
        joinChallengeBtn.style.display = 'none';
        markCompleteBtn.style.display = 'none';
        completionMessage.style.display = 'block';
    } else {
        joinChallengeBtn.style.display = 'none';
        markCompleteBtn.style.display = 'block';
        completionMessage.style.display = 'none';
    }
}

// Event Listeners
closeChallengeModal.addEventListener('click', () => {
    challengeModal.style.display = 'none';
});

joinChallengeBtn.addEventListener('click', () => {
    sampleChallenge.participants += 1;
    sampleChallenge.progress = 25;
    initializeModal(sampleChallenge);
});

markCompleteBtn.addEventListener('click', () => {
    sampleChallenge.progress = 100;
    initializeModal(sampleChallenge);
});

// Initialize modal with sample challenge
initializeModal(sampleChallenge);

// Show modal
challengeModal.style.display = 'flex'; 