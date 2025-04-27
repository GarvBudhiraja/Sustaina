document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    navbarToggle.addEventListener('click', function() {
        mobileMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            !navbarToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        showToast('success', 'Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
    });

    // Toast notification function
    function showToast(type, message) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        const toastContainer = document.querySelector('.toast-container');
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 