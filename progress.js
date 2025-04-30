// DOM Elements
const progressModal = document.getElementById('progressModal');
const challengeModal = document.getElementById('challengeModal');
const challengesListModal = document.getElementById('challengesListModal');
const toastContainer = document.getElementById('toastContainer');

// Progress Tracking Elements
const carbonFootprint = document.getElementById('carbonFootprint');
const waterConservation = document.getElementById('waterConservation');
const wasteReduction = document.getElementById('wasteReduction');
const saveProgressBtn = document.getElementById('saveProgress');
const cancelProgressBtn = document.getElementById('cancelProgress');

// Challenge Elements
const joinChallengeBtn = document.getElementById('joinChallenge');
const cancelChallengeBtn = document.getElementById('cancelChallenge');
const closeChallengesListBtn = document.getElementById('closeChallengesList');
const challengesList = document.getElementById('challengesList');
const challengeFilters = document.querySelectorAll('.challenge-filter');

// Sample challenges data
const challenges = [
    {
        id: 1,
        title: '30 Days Zero Waste',
        description: 'Reduce your waste to zero for 30 days',
        participants: 150,
        timeRemaining: 15,
        rewards: '500 points + Zero Waste Badge',
        category: 'popular'
    },
    {
        id: 2,
        title: 'Water Conservation Challenge',
        description: 'Save 100 liters of water daily',
        participants: 89,
        timeRemaining: 7,
        rewards: '300 points + Water Saver Badge',
        category: 'new'
    },
    {
        id: 3,
        title: 'Carbon Footprint Reduction',
        description: 'Reduce your carbon footprint by 50%',
        participants: 234,
        timeRemaining: 21,
        rewards: '1000 points + Eco Warrior Badge',
        category: 'featured'
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress tracking
    initializeProgressTracking();
    
    // Initialize challenges
    initializeChallenges();
    
    // Add event listeners for range inputs
    [carbonFootprint, waterConservation, wasteReduction].forEach(input => {
        input.addEventListener('input', updateProgressValue);
    });
});

// Progress Tracking Functions
function initializeProgressTracking() {
    // Load saved progress from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('userProgress')) || {
        carbonFootprint: 0,
        waterConservation: 0,
        wasteReduction: 0
    };
    
    // Set initial values
    carbonFootprint.value = savedProgress.carbonFootprint;
    waterConservation.value = savedProgress.waterConservation;
    wasteReduction.value = savedProgress.wasteReduction;
    
    // Update progress values display
    updateProgressValue();
}

function updateProgressValue() {
    const inputs = [carbonFootprint, waterConservation, wasteReduction];
    inputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        valueDisplay.textContent = `${input.value}%`;
    });
}

function saveProgress() {
    const progress = {
        carbonFootprint: parseInt(carbonFootprint.value),
        waterConservation: parseInt(waterConservation.value),
        wasteReduction: parseInt(wasteReduction.value)
    };
    
    // Save to localStorage
    localStorage.setItem('userProgress', JSON.stringify(progress));
    
    // Show success message
    showToast('Progress saved successfully!', 'success');
    
    // Close modal
    closeModal(progressModal);
}

// Challenge Functions
function initializeChallenges() {
    // Add event listeners for challenge filters
    challengeFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            challengeFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Filter challenges
            const category = filter.dataset.filter;
            displayChallenges(category);
        });
    });
    
    // Display all challenges initially
    displayChallenges('all');
}

function displayChallenges(category) {
    challengesList.innerHTML = '';
    
    const filteredChallenges = category === 'all' 
        ? challenges 
        : challenges.filter(challenge => challenge.category === category);
    
    filteredChallenges.forEach(challenge => {
        const challengeElement = createChallengeElement(challenge);
        challengesList.appendChild(challengeElement);
    });
}

function createChallengeElement(challenge) {
    const div = document.createElement('div');
    div.className = 'challenge-item';
    div.innerHTML = `
        <h4>${challenge.title}</h4>
        <p>${challenge.description}</p>
        <div class="challenge-info">
            <span><i class="fas fa-users"></i> ${challenge.participants}</span>
            <span><i class="fas fa-clock"></i> ${challenge.timeRemaining} days</span>
        </div>
        <button class="btn btn-success join-challenge-btn" data-id="${challenge.id}">Join Challenge</button>
    `;
    
    // Add event listener to join button
    const joinBtn = div.querySelector('.join-challenge-btn');
    joinBtn.addEventListener('click', () => joinChallenge(challenge));
    
    return div;
}

function joinChallenge(challenge) {
    // Update challenge modal info
    document.getElementById('challengeParticipants').textContent = challenge.participants;
    document.getElementById('challengeTimeRemaining').textContent = `${challenge.timeRemaining} days`;
    document.getElementById('challengeRewards').textContent = challenge.rewards;
    
    // Close challenges list modal and open challenge modal
    closeModal(challengesListModal);
    openModal(challengeModal);
    
    // Add event listener to join button
    joinChallengeBtn.onclick = () => {
        showToast(`Joined ${challenge.title} successfully!`, 'success');
        closeModal(challengeModal);
    };
}

// Modal Functions
function openModal(modal) {
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}

function closeModal(modal) {
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
}

// Toast Function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event Listeners for Modal Controls
document.querySelectorAll('.progress-modal-close, .challenge-modal-close, .challenges-list-modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
    });
});

cancelProgressBtn.addEventListener('click', () => closeModal(progressModal));
cancelChallengeBtn.addEventListener('click', () => closeModal(challengeModal));
closeChallengesListBtn.addEventListener('click', () => closeModal(challengesListModal));
saveProgressBtn.addEventListener('click', saveProgress);

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
}); 