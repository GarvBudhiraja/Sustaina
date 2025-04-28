// Profile and Badges Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Update profile information
        const profileName = document.getElementById('profileName');
        const profilePicture = document.getElementById('profilePicture');
        
        if (profileName) {
            profileName.textContent = user.name || 'User';
        }
        
        if (profilePicture) {
            profilePicture.src = user.photoURL || 'https://i.imgur.com/8LWTHYs.jpg';
        }
    }
    
    // Show profile dropdown if user is logged in
    const profileDropdown = document.getElementById('profileDropdown');
    if (profileDropdown) {
        profileDropdown.style.display = user ? 'block': 'none';
    }
    
    // Avatar edit functionality
    const avatarEditBtn = document.getElementById('avatarEditBtn');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', function(){
            // Implement avatar edit functionality here
            console.log('Avatar edit clicked');
        });
    }
    
    // Badge carousel functionality
    const badgeCarousel = document.querySelector('.badge-carousel');
    if (badgeCarousel) {
        // Initialize badge carousel
        // Add your badge carousel initialization code here
    }
    
    // Show profile section if user is logged in
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        profileSection.style.display = user ? 'block' : 'none';
    }
    
    // Handle profile section visibility
    document.querySelector('.dropdown-item[href="#profile"]').addEventListener('click', function(e) {
        e.preventDefault();
        profileSection.style.display = 'block';
        window.scrollTo({
            top: profileSection.offsetTop -80,
            behavior: 'smooth'
        });
    });
    
    // Function to show toast notification
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast'; 
        toast.innerHTML = `
            <i class="fas fa-medal toast-icon"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Function to update badges display
    function updateBadgesDisplay() {
        const badgesGrid = document.getElementById('badgesGrid');
        const state = getChallengeState();
        badgesGrid.innerHTML = '';
        
        challenges.forEach((challenge, idx) => {
            if (state[idx] && state[idx].completed) {
                const badgeCard = document.createElement('div');
                badgeCard.className = 'badge-card';
                badgeCard.innerHTML = `
                    <div class="badge-icon">${challenge.badge}</div>
                    <h4 class="badge-name">${challenge.title}</h4>
                    <p class="badge-description">${challenge.description}</p>
                `;
                badgesGrid.appendChild(badgeCard);
            }
        });
    }
    
    // Update badges display when challenge is completed
    const originalShowChallengeModal = showChallengeModal;
    showChallengeModal = function(idx) {
        originalShowChallengeModal(idx);
        const state = getChallengeState();
        if (state[idx] && state[idx].completed) {
            showToast(`Congrats! You earned the ${challenges[idx].badge} badge!`);
            updateBadgesDisplay();
        }
    };
    
    // Initial badges display
    updateBadgesDisplay();

    // Add Goal Functionality
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalsGrid = document.getElementById('goalsGrid');
    
    addGoalBtn.addEventListener('click', function() {
        const newGoal = document.createElement('div');
        newGoal.className = 'goal-card';
        newGoal.innerHTML = `
            <div class="goal-icon">
                <i class="fas fa-plus"></i>
            </div>
            <div class="goal-info">
                <h4>New Goal</h4>
                <p>Set your sustainability goal</p>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: 0%"></div>
                    </div>
                    <span class="progress-text">0% Complete</span>
                </div>
            </div>
            <button class="goal-edit-btn">
                <i class="fas fa-edit"></i>
            </button>
        `;
        goalsGrid.appendChild(newGoal);
    });

    // Goal Edit Functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.goal-edit-btn')) {
            const goalCard = e.target.closest('.goal-card');
            const goalInfo = goalCard.querySelector('.goal-info');
            const currentTitle = goalInfo.querySelector('h4').textContent;
            const currentDescription = goalInfo.querySelector('p').textContent;
            
            // Create edit form
            const editForm = document.createElement('div');
            editForm.className = 'goal-edit-form';
            editForm.innerHTML = `
                <input type="text" value="${currentTitle}" class="goal-title-input">
                <textarea class="goal-description-input">${currentDescription}</textarea>
                <div class="goal-edit-actions">
                    <button class="btn btn-primary save-goal-btn">Save</button>
                    <button class="btn btn-outline cancel-goal-btn">Cancel</button>
                </div>
            `;
            
            goalInfo.innerHTML = '';
            goalInfo.appendChild(editForm);
            
            // Save goal
            const saveBtn = editForm.querySelector('.save-goal-btn');
            saveBtn.addEventListener('click', function() {
                const newTitle = editForm.querySelector('.goal-title-input').value;
                const newDescription = editForm.querySelector('.goal-description-input').value;
                
                goalInfo.innerHTML = `
                    <h4>${newTitle}</h4>
                    <p>${newDescription}</p>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">0% Complete</span>
                    </div>
                `;
            });
            
            // Cancel edit
            const cancelBtn = editForm.querySelector('.cancel-goal-btn');
            cancelBtn.addEventListener('click', function() {
                goalInfo.innerHTML = `
                    <h4>${currentTitle}</h4>
                    <p>${currentDescription}</p>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">0% Complete</span>
                    </div>
                `;
            });
        }
    });
}); 