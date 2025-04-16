// --- SPA Navigation ---
const links = document.querySelectorAll('nav a');
const views = document.querySelectorAll('.view');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // Highlight active link
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    // Show corresponding view
    const viewId = link.getAttribute('data-view');
    views.forEach(v => v.hidden = v.id !== viewId);
  });
});

// --- Notification Count ---
document.getElementById('notifCount').textContent = 3;

// --- Dashboard Statistics ---
let streak = 0, xp = 0, ecoScore = 0;
const streakCount = document.getElementById('streak');
const streakEmoji = document.getElementById('streakEmoji');
const userXp = document.getElementById('xp');
const userEco = document.getElementById('ecoScore');

function updateStats() {
  streakCount.textContent = streak;
  userXp.textContent = xp;
  userEco.textContent = ecoScore;
  // Update streak emoji
  if (streak === 0) streakEmoji.textContent = '🌱';
  else if (streak < 7) streakEmoji.textContent = '🌿';
  else if (streak < 30) streakEmoji.textContent = '🪴';
  else streakEmoji.textContent = '🌳';
}

// --- Habit Tracking ---
document.querySelectorAll('.habit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    xp += 10;
    ecoScore += 5;
    streak += 1;
    updateStats();
  });
});

// --- Motivational Quotes ---
const quotes = [
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "In nature, nothing is perfect and everything is perfect.",
  "Act as if what you do makes a difference. It does.",
  "Sustainability is no longer about doing less harm. It’s about doing more good."
];
const quoteBtn = document.getElementById('quoteButton');
const quoteDisplay = document.getElementById('quoteDisplay');
quoteBtn.addEventListener('click', () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = q;
});

// --- Initial Setup ---
views.forEach(v => v.hidden = true);
document.getElementById('login').hidden = false;
updateStats();