// Handle form validation and submission
$(document).ready(function() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                // Handle form submission
                const formId = form.id;
                if (formId === 'loginForm') {
                    handleLogin(form);
                } else if (formId === 'registerForm') {
                    handleRegister(form);
                }
            }
            
            form.classList.add('was-validated');
        }, false);
    });
});

// Handle login
function handleLogin(form) {
    const username = $('#username').val();
    const password = $('#password').val();
    
    // API call to login
    $.ajax({
        url: 'http://localhost:3001/users',
        method: 'GET',
        data: {
            username: username,
            // In a real application, password should be hashed
            password: password
        },
        success: function(response) {
            const user = response.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password
            );
            
            if (user) {
                // Store user session
                sessionStorage.setItem('user', JSON.stringify(user));
                // Redirect to dashboard
                window.location.href = '/pages/dashboard.html';
            } else {
                showError('Invalid username or password');
            }
        },
        error: function(xhr, status, error) {
            showError('An error occurred. Please try again later.');
            console.error('Error:', error);
        }
    });
}

// Handle registration
function handleRegister(form) {
    const userData = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(), // In real app, should be hashed
        loyaltyPoints: 0,
        tier: 'Bronze',
        joinDate: new Date().toISOString().split('T')[0],
        profileImage: '../assets/images/default-avatar.png'
    };
    
    // API call to register
    $.ajax({
        url: 'http://localhost:3001/users',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function(response) {
            // Store user session
            sessionStorage.setItem('user', JSON.stringify(response));
            // Redirect to dashboard
            window.location.href = '/pages/dashboard.html';
        },
        error: function(xhr, status, error) {
            showError('An error occurred during registration. Please try again.');
            console.error('Error:', error);
        }
    });
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.role = 'alert';
    errorDiv.textContent = message;
    
    const form = document.querySelector('form');
    form.insertAdjacentElement('beforebegin', errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Check if user is authenticated
function isAuthenticated() {
    return sessionStorage.getItem('user') !== null;
}

// Protect routes
function protectRoute() {
    if (!isAuthenticated()) {
        window.location.href = '/pages/login.html';
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('user');
    window.location.href = '/pages/login.html';
} 