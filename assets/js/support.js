// Protect support route
document.addEventListener('DOMContentLoaded', function() {
    protectRoute();
    loadUserData();
    loadFAQs();
    initializeChat();
});

// Load user data
function loadUserData() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.getElementById('userAvatar').src = user.profileImage;
        document.getElementById('userAvatar').onerror = function() {
            this.src = '../assets/images/default-avatar.png';
        };
    }
}

// FAQ data
const faqs = [
    {
        question: "How do I earn points?",
        answer: "You can earn points by participating in eco-friendly events, completing sustainability challenges, and contributing to environmental initiatives."
    },
    {
        question: "What are the membership tiers?",
        answer: "We have four tiers: Bronze (0-500 points), Silver (501-1000 points), Gold (1001-2000 points), and Platinum (2000+ points)."
    },
    {
        question: "How can I register for events?",
        answer: "You can register for events through the Events page or Dashboard. Simply click the 'Register' button next to the event you're interested in."
    },
    {
        question: "Can I transfer my points to another user?",
        answer: "Currently, points are non-transferable as they represent your personal contribution to environmental sustainability."
    },
    {
        question: "How do I redeem my rewards?",
        answer: "Visit your Profile page and click on the 'Rewards' section to view and redeem available rewards based on your points."
    }
];

// Load FAQs
function loadFAQs() {
    const accordion = document.getElementById('faqAccordion');
    
    faqs.forEach((faq, index) => {
        const div = document.createElement('div');
        div.className = 'accordion-item border-0 mb-3';
        div.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-white shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#faq${index}">
                    ${faq.question}
                </button>
            </h2>
            <div id="faq${index}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body bg-light">
                    ${faq.answer}
                </div>
            </div>
        `;
        accordion.appendChild(div);
    });
}

// Initialize chat functionality
function initializeChat() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Sample automated responses
    const automatedResponses = [
        "Thank you for reaching out! Our team will be with you shortly.",
        "I understand you need help with that. Let me find the best solution for you.",
        "Could you please provide more details about your issue?",
        "I'm checking our knowledge base for relevant information.",
        "Is there anything else you'd like to know?"
    ];

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage('user', message);
        messageInput.value = '';

        // Simulate automated response
        setTimeout(() => {
            const response = automatedResponses[Math.floor(Math.random() * automatedResponses.length)];
            addMessage('support', response);
        }, 1000);
    });
}

// Start chat
function startChat() {
    const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
    chatModal.show();

    // Add welcome message
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages.hasChildNodes()) {
        addMessage('support', 'Welcome to EcoConnect Support! How can we help you today?');
    }
}

// Add message to chat
function addMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `d-flex ${sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`;
    
    messageDiv.innerHTML = `
        <div class="card ${sender === 'user' ? 'bg-primary text-white' : 'bg-light'} shadow-sm" style="max-width: 75%;">
            <div class="card-body py-2 px-3">
                <p class="card-text mb-0">${message}</p>
                <small class="${sender === 'user' ? 'text-white-50' : 'text-muted'}">${new Date().toLocaleTimeString()}</small>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
} 