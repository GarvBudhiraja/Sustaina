// Simple animation on page load
window.onload = () => {
    document.querySelector('header').style.animation = "fadeIn 2s ease-in-out";
}

// Smooth Scroll to different sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation Example
const form = document.querySelector("form");
const submitButton = document.querySelector("button");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    
    if (name === "" || email === "") {
        alert("Please fill in all fields!");
    } else {
        alert("Form submitted successfully!");
    }
});

// Random Motivational Quote for Users
const quoteButton = document.getElementById('quoteButton');
const quoteDisplay = document.getElementById('quoteDisplay');

quoteButton.addEventListener('click', () => {
    const quotes = [
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "In nature, nothing is perfect and everything is perfect.",
        "Act as if what you do makes a difference. It does.",
        "Sustainability is no longer about doing less harm. It’s about doing more good."
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = randomQuote;
});