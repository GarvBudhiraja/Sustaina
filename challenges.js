// Challenge data
const challenges = [
    {
        id: 0,
        title: '30-Day Car-Free Challenge',
        duration: 15,
        description: 'Reduce your carbon footprint by using alternative transportation for 30 days.',
        howTo: 'Use a bicycle, walk, or public transport instead of a car for 30 days. Log your progress daily!',
        badge: '🚴 Car-Free Hero',
        participants: 1245,
        daysLeft: 15
    },
    {
        id: 1,
        title: 'Zero Waste Week',
        duration: 7,
        description: 'Minimize your waste production and find creative ways to reuse and recycle.',
        howTo: 'Track your waste, reuse items, and recycle as much as possible for 7 days. Share your tips!',
        badge: '♻️ Zero Waste Star',
        participants: 876,
        daysLeft: 7
    },
    {
        id: 2,
        title: 'Plant 100 Trees',
        duration: 22,
        description: 'Join our community effort to plant 100 trees in your local area this month.',
        howTo: 'Participate in tree planting events or plant trees yourself. Upload a photo or log your activity!',
        badge: '🌳 Tree Planter',
        participants: 2103,
        daysLeft: 22
    },
    {
        id: 3,
        title: 'Solar Energy Switch',
        duration: 30,
        description: 'Switch to solar-powered devices and track your renewable energy usage for 30 days.',
        howTo: 'Use solar-powered chargers and devices, track your energy savings, and share your experience!',
        badge: '☀️ Solar Champion',
        participants: 543,
        daysLeft: 25
    },
    {
        id: 4,
        title: 'Vegan Food Month',
        duration: 30,
        description: 'Embrace a plant-based diet for a month and share your favorite vegan recipes.',
        howTo: 'Follow a vegan diet, discover new recipes, and share your culinary journey with the community!',
        badge: '🥗 Vegan Explorer',
        participants: 1567,
        daysLeft: 18
    },
    {
        id: 5,
        title: 'Water Conservation',
        duration: 14,
        description: 'Reduce your daily water consumption and track savings for 2 weeks.',
        howTo: 'Monitor water usage, fix leaks, and implement water-saving practices. Log your daily savings!',
        badge: '💧 Water Guardian',
        participants: 987,
        daysLeft: 12
    },
    {
        id: 6,
        title: 'Plastic-Free Shopping',
        duration: 21,
        description: 'Complete your shopping without single-use plastics for 21 days.',
        howTo: 'Use reusable bags, containers, and packaging alternatives. Document your plastic-free purchases!',
        badge: '🛍️ Plastic-Free Pro',
        participants: 756,
        daysLeft: 19
    },
    {
        id: 7,
        title: 'Energy Efficiency',
        duration: 30,
        description: 'Reduce your household energy consumption by 30% in one month.',
        howTo: 'Track energy usage, use efficient appliances, and implement energy-saving habits!',
        badge: '⚡ Energy Master',
        participants: 1324,
        daysLeft: 28
    },
    {
        id: 8,
        title: 'Upcycling Challenge',
        duration: 30,
        description: 'Transform 5 items you would normally throw away into something useful.',
        howTo: 'Get creative with waste materials, share your upcycling projects, and inspire others!',
        badge: '🎨 Upcycling Artist',
        participants: 892,
        daysLeft: 16
    }
];

// Challenge state management
function getChallengeState() {
    return JSON.parse(localStorage.getItem('joinedChallenges') || '{}');
}

function setChallengeState(state) {
    localStorage.setItem('joinedChallenges', JSON.stringify(state));
}

// UI update functions
function updateChallengeButtons() {
    const state = getChallengeState();
    document.querySelectorAll('.challenge-card').forEach((card, idx) => {
        const btn = card.querySelector('button');
        if (!btn) return;
        
        if (state[idx] && state[idx].completed) {
            btn.innerHTML = `
                <span>Restart Challenge</span>
                <i class="fas fa-redo"></i>
            `;
            btn.classList.add('completed');
        } else if (state[idx] && state[idx].joined) {
            btn.innerHTML = `
                <span>In Progress</span>
                <i class="fas fa-spinner"></i>
            `;
            btn.classList.add('in-progress');
        } else {
            btn.innerHTML = `
                <span>Join Challenge</span>
                <i class="fas fa-arrow-right"></i>
            `;
            btn.classList.remove('completed', 'in-progress');
        }
        
        btn.onclick = function(e) {
            e.preventDefault();
            showChallengeModal(idx);
        };
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Challenge modal functionality
function showChallengeModal(idx) {
    const state = getChallengeState();
    const c = challenges[idx];
    let html = `
        <h2 style='color:#2cd63c; margin-bottom:0.5em;'>${c.title}</h2>
        <p style='color:#444; margin-bottom:1em;'>${c.description}</p>
        <strong>Duration left:</strong> <span style='color:#2cd63c;'>${c.daysLeft} days</span><br>
        <strong>How to complete:</strong> <div style='margin-bottom:1em;'>${c.howTo}</div>
    `;
    
    if (state[idx] && state[idx].completed) {
        html += `
            <div style='margin:1em 0; color:#2cd63c; font-size:1.2em;'>
                <b>Challenge Completed!</b><br>
                You earned a badge: <span style='font-size:1.5em;'>${c.badge}</span>
            </div>
            <div style='margin-bottom:1em;'>This badge will be shown on your profile.</div>
            <button id='restartChallengeBtn' class='btn btn-primary' style='width:100%;'>Restart Challenge</button>
        `;
    } else if (state[idx] && state[idx].joined) {
        html += `
            <div style='margin:1em 0; color:#2cd63c;'><b>You have joined this challenge!</b></div>
            <button id='markCompleteBtn' class='btn btn-primary' style='width:100%;'>Mark as Complete</button>
        `;
    } else {
        html += `
            <button id='joinChallengeBtn' class='btn btn-primary' style='width:100%;'>Join Challenge</button>
        `;
    }
    
    document.getElementById('challengeModalBody').innerHTML = html;
    document.getElementById('challengeModal').style.display = 'flex';

    // Button logic
    setTimeout(() => {
        const joinBtn = document.getElementById('joinChallengeBtn');
        if (joinBtn) joinBtn.onclick = function() {
            const s = getChallengeState();
            s[idx] = {joined: true, completed: false};
            setChallengeState(s);
            updateChallengeButtons();
            showChallengeModal(idx);
            showToast(`You've joined the ${c.title} challenge!`);
        };
        
        const completeBtn = document.getElementById('markCompleteBtn');
        if (completeBtn) completeBtn.onclick = function() {
            const s = getChallengeState();
            s[idx] = {joined: true, completed: true};
            setChallengeState(s);
            updateChallengeButtons();
            showChallengeModal(idx);
            showToast(`Congratulations! You've earned the ${c.badge} badge!`);
            updateBadgesDisplay();
        };
        
        const restartBtn = document.getElementById('restartChallengeBtn');
        if (restartBtn) restartBtn.onclick = function() {
            const s = getChallengeState();
            delete s[idx];
            setChallengeState(s);
            updateChallengeButtons();
            showChallengeModal(idx);
            showToast(`You've restarted the ${c.title} challenge!`);
        };
    }, 10);
}

// Initialize challenges
document.addEventListener('DOMContentLoaded', function() {
    updateChallengeButtons();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('challengeModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Close modal with X button
    document.getElementById('closeChallengeModal').onclick = function() {
        document.getElementById('challengeModal').style.display = 'none';
    };
}); 