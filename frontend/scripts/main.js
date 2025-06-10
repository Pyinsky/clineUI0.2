// Main JavaScript for StockArt AI Chat
class StockArtMain {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalEventListeners();
        this.setupThemeSystem();
        this.setupAccessibility();
        this.logStartup();
    }

    setupGlobalEventListeners() {
        // Handle any global click events
        document.addEventListener('click', (e) => {
            // Close any open dropdowns or menus when clicking outside
            this.handleGlobalClick(e);
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeydown(e);
        });

        // Handle window events
        window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });
    }

    setupThemeSystem() {
        // Detect system theme preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('stockart-theme');
        
        // Apply theme
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('stockart-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('stockart-theme', theme);
    }

    setupAccessibility() {
        // Focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });

        // Skip to main content link
        this.createSkipLink();
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transform: translateY(-100%);
            transition: transform 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.transform = 'translateY(0)';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.transform = 'translateY(-100%)';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    handleGlobalClick(e) {
        // Close any open menus or dropdowns
        const openMenus = document.querySelectorAll('.menu-open, .dropdown-open');
        openMenus.forEach(menu => {
            if (!menu.contains(e.target)) {
                menu.classList.remove('menu-open', 'dropdown-open');
            }
        });
    }

    handleGlobalKeydown(e) {
        // Global keyboard shortcuts
        switch (e.key) {
            case 'Escape':
                // Close any modals or overlays
                this.closeAllOverlays();
                break;
        }
    }

    closeAllOverlays() {
        // Close any open overlays, modals, etc.
        const overlays = document.querySelectorAll('.overlay, .modal, .dropdown-open');
        overlays.forEach(overlay => {
            overlay.classList.remove('open', 'show', 'dropdown-open');
        });
    }

    handleBeforeUnload() {
        // Save any necessary state before page unload
        this.saveApplicationState();
    }

    saveApplicationState() {
        // Save current application state to localStorage
        const state = {
            timestamp: Date.now(),
            theme: document.documentElement.getAttribute('data-theme'),
            version: '1.0.0'
        };
        
        localStorage.setItem('stockart-state', JSON.stringify(state));
    }

    logStartup() {
        console.log('🚀 StockArt AI Chat initialized');
        console.log('📱 Environment:', window.STOCKART_CONFIG?.IS_DEVELOPMENT ? 'Development' : 'Production');
        console.log('🎯 API Endpoint:', window.STOCKART_CONFIG?.API?.N8N_WEBHOOK_URL);
    }
}

// Utility functions
const StockArtUtils = {
    // Format numbers with commas
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format percentage
    formatPercentage(value, decimals = 2) {
        return `${(value * 100).toFixed(decimals)}%`;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    }
};

// Make utilities globally available
window.StockArtUtils = StockArtUtils;

// Main JavaScript for StockArt AI Chat
class StockArtMain {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalEventListeners();
        this.setupThemeSystem();
        this.setupAccessibility();
        this.setupChatInputHandlers(); // New method for chat input
        this.logStartup();
    }

    setupGlobalEventListeners() {
        // Handle any global click events
        document.addEventListener('click', (e) => {
            // Close any open dropdowns or menus when clicking outside
            this.handleGlobalClick(e);
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeydown(e);
        });

        // Handle window events
        window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });
    }

    setupThemeSystem() {
        // Detect system theme preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('stockart-theme');

        // Apply theme
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('stockart-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('stockart-theme', theme);
    }

    setupAccessibility() {
        // Focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });

        // Skip to main content link
        this.createSkipLink();
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transform: translateY(-100%);
            transition: transform 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.transform = 'translateY(0)';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.transform = 'translateY(-100%)';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    handleGlobalClick(e) {
        // Close any open menus or dropdowns
        const openMenus = document.querySelectorAll('.menu-open, .dropdown-open');
        openMenus.forEach(menu => {
            if (!menu.contains(e.target)) {
                menu.classList.remove('menu-open', 'dropdown-open');
            }
        });
    }

    handleGlobalKeydown(e) {
        // Global keyboard shortcuts
        switch (e.key) {
            case 'Escape':
                // Close any modals or overlays
                this.closeAllOverlays();
                break;
        }
    }

    closeAllOverlays() {
        // Close any open overlays, modals, etc.
        const overlays = document.querySelectorAll('.overlay, .modal, .dropdown-open');
        overlays.forEach(overlay => {
            overlay.classList.remove('open', 'show', 'dropdown-open');
        });
    }

    handleBeforeUnload() {
        // Save any necessary state before page unload
        this.saveApplicationState();
    }

    saveApplicationState() {
        // Save current application state to localStorage
        const state = {
            timestamp: Date.now(),
            theme: document.documentElement.getAttribute('data-theme'),
            version: '1.0.0'
        };

        localStorage.setItem('stockart-state', JSON.stringify(state));
    }

    logStartup() {
        console.log('🚀 StockArt AI Chat initialized');
        console.log('📱 Environment:', window.STOCKART_CONFIG?.IS_DEVELOPMENT ? 'Development' : 'Production');
        console.log('🎯 API Endpoint:', window.STOCKART_CONFIG?.API?.N8N_WEBHOOK_URL);
    }

    // NEW: Setup chat input handlers
    setupChatInputHandlers() {
        const welcomeChatForm = document.getElementById('chatForm');
        const chatInterfaceForm = document.getElementById('chatInputForm');

        if (welcomeChatForm) {
            welcomeChatForm.addEventListener('submit', this.handleChatSubmit.bind(this));
        }

        if (chatInterfaceForm) {
            chatInterfaceForm.addEventListener('submit', this.handleChatSubmit.bind(this));
        }
    }

    // NEW: Handle chat form submission and send webhook
    async handleChatSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const chatInput = event.target.querySelector('.search-input') || event.target.querySelector('.chat-input');
        const userPrompt = chatInput.value.trim();

        if (userPrompt) {
            console.log('User Prompt:', userPrompt);

            // Hide welcome screen and show chat interface
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('chatInterface').style.display = 'flex'; // Use flex for chat layout

            // Display user message in chat interface
            this.displayMessage(userPrompt, 'user');

            // Send webhook call
            await this.sendWebhook(userPrompt);

            // Clear the input box
            chatInput.value = '';
        }
    }

    // NEW: Function to send webhook
    async sendWebhook(promptText) {
        const webhookUrl = 'https://primary-production-b1c8.up.railway.app/webhook-test/stockartaipromptboxhandler';
        const payload = {
            text: promptText
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Webhook response:', responseData);

            // Display AI response in chat interface
            // Assuming the webhook response contains a 'reply' field for the AI's answer
            const aiReply = responseData.reply || 'No direct reply received from AI.';
            this.displayMessage(aiReply, 'ai');

        } catch (error) {
            console.error('Error sending webhook:', error);
            this.displayMessage('Error: Could not get a response from the AI.', 'ai error');
        }
    }

    // NEW: Function to display messages in the chat interface
    displayMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<div class="message-bubble">${StockArtUtils.escapeHTML(message)}</div>`; // Use utility to escape HTML

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }
}

// Utility functions
const StockArtUtils = {
    // Format numbers with commas
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format percentage
    formatPercentage(value, decimals = 2) {
        return `${(value * 100).toFixed(decimals)}%`;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },

    // NEW: Basic HTML escaping for displaying user/AI messages securely
    escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
};

// Make utilities globally available
window.StockArtUtils = StockArtUtils;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.stockArtMain = new StockArtMain();
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.stockArtMain = new StockArtMain();
});
