// Protect profile route
document.addEventListener('DOMContentLoaded', function() {
    protectRoute();
    loadProfileData();
});

// Load profile data
function loadProfileData() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        // Update profile information
        document.getElementById('profileName').textContent = user.username;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('pointsDisplay').textContent = user.loyaltyPoints.toLocaleString();
        document.getElementById('memberSince').textContent = new Date(user.joinDate).toLocaleDateString('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update avatar images
        const avatarUrls = [
            document.getElementById('userAvatar'),
            document.getElementById('profileAvatar')
        ];
        avatarUrls.forEach(img => {
            img.src = user.profileImage;
            img.onerror = function() {
                this.src = '../assets/images/default-avatar.png';
            };
        });
    }
}

// Update avatar
function updateAvatar(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!user) return;

            // Update user data with new avatar
            const updatedUser = {
                ...user,
                profileImage: e.target.result
            };

            // Save to database
            $.ajax({
                url: `http://localhost:3001/users/${user.id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedUser),
                success: function(response) {
                    // Update session storage
                    sessionStorage.setItem('user', JSON.stringify(updatedUser));
                    
                    // Update UI
                    const avatarUrls = [
                        document.getElementById('userAvatar'),
                        document.getElementById('profileAvatar')
                    ];
                    avatarUrls.forEach(img => img.src = e.target.result);
                    
                    // Show success message
                    showNotification('Profile picture updated successfully!');
                },
                error: function(xhr, status, error) {
                    console.error('Error updating avatar:', error);
                    showNotification('Failed to update profile picture. Please try again.', 'error');
                }
            });
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.role = 'alert';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
} 