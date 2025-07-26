// Protect dashboard route
document.addEventListener('DOMContentLoaded', function() {
    protectRoute();
    loadUserData();
    loadEvents();
});

// Load user data
function loadUserData() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userAvatar').src = user.profileImage;
    }
}

// Load events data
function loadEvents() {
    $.ajax({
        url: 'http://localhost:3001/events',
        method: 'GET',
        success: function(events) {
            populateEventCarousel(events);
            populateEventDates(events);
            populateEventList(events);
            populateEventsGallery(events);
        },
        error: function(xhr, status, error) {
            console.error('Error loading events:', error);
        }
    });
}

// Populate event carousel
function populateEventCarousel(events) {
    const carouselInner = document.querySelector('#eventCarousel .carousel-inner');
    events.forEach((event, index) => {
        const div = document.createElement('div');
        div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `
            <div class="ratio ratio-16x9">
                <img src="../assets/images/events/${event.id}.jpg" 
                     class="d-block w-100" 
                     alt="${event.name}"
                     onerror="this.src='../assets/images/event-placeholder.jpg'">
            </div>
            <div class="carousel-caption">
                <h5>${event.name}</h5>
                <p>${event.description}</p>
            </div>
        `;
        carouselInner.appendChild(div);
    });
}

// Populate event dates
function populateEventDates(events) {
    const eventDates = document.querySelector('.event-dates');
    const today = new Date();
    
    // Get next 3 months of dates
    const dates = events.reduce((acc, event) => {
        const date = new Date(event.date);
        if (date >= today) {
            acc.push({
                date: date,
                day: date.getDate(),
                month: date.toLocaleString('default', { month: 'short' })
            });
        }
        return acc;
    }, []);

    // Sort dates and take first 3
    dates.sort((a, b) => a.date - b.date)
        .slice(0, 3)
        .forEach(date => {
            const div = document.createElement('div');
            div.className = 'text-center p-3 rounded bg-white shadow-sm';
            div.innerHTML = `
                <div class="h4 mb-0">${date.day}</div>
                <small class="text-muted">${date.month}</small>
            `;
            eventDates.appendChild(div);
        });
}

// Populate event list
function populateEventList(events) {
    const eventList = document.querySelector('.event-list');
    events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'card mb-3 border-0 shadow-sm';
        div.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="card-title mb-1">${event.name}</h6>
                        <p class="card-text text-muted small mb-0">${new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div class="text-end">
                        <div class="points-badge mb-2">${event.points} Points</div>
                        <button class="btn btn-sm btn-outline-primary" onclick="registerForEvent(${event.id})">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        `;
        eventList.appendChild(div);
    });
}

// Populate events gallery
function populateEventsGallery(events) {
    const gallery = document.getElementById('eventsGallery');
    events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = `
            <div class="card h-100 border-0 shadow-sm event-card">
                <img src="../assets/images/events/${event.id}.jpg" 
                     class="card-img-top" 
                     alt="${event.name}"
                     onerror="this.src='../assets/images/event-placeholder.jpg'">
                <div class="card-body">
                    <h6 class="card-title">${event.name}</h6>
                    <p class="card-text small text-muted">${event.description}</p>
                </div>
            </div>
        `;
        gallery.appendChild(div);
    });
}

// Register for event
function registerForEvent(eventId) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) return;

    $.ajax({
        url: `http://localhost:3001/events/${eventId}`,
        method: 'GET',
        success: function(event) {
            // Update user's points
            const updatedUser = {
                ...user,
                loyaltyPoints: user.loyaltyPoints + event.points
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
                    
                    // Show success message
                    showNotification(`Successfully registered for ${event.name}! You earned ${event.points} points.`);
                },
                error: function(xhr, status, error) {
                    console.error('Error updating user:', error);
                    showNotification('Failed to register for event. Please try again.', 'error');
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching event:', error);
            showNotification('Failed to register for event. Please try again.', 'error');
        }
    });
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