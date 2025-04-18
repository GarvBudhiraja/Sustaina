function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Contains number
    if (/\d/.test(password)) strength++;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function updateStrengthMeter(password) {
    const strength = checkPasswordStrength(password);
    const meterFill = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text');
    
    // Update meter fill
    meterFill.setAttribute('data-strength', strength);
    
    // Update text and icon
    let text = 'Password strength';
    let icon = 'fa-info-circle';
    
    if (password.length > 0) {
        switch(strength) {
            case 0:
            case 1:
                text = 'Weak password';
                icon = 'fa-exclamation-circle';
                strengthText.className = 'strength-text weak';
                break;
            case 2:
                text = 'Fair password';
                icon = 'fa-info-circle';
                strengthText.className = 'strength-text fair';
                break;
            case 3:
                text = 'Good password';
                icon = 'fa-check-circle';
                strengthText.className = 'strength-text good';
                break;
            case 4:
            case 5:
                text = 'Strong password';
                icon = 'fa-shield-alt';
                strengthText.className = 'strength-text strong';
                break;
        }
    } else {
        strengthText.className = 'strength-text';
    }
    
    strengthText.innerHTML = `<i class="fas ${icon}"></i><span>${text}</span>`;
}

// Add event listener for password input
document.getElementById('password').addEventListener('input', function(e) {
    updateStrengthMeter(e.target.value);
}); 