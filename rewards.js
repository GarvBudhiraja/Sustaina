// Rewards system functionality
class RewardsSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('userPoints')) || 0;
        this.achievements = JSON.parse(localStorage.getItem('achievements')) || [];
        this.rewards = JSON.parse(localStorage.getItem('rewards')) || [];
        this.initializeEventListeners();
        this.renderRewards();
        this.renderAchievements();
        this.updatePointsDisplay();
    }

    initializeEventListeners() {
        // Listen for habit completion events
        document.addEventListener('habitCompleted', (e) => {
            this.addPoints(10); // Add 10 points for completing a habit
            this.checkAchievements();
        });

        // Listen for challenge completion events
        document.addEventListener('challengeCompleted', (e) => {
            this.addPoints(50); // Add 50 points for completing a challenge
            this.checkAchievements();
        });

        // Reward redemption buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('redeem-reward')) {
                const rewardId = e.target.dataset.rewardId;
                this.redeemReward(rewardId);
            }
        });
    }

    addPoints(amount) {
        this.points += amount;
        this.savePoints();
        this.updatePointsDisplay();
        showToast(`Earned ${amount} points!`, 'success');
    }

    savePoints() {
        localStorage.setItem('userPoints', this.points.toString());
    }

    updatePointsDisplay() {
        const pointsDisplay = document.getElementById('userPoints');
        if (pointsDisplay) {
            pointsDisplay.textContent = this.points;
        }
    }

    checkAchievements() {
        const newAchievements = [
            {
                id: 'first_habit',
                title: 'First Habit',
                description: 'Complete your first habit',
                points: 100,
                icon: 'fa-check-circle'
            },
            {
                id: 'streak_7',
                title: '7-Day Streak',
                description: 'Maintain a 7-day streak for any habit',
                points: 200,
                icon: 'fa-fire'
            },
            {
                id: 'eco_warrior',
                title: 'Eco Warrior',
                description: 'Complete 10 eco-friendly habits',
                points: 300,
                icon: 'fa-leaf'
            }
        ];

        newAchievements.forEach(achievement => {
            if (!this.achievements.find(a => a.id === achievement.id)) {
                if (this.checkAchievementCriteria(achievement)) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }

    checkAchievementCriteria(achievement) {
        switch (achievement.id) {
            case 'first_habit':
                return window.habitTracker.habits.some(h => h.lastCompleted);
            case 'streak_7':
                return window.habitTracker.habits.some(h => h.streak >= 7);
            case 'eco_warrior':
                return window.habitTracker.habits.filter(h => h.lastCompleted).length >= 10;
            default:
                return false;
        }
    }

    unlockAchievement(achievement) {
        this.achievements.push(achievement);
        this.addPoints(achievement.points);
        this.saveAchievements();
        this.renderAchievements();
        showToast(`Achievement Unlocked: ${achievement.title}!`, 'success');
    }

    saveAchievements() {
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    }

    renderAchievements() {
        const achievementsContainer = document.getElementById('achievementsContainer');
        if (!achievementsContainer) return;

        achievementsContainer.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-card">
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points} points</span>
                </div>
            </div>
        `).join('');
    }

    redeemReward(rewardId) {
        const reward = this.rewards.find(r => r.id === rewardId);
        if (!reward) return;

        if (this.points >= reward.cost) {
            this.points -= reward.cost;
            this.savePoints();
            this.updatePointsDisplay();
            showToast(`Successfully redeemed: ${reward.title}!`, 'success');
            
            // Handle reward redemption (e.g., unlock feature, show discount code, etc.)
            this.handleRewardRedemption(reward);
        } else {
            showToast('Not enough points to redeem this reward', 'error');
        }
    }

    handleRewardRedemption(reward) {
        switch (reward.type) {
            case 'discount':
                showToast(`Your discount code: ${reward.code}`, 'success');
                break;
            case 'feature':
                // Unlock premium feature
                break;
            case 'badge':
                // Add badge to user profile
                break;
        }
    }

    renderRewards() {
        const rewardsContainer = document.getElementById('rewardsContainer');
        if (!rewardsContainer) return;

        // Initialize default rewards if none exist
        if (this.rewards.length === 0) {
            this.rewards = [
                {
                    id: 'premium_month',
                    title: 'Premium Month',
                    description: 'Unlock all premium features for one month',
                    cost: 1000,
                    type: 'feature'
                },
                {
                    id: 'eco_discount',
                    title: 'Eco Store Discount',
                    description: 'Get 20% off at our eco-friendly store',
                    cost: 500,
                    type: 'discount',
                    code: 'ECO20'
                },
                {
                    id: 'tree_badge',
                    title: 'Tree Planter Badge',
                    description: 'Special badge showing your commitment to the environment',
                    cost: 300,
                    type: 'badge'
                }
            ];
            this.saveRewards();
        }

        rewardsContainer.innerHTML = this.rewards.map(reward => `
            <div class="reward-card">
                <div class="reward-info">
                    <h3>${reward.title}</h3>
                    <p>${reward.description}</p>
                    <span class="reward-cost">${reward.cost} points</span>
                </div>
                <button class="btn btn-primary redeem-reward" data-reward-id="${reward.id}">
                    Redeem
                </button>
            </div>
        `).join('');
    }

    saveRewards() {
        localStorage.setItem('rewards', JSON.stringify(this.rewards));
    }
}

// Initialize rewards system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rewardsSystem = new RewardsSystem();
}); 