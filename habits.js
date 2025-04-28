// Habit tracking functionality
class HabitTracker {
    constructor() {
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.initializeEventListeners();
        this.renderHabits();
    }

    initializeEventListeners() {
        // Add habit form submission
        const addHabitForm = document.getElementById('addHabitForm');
        if (addHabitForm) {
            addHabitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addHabit();
            });
        }

        // Habit completion buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('complete-habit')) {
                const habitId = e.target.dataset.habitId;
                this.completeHabit(habitId);
            }
        });
    }

    addHabit() {
        const habitName = document.getElementById('habitName').value;
        const frequency = document.getElementById('habitFrequency').value;
        const reminder = document.getElementById('habitReminder').value;

        if (!habitName) {
            showToast('Please enter a habit name', 'error');
            return;
        }

        const newHabit = {
            id: Date.now().toString(),
            name: habitName,
            frequency: frequency,
            reminder: reminder,
            streak: 0,
            lastCompleted: null,
            createdAt: new Date().toISOString()
        };

        this.habits.push(newHabit);
        this.saveHabits();
        this.renderHabits();
        showToast('Habit added successfully!', 'success');

        // Set up reminder if specified
        if (reminder) {
            this.setupReminder(newHabit);
        }
    }

    completeHabit(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        const today = new Date().toISOString().split('T')[0];
        
        if (habit.lastCompleted === today) {
            showToast('You\'ve already completed this habit today!', 'info');
            return;
        }

        // Update streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (habit.lastCompleted === yesterdayStr) {
            habit.streak++;
        } else if (habit.lastCompleted !== today) {
            habit.streak = 1;
        }

        habit.lastCompleted = today;
        this.saveHabits();
        this.renderHabits();
        showToast('Great job! Keep up the good work!', 'success');
    }

    setupReminder(habit) {
        if (!('Notification' in window)) {
            showToast('Notifications are not supported in your browser', 'error');
            return;
        }

        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const [hours, minutes] = habit.reminder.split(':');
                const now = new Date();
                const reminderTime = new Date(now);
                reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);

                if (reminderTime < now) {
                    reminderTime.setDate(reminderTime.getDate() + 1);
                }

                const timeUntilReminder = reminderTime - now;
                setTimeout(() => {
                    new Notification('Sustaina Habit Reminder', {
                        body: `Time to complete your habit: ${habit.name}`,
                        icon: 'https://i.imgur.com/8KgVB8B.png'
                    });
                    this.setupReminder(habit); // Set up next day's reminder
                }, timeUntilReminder);
            }
        });
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    renderHabits() {
        const habitsContainer = document.getElementById('habitsContainer');
        if (!habitsContainer) return;

        habitsContainer.innerHTML = this.habits.map(habit => `
            <div class="habit-card" data-habit-id="${habit.id}">
                <div class="habit-info">
                    <h3>${habit.name}</h3>
                    <p>Frequency: ${habit.frequency}</p>
                    <p>Streak: ${habit.streak} days</p>
                    ${habit.lastCompleted ? `<p>Last completed: ${new Date(habit.lastCompleted).toLocaleDateString()}</p>` : ''}
                </div>
                <div class="habit-actions">
                    <button class="btn btn-success complete-habit" data-habit-id="${habit.id}">
                        Complete
                    </button>
                    <button class="btn btn-danger delete-habit" data-habit-id="${habit.id}">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize habit tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.habitTracker = new HabitTracker();
}); 