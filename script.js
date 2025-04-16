// Streak and Level System
let streak = 0;
let xp = 0;
let userLevel = "Eco Novice";

const streakStatus = document.getElementById("streak-status");
const userXp = document.getElementById("user-xp");
const userLevelElement = document.getElementById("user-level");

// Random Motivational Quote
const quoteButton = document.getElementById('quoteButton');
const quoteDisplay = document.getElementById('quoteDisplay');

const quotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "In nature, nothing is perfect and everything is perfect.",
    "Act as if what you do makes a difference. It does.",
    "Sustainability is no longer about doing less harm. It’s about doing more good."
];

quoteButton.addEventListener('click', () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = randomQuote;
});

// Track Habits and Update Streak/XP
document.querySelectorAll('.habit-button').forEach(button => {
    button.addEventListener('click', () => {
        const habit = button.getAttribute("data-habit");
        handleHabitCompletion(habit);
    });
});

function handleHabitCompletion(habit) {
    xp += 10;
    streak += 1;
    userXp.textContent = xp;

    // Update Level
    if (xp >= 30) {
        userLevel = "Eco Champ";
    } else if (xp >= 60) {
        userLevel = "Earth Guardian";
    }

    userLevelElement.textContent = userLevel;

    // Update Streak
    if (streak === 7) {
        streakStatus.textContent = "🪴 7-day streak";
    } else if (streak === 30) {
        streakStatus.textContent = "🌳 30-day streak";
    } else {
        streakStatus.textContent = "🌿 Ongoing streak";
    }
}

// Check if a New Streak has started
if (streak === 0) {
    streakStatus.textContent = "🌱 New streak started";
}
