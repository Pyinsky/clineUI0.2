// Configuration for StockArt AI Chat
const CONFIG = {
    // API endpoints
    API: {
        N8N_WEBHOOK_URL: 'https://stockart-n8n.railway.app/webhook/stockart-chat',
        TIMEOUT: 30000, // 30 seconds
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY: 1000 // 1 second
    },

    // UI configuration
    UI: {
        TYPING_DELAY: 50, // Delay between characters for typing effect
        MESSAGE_ANIMATION_DURATION: 300,
        AUTO_SCROLL_DELAY: 100
    },

    // Chat configuration
    CHAT: {
        MAX_MESSAGE_LENGTH: 2000,
        WELCOME_MESSAGES: [
            "What's the latest on Apple?",
            "Analyze Tesla's performance",
            "Compare Microsoft vs Google",
            "What are the top tech stocks?",
            "Explain market volatility"
        ]
    }
};

// Environment detection
CONFIG.IS_DEVELOPMENT = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Override API URL for development
if (CONFIG.IS_DEVELOPMENT) {
    CONFIG.API.N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/stockart-chat';
}

// Make config globally available
window.STOCKART_CONFIG = CONFIG;
